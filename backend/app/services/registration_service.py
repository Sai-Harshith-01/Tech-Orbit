from app.database import get_db
from app.services.notification_service import create_notification
from fastapi import HTTPException
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

def register_for_hackathon(hackathon_id: str, student_id: str):
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
    
    # Generate unique code
    unique_code = generate_unique_code(hackathon_id, student_id)
    
    # Create registration
    registration = {
        "hackathon_id": hackathon_id,
        "student_id": student_id,
        "unique_code": unique_code,
        "created_at": datetime.utcnow()
    }
    
    result = db.registrations.insert_one(registration)
    
    # Create notification for student
    create_notification(
        user_id=student_id,
        title="Hackathon Registration Successful",
        message=f"You have successfully registered for {hackathon['hackathon_name']}. Your unique code is: {unique_code}",
        type="HACKATHON"
    )
    
    return {
        "id": str(result.inserted_id),
        "hackathon_id": hackathon_id,
        "student_id": student_id,
        "unique_code": unique_code,
        "created_at": registration["created_at"],
        "message": "Registration successful"
    }

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
                "unique_code": reg["unique_code"],
                "status": hackathon["status"],
                "start_date": hackathon["start_date"],
                "end_date": hackathon["end_date"],
                "created_at": reg["created_at"]
            })
    
    return result
