from pydantic import BaseModel, Field
from datetime import datetime

class RegistrationResponse(BaseModel):
    id: str = Field(..., description="Registration ID")
    hackathon_id: str = Field(..., description="Hackathon ID")
    student_id: str = Field(..., description="Student ID")
    unique_code: str = Field(..., description="Unique registration code")
    created_at: datetime = Field(..., description="Registration timestamp")
    message: str = Field(..., description="Success message")
    
    class Config:
        schema_extra = {
            "example": {
                "id": "507f1f77bcf86cd799439011",
                "hackathon_id": "507f1f77bcf86cd799439012",
                "student_id": "507f1f77bcf86cd799439013",
                "unique_code": "ABC123XYZ",
                "created_at": "2025-11-28T10:00:00",
                "message": "Successfully registered for hackathon"
            }
        }

class StudentRegistrationInfo(BaseModel):
    student_id: str = Field(..., description="Student ID")
    student_email: str = Field(..., description="Student email")
    unique_code: str = Field(..., description="Unique registration code")
    created_at: datetime = Field(..., description="Registration timestamp")
    
    class Config:
        schema_extra = {
            "example": {
                "student_id": "507f1f77bcf86cd799439013",
                "student_email": "student@example.com",
                "unique_code": "ABC123XYZ",
                "created_at": "2025-11-28T10:00:00"
            }
        }

