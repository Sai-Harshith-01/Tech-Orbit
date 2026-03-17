from app.database import get_db
from app.services.notification_service import create_notification
from app.utils.file_upload import save_upload_file
from fastapi import HTTPException, UploadFile
from datetime import datetime
from bson import ObjectId
import random
import string

db = get_db()

def generate_unique_code(hackathon_id: str, student_id: str) -> str:
    """Generate a unique registration code."""
    # Get short versions of IDs (last 6 chars)
    hackathon_short = hackathon_id[-6:] if len(hackathon_id) >= 6 else hackathon_id
    student_short = student_id[-6:] if len(student_id) >= 6 else student_id
    
    # Generate random 4 digits
    random_digits = ''.join(random.choices(string.digits, k=4))
    
    # Format: TECH-{hackathon_short}-{student_short}-{random}
    unique_code = f"TECH-{hackathon_short}-{student_short}-{random_digits}"
    
    return unique_code

def register_for_hackathon(
    hackathon_id: str, 
    student_id: str, 
    payment_proof_image: UploadFile = None,
    transaction_id: str = None
):
    """Register a student for a hackathon."""
    
    # Validate hackathon exists
    try:
        hackathon = db.hackathons.find_one({"_id": ObjectId(hackathon_id)})
    except:
        raise HTTPException(status_code=400, detail="Invalid hackathon ID")
    
    if not hackathon:
        raise HTTPException(status_code=404, detail="Hackathon not found")
    
    # Check if hackathon is available for registration
    if hackathon["status"] not in ["UPCOMING", "ONGOING"]:
        raise HTTPException(status_code=400, detail="Hackathon is not available for registration")
    
    # Check if already registered
    existing_registration = db.registrations.find_one({
        "hackathon_id": hackathon_id,
        "student_id": student_id
    })
    
    if existing_registration:
        raise HTTPException(status_code=400, detail="You are already registered for this hackathon")
    
    # Check if hackathon is full
    total_registered = db.registrations.count_documents({"hackathon_id": hackathon_id})
    if total_registered >= hackathon["max_participants"]:
        raise HTTPException(status_code=400, detail="Hackathon is full")
    
    # Handle Paid vs Free
    is_paid = hackathon.get("is_paid", False)
    status = "APPROVED"
    unique_code = None
    payment_proof_url = None
    
    if is_paid:
        if not payment_proof_image:
            raise HTTPException(status_code=400, detail="Payment proof is required for paid events")
        
        # Save payment proof
        payment_proof_url = save_upload_file(payment_proof_image, prefix="payment")
        status = "PENDING_VERIFICATION"
    else:
        unique_code = generate_unique_code(hackathon_id, student_id)
    
    # Create registration
    registration = {
        "hackathon_id": hackathon_id,
        "student_id": student_id,
        "unique_code": unique_code,
        "status": status,
        "payment_proof_url": payment_proof_url,
        "transaction_id": transaction_id,
        "created_at": datetime.utcnow()
    }
    
    result = db.registrations.insert_one(registration)
    reg_id = str(result.inserted_id)
    
    if status == "APPROVED":
        # Create notification for student
        create_notification(
            user_id=student_id,
            title="Registration Successful",
            message=f"You have successfully registered for {hackathon['hackathon_name']}. Your code is: {unique_code}",
            type="HACKATHON"
        )
    else:
        # Notify college about pending verification
        create_notification(
            user_id=hackathon["college_id"],
            title="New Payment Verification Request",
            message=f"A student has uploaded payment proof for {hackathon['hackathon_name']}. Please verify to complete registration.",
            type="HACKATHON"
        )
        # Notify student that it's pending
        create_notification(
            user_id=student_id,
            title="Registration Pending",
            message=f"Your registration for {hackathon['hackathon_name']} is pending verification. You will be notified once the college approves your payment.",
            type="HACKATHON"
        )
    
    return {
        "id": reg_id,
        "hackathon_id": hackathon_id,
        "student_id": student_id,
        "unique_code": unique_code,
        "status": status,
        "payment_proof_url": payment_proof_url,
        "transaction_id": transaction_id,
        "created_at": registration["created_at"],
        "message": "Registration initiated" if is_paid else "Registration successful"
    }

def verify_registration(registration_id: str, college_id: str, approve: bool):
    """Approve or reject a registration (College only)."""
    
    try:
        registration = db.registrations.find_one({"_id": ObjectId(registration_id)})
    except:
        raise HTTPException(status_code=400, detail="Invalid registration ID")
        
    if not registration:
        raise HTTPException(status_code=404, detail="Registration not found")
        
    # Verify hackathon belongs to the college
    hackathon = db.hackathons.find_one({"_id": ObjectId(registration["hackathon_id"]), "college_id": college_id})
    if not hackathon:
        raise HTTPException(status_code=403, detail="Access denied")
        
    if registration["status"] != "PENDING_VERIFICATION":
        raise HTTPException(status_code=400, detail="Registration is not in pending state")
        
    if approve:
        unique_code = generate_unique_code(str(hackathon["_id"]), registration["student_id"])
        db.registrations.update_one(
            {"_id": ObjectId(registration_id)},
            {"$set": {"status": "APPROVED", "unique_code": unique_code}}
        )
        
        # Notify student
        create_notification(
            user_id=registration["student_id"],
            title="Registration Approved! 🎯",
            message=f"Your payment for {hackathon['hackathon_name']} has been verified. Your unique code is: {unique_code}",
            type="HACKATHON"
        )
        return {"message": "Registration approved successfully", "unique_code": unique_code}
    else:
        db.registrations.update_one(
            {"_id": ObjectId(registration_id)},
            {"$set": {"status": "REJECTED"}}
        )
        
        # Notify student
        create_notification(
            user_id=registration["student_id"],
            title="Registration Rejected ❌",
            message=f"Your payment proof for {hackathon['hackathon_name']} was rejected. Please contact the college for details.",
            type="HACKATHON"
        )
        return {"message": "Registration rejected"}

def get_student_registrations(student_id: str):
    """Get all hackathon registrations for a student."""
    registrations = list(db.registrations.find({"student_id": student_id}).sort("created_at", -1))
    
    result = []
    for reg in registrations:
        # Get hackathon details
        hackathon = db.hackathons.find_one({"_id": ObjectId(reg["hackathon_id"])})
        
        if hackathon:
            result.append({
                "registration_id": str(reg["_id"]),
                "hackathon_id": reg["hackathon_id"],
                "hackathon_name": hackathon["hackathon_name"],
                "unique_code": reg.get("unique_code"),
                "registration_status": reg.get("status", "APPROVED"),
                "status": hackathon["status"],
                "start_date": hackathon["start_date"],
                "end_date": hackathon["end_date"],
                "created_at": reg["created_at"]
            })
    
    return result
