from pydantic import BaseModel, Field
from datetime import datetime

class NotificationResponse(BaseModel):
    id: str = Field(..., description="Notification ID")
    title: str = Field(..., description="Notification title")
    message: str = Field(..., description="Notification message")
    type: str = Field(..., description="Notification type")
    is_read: bool = Field(..., description="Read status")
    created_at: datetime = Field(..., description="Creation timestamp")
    
    class Config:
        schema_extra = {
            "example": {
                "id": "507f1f77bcf86cd799439011",
                "title": "New Comment",
                "message": "Someone commented on your article",
                "type": "COMMENT",
                "is_read": False,
                "created_at": "2025-11-28T10:00:00"
            }
        }

class NotificationUpdateResponse(BaseModel):
    message: str = Field(..., description="Success message")
    
    class Config:
        schema_extra = {
            "example": {
                "message": "Notification marked as read"
            }
        }

