from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class RegistrationResponse(BaseModel):
    id: str = Field(..., description="Registration ID")
    hackathon_id: str = Field(..., description="Hackathon ID")
    student_id: str = Field(..., description="Student ID")
    unique_code: Optional[str] = Field(None, description="Unique registration code (only if approved)")
    created_at: datetime = Field(..., description="Registration timestamp")
    status: str = Field("PENDING_VERIFICATION", description="Registration status")
    payment_proof_url: Optional[str] = Field(None, description="Payment proof screenshot URL")
    transaction_id: Optional[str] = Field(None, description="Transaction ID/Reference")
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
    registration_id: str = Field(..., description="Registration DB ID")
    student_id: str = Field(..., description="Student ID")
    student_email: str = Field(..., description="Student email")
    unique_code: Optional[str] = Field(None, description="Unique registration code")
    created_at: datetime = Field(..., description="Registration timestamp")
    status: str = Field("PENDING_VERIFICATION", description="Status")
    payment_proof_url: Optional[str] = Field(None, description="Payment proof URL")
    transaction_id: Optional[str] = Field(None, description="Transaction ID")
    
    class Config:
        schema_extra = {
            "example": {
                "student_id": "507f1f77bcf86cd799439013",
                "student_email": "student@example.com",
                "unique_code": "ABC123XYZ",
                "created_at": "2025-11-28T10:00:00"
            }
        }

class MyRegistrationResponse(BaseModel):
    registration_id: str = Field(..., description="Registration DB ID")
    hackathon_id: str = Field(..., description="Hackathon ID")
    hackathon_name: str = Field(..., description="Name of the hackathon")
    unique_code: Optional[str] = Field(None, description="Unique code if approved")
    registration_status: str = Field(..., description="Status of registration")
    status: str = Field(..., description="Status of hackathon")
    start_date: str = Field(..., description="Hackathon start date")
    end_date: str = Field(..., description="Hackathon end date")
    created_at: datetime = Field(..., description="Registration date")

    class Config:
        schema_extra = {
            "example": {
                "registration_id": "507f1f77bcf86cd799439011",
                "hackathon_id": "507f1f77bcf86cd799439012",
                "hackathon_name": "AI Fest",
                "unique_code": "TECH-1234",
                "registration_status": "APPROVED",
                "status": "UPCOMING",
                "created_at": "2025-11-28T10:00:00"
            }
        }
