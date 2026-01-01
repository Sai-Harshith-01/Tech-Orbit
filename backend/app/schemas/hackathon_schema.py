from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class HackathonCreate(BaseModel):
    hackathon_name: str = Field(..., description="Hackathon name")
    description: str = Field(..., description="Hackathon description")
    max_participants: int = Field(..., description="Maximum number of participants", gt=0)
    start_date: str = Field(..., description="Start date (YYYY-MM-DD format)")
    end_date: str = Field(..., description="End date (YYYY-MM-DD format)")
    
    class Config:
        schema_extra = {
            "example": {
                "hackathon_name": "AI Innovation Challenge 2025",
                "description": "Build innovative AI solutions for real-world problems",
                "max_participants": 100,
                "start_date": "2025-12-01",
                "end_date": "2025-12-03"
            }
        }

class HackathonResponse(BaseModel):
    id: str = Field(..., description="Hackathon ID")
    college_id: str = Field(..., description="College ID")
    hackathon_name: str = Field(..., description="Hackathon name")
    description: str = Field(..., description="Hackathon description")
    hackathon_image_url: Optional[str] = Field(None, description="Hackathon image URL")
    upi_qr_image_url: Optional[str] = Field(None, description="Payment QR code URL")
    max_participants: int = Field(..., description="Maximum participants")
    start_date: str = Field(..., description="Start date")
    end_date: str = Field(..., description="End date")
    status: str = Field(..., description="Hackathon status (UPCOMING, ONGOING, COMPLETED)")
    created_at: datetime = Field(..., description="Creation timestamp")
    total_registered_students: Optional[int] = Field(0, description="Total registered students")
    remaining_slots: Optional[int] = Field(0, description="Remaining slots")
    
    class Config:
        schema_extra = {
            "example": {
                "id": "507f1f77bcf86cd799439011",
                "college_id": "507f1f77bcf86cd799439012",
                "hackathon_name": "AI Innovation Challenge 2025",
                "description": "Build innovative AI solutions",
                "hackathon_image_url": "/uploads/hackathons/image.jpg",
                "upi_qr_image_url": "/uploads/hackathons/qr.jpg",
                "max_participants": 100,
                "start_date": "2025-12-01",
                "end_date": "2025-12-03",
                "status": "UPCOMING",
                "created_at": "2025-11-28T10:00:00",
                "total_registered_students": 45,
                "remaining_slots": 55
            }
        }

class HackathonCreateResponse(BaseModel):
    message: str = Field(..., description="Success message")
    hackathon_id: str = Field(..., description="Created hackathon ID")
    
    class Config:
        schema_extra = {
            "example": {
                "message": "Hackathon created successfully",
                "hackathon_id": "507f1f77bcf86cd799439011"
            }
        }

class HackathonDeleteResponse(BaseModel):
    message: str = Field(..., description="Success message")
    
    class Config:
        schema_extra = {
            "example": {
                "message": "Hackathon deleted successfully"
            }
        }

