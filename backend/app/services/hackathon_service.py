from app.database import get_db, serialize_doc
from app.utils.file_upload import save_upload_file, delete_upload_file
from fastapi import HTTPException, UploadFile
from datetime import datetime, date
from bson import ObjectId

db = get_db()

def create_hackathon(
    college_id: str,
    hackathon_name: str,
    description: str,
    hackathon_image: UploadFile,
    payment_qr_image: UploadFile,
    max_participants: int,
    start_date: str,
    end_date: str
):
    """Create a new hackathon (only for APPROVED colleges)."""
    
    # Check if college is approved
    college = db.colleges.find_one({"user_id": college_id})
    if not college or college.get("status") != "APPROVED":
        raise HTTPException(status_code=403, detail="Only approved colleges can create hackathons")
    
    # Validate max_participants
    if max_participants <= 0:
        raise HTTPException(status_code=400, detail="max_participants must be greater than 0")
    
    # Validate dates
    try:
        start = datetime.strptime(start_date, "%Y-%m-%d").date()
        end = datetime.strptime(end_date, "%Y-%m-%d").date()
        
        if start >= end:
            raise HTTPException(status_code=400, detail="start_date must be before end_date")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD")
    
    # Save uploaded files
    hackathon_image_url = save_upload_file(hackathon_image, prefix="hackathon")
    upi_qr_image_url = save_upload_file(payment_qr_image, prefix="qr")
    
    # Determine initial status
    today = date.today()
    if today < start:
        status = "UPCOMING"
    elif start <= today <= end:
        status = "ONGOING"
    else:
        status = "COMPLETED"
    
    # Create hackathon
    hackathon = {
        "college_id": college_id,
        "hackathon_name": hackathon_name,
        "description": description,
        "hackathon_image_url": hackathon_image_url,
        "upi_qr_image_url": upi_qr_image_url,
        "max_participants": max_participants,
        "start_date": start_date,
        "end_date": end_date,
        "status": status,
        "created_at": datetime.utcnow()
    }
    
    result = db.hackathons.insert_one(hackathon)
    return {"message": "Hackathon created successfully", "hackathon_id": str(result.inserted_id)}

def get_college_hackathons(college_id: str):
    """Get all hackathons for a college with student counts."""
    hackathons = list(db.hackathons.find({"college_id": college_id}).sort("created_at", -1))
    
    result = []
    for hackathon in hackathons:
        # Auto-update status
        auto_update_hackathon_status(hackathon)
        
        # Count registered students
        total_registered = db.registrations.count_documents({"hackathon_id": str(hackathon["_id"])})
        
        hackathon_data = serialize_doc(hackathon)
        hackathon_data["total_registered_students"] = total_registered
        hackathon_data["remaining_slots"] = hackathon["max_participants"] - total_registered
        
        result.append(hackathon_data)
    
    return result

def get_hackathon_registrations(hackathon_id: str, college_id: str):
    """Get all registered students for a specific hackathon."""
    
    # Verify hackathon belongs to the college
    try:
        hackathon = db.hackathons.find_one({"_id": ObjectId(hackathon_id), "college_id": college_id})
    except:
        raise HTTPException(status_code=400, detail="Invalid hackathon ID")
    
    if not hackathon:
        raise HTTPException(status_code=404, detail="Hackathon not found or access denied")
    
    # Get all registrations
    registrations = list(db.registrations.find({"hackathon_id": hackathon_id}))
    
    result = []
    for reg in registrations:
        # Get student email
        user = db.users.find_one({"_id": ObjectId(reg["student_id"])})
        
        result.append({
            "student_id": reg["student_id"],
            "student_email": user["email"] if user else "Unknown",
            "unique_code": reg["unique_code"],
            "created_at": reg["created_at"]
        })
    
    return result

def delete_hackathon(hackathon_id: str, college_id: str):
    """Delete or close a hackathon (only if end_date has passed)."""
    
    try:
        hackathon = db.hackathons.find_one({"_id": ObjectId(hackathon_id), "college_id": college_id})
    except:
        raise HTTPException(status_code=400, detail="Invalid hackathon ID")
    
    if not hackathon:
        raise HTTPException(status_code=404, detail="Hackathon not found or access denied")
    
    # Check if end_date has passed
    end_date = datetime.strptime(hackathon["end_date"], "%Y-%m-%d").date()
    today = date.today()
    
    if today <= end_date:
        # Just mark as completed instead of deleting
        db.hackathons.update_one(
            {"_id": ObjectId(hackathon_id)},
            {"$set": {"status": "COMPLETED"}}
        )
        return {"message": "Hackathon marked as completed"}
    else:
        # Delete hackathon and associated files
        delete_upload_file(hackathon.get("hackathon_image_url", ""))
        delete_upload_file(hackathon.get("upi_qr_image_url", ""))
        
        db.hackathons.delete_one({"_id": ObjectId(hackathon_id)})
        db.registrations.delete_many({"hackathon_id": hackathon_id})
        
        return {"message": "Hackathon deleted successfully"}

def get_all_hackathons_for_students():
    """Get all UPCOMING and ONGOING hackathons for students."""
    hackathons = list(db.hackathons.find({"status": {"$in": ["UPCOMING", "ONGOING"]}}).sort("start_date", 1))
    
    result = []
    for hackathon in hackathons:
        # Auto-update status
        auto_update_hackathon_status(hackathon)
        
        # Skip if status changed to COMPLETED
        if hackathon["status"] == "COMPLETED":
            continue
        
        # Count registered students
        total_registered = db.registrations.count_documents({"hackathon_id": str(hackathon["_id"])})
        
        hackathon_data = serialize_doc(hackathon)
        hackathon_data["total_registered_students"] = total_registered
        hackathon_data["remaining_slots"] = hackathon["max_participants"] - total_registered
        
        result.append(hackathon_data)
    
    return result

def get_college_stats(college_id: str):
    """Get statistics for a college's hackathons."""
    
    # Count total hackathons created by this college
    total_hackathons = db.hackathons.count_documents({"college_id": college_id})
    
    # Get all hackathon IDs for this college
    hackathons = list(db.hackathons.find({"college_id": college_id}, {"_id": 1}))
    hackathon_ids = [str(h["_id"]) for h in hackathons]
    
    # Count total students registered across all hackathons
    total_students_registered = db.registrations.count_documents(
        {"hackathon_id": {"$in": hackathon_ids}}
    )
    
    return {
        "total_hackathons": total_hackathons,
        "total_students_registered": total_students_registered
    }

def auto_update_hackathon_status(hackathon: dict):
    """Auto-update hackathon status based on current date."""
    today = date.today()
    start_date = datetime.strptime(hackathon["start_date"], "%Y-%m-%d").date()
    end_date = datetime.strptime(hackathon["end_date"], "%Y-%m-%d").date()
    
    new_status = None
    if today < start_date:
        new_status = "UPCOMING"
    elif start_date <= today <= end_date:
        new_status = "ONGOING"
    else:
        new_status = "COMPLETED"
    
    # Update if status changed
    if hackathon["status"] != new_status:
        db.hackathons.update_one(
            {"_id": hackathon["_id"]},
            {"$set": {"status": new_status}}
        )
        hackathon["status"] = new_status
