from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

class CollegeRegister(BaseModel):
    email: EmailStr = Field(..., description="College email address")
    website: str = Field(..., description="College website URL")
    password: str = Field(..., min_length=6, max_length=72, description="Password (6-72 characters)")
    
    class Config:
        schema_extra = {
            "example": {
                "email": "admin@college.edu",
                "website": "https://www.college.edu",
                "password": "SecurePass123"
            }
        }

class CollegeResponse(BaseModel):
    id: str = Field(..., description="College ID")
    user_id: str = Field(..., description="Associated user ID")
    email: EmailStr = Field(..., description="College email")
    website: str = Field(..., description="College website")
    status: str = Field(..., description="Approval status (PENDING, APPROVED, REJECTED)")
    created_at: datetime = Field(..., description="Registration timestamp")
    
    class Config:
        schema_extra = {
            "example": {
                "id": "507f1f77bcf86cd799439011",
                "user_id": "507f1f77bcf86cd799439012",
                "email": "admin@college.edu",
                "website": "https://www.college.edu",
                "status": "APPROVED",
                "created_at": "2025-11-28T10:00:00"
            }
        }

class CollegeApprovalResponse(BaseModel):
    message: str = Field(..., description="Approval/rejection message")
    
    class Config:
        schema_extra = {
            "example": {
                "message": "College approved"
            }
        }

