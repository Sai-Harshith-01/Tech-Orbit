from app.database import get_db
from app.schemas.user_schema import StudentRegister, Login
from app.schemas.college_schema import CollegeRegister
from app.utils.password_hash import get_password_hash, verify_password
from app.utils.jwt_handler import create_access_token
from app.services.notification_service import create_notification
from fastapi import HTTPException, status
from datetime import datetime

db = get_db()

def register_student(student_data: StudentRegister):
    # Check if this is the first user - make them admin
    user_count = db.users.count_documents({})
    
    if user_count == 0:
        # First user becomes admin with specific credentials
        if db.users.find_one({"email": "admin@techorbit.com"}):
            raise HTTPException(status_code=400, detail="Email already registered")
        
        admin_user = {
            "email": "admin@techorbit.com",
            "password": get_password_hash("admin123"),
            "role": "ADMIN",
            "created_at": datetime.utcnow()
        }
        db.users.insert_one(admin_user)
        return {
            "message": "First user registered as Admin",
            "email": "admin@techorbit.com",
            "note": "Please use credentials: admin@techorbit.com / admin123"
        }
    
    # Normal student registration
    if db.users.find_one({"email": student_data.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user = {
        "email": student_data.email,
        "password": get_password_hash(student_data.password),
        "role": "STUDENT",
        "created_at": datetime.utcnow()
    }
    db.users.insert_one(user)
    return {"message": "Student registered successfully"}

def register_college(college_data: CollegeRegister):
    if db.users.find_one({"email": college_data.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user entry
    user = {
        "email": college_data.email,
        "password": get_password_hash(college_data.password),
        "role": "COLLEGE",
        "created_at": datetime.utcnow()
    }
    user_result = db.users.insert_one(user)
    
    # Create college entry
    college = {
        "user_id": str(user_result.inserted_id),
        "email": college_data.email,
        "website": str(college_data.website),
        "status": "PENDING",
        "created_at": datetime.utcnow()
    }
    db.colleges.insert_one(college)
    
    # Notify all admins about new college registration
    admin_users = db.users.find({"role": "ADMIN"})
    for admin in admin_users:
        create_notification(
            user_id=str(admin["_id"]),
            title="New College Registration",
            message=f"College {college_data.email} has registered and is pending approval.",
            type="COLLEGE_APPROVAL"
        )
    
    return {"message": "College registered successfully. Pending approval."}

def login_user(login_data: Login):
    user = db.users.find_one({"email": login_data.email})
    if not user or not verify_password(login_data.password, user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    access_token = create_access_token(data={"user_id": str(user["_id"]), "role": user["role"]})
    return {"access_token": access_token, "token_type": "bearer", "role": user["role"]}
