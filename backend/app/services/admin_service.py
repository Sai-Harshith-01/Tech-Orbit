from app.database import get_db, serialize_doc
from app.services import notification_service
from bson import ObjectId
from fastapi import HTTPException

db = get_db()

def get_pending_colleges():
    colleges = list(db.colleges.find({"status": "PENDING"}))
    return [serialize_doc(college) for college in colleges]

def approve_college(college_id: str):
    college = db.colleges.find_one({"_id": ObjectId(college_id)})
    if not college:
        raise HTTPException(status_code=404, detail="College not found")
    
    db.colleges.update_one(
        {"_id": ObjectId(college_id)},
        {"$set": {"status": "APPROVED"}}
    )
    
    # Notify College
    notification_service.create_notification(
        user_id=college["user_id"],
        title="Account Approved",
        message="Your college account has been approved by the admin.",
        type="SYSTEM"
    )
    
    return {"message": "College approved"}

def reject_college(college_id: str):
    college = db.colleges.find_one({"_id": ObjectId(college_id)})
    if not college:
        raise HTTPException(status_code=404, detail="College not found")
    
    db.colleges.update_one(
        {"_id": ObjectId(college_id)},
        {"$set": {"status": "REJECTED"}}
    )
    
    return {"message": "College rejected"}

