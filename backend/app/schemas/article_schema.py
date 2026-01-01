from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List

class ArticleCreate(BaseModel):
    title: str = Field(..., description="Article title")
    content: str = Field(..., max_length=500, description="Article content (max 500 characters)")
    
    class Config:
        schema_extra = {
            "example": {
                "title": "My First Tech Article",
                "content": "This is an interesting article about technology and innovation in education."
            }
        }

class ArticleResponse(BaseModel):
    id: str = Field(..., description="Article ID")
    title: str = Field(..., description="Article title")
    content: str = Field(..., description="Article content")
    image_url: str = Field(..., description="Article image URL")
    student_id: str = Field(..., description="Author student ID")
    student_email: str = Field(..., description="Author email")
    created_at: datetime = Field(..., description="Creation timestamp")
    
    class Config:
        schema_extra = {
            "example": {
                "id": "507f1f77bcf86cd799439011",
                "title": "My First Tech Article",
                "content": "This is an interesting article about technology.",
                "image_url": "/uploads/articles/1234567890_image.jpg",
                "student_id": "507f1f77bcf86cd799439012",
                "student_email": "student@example.com",
                "created_at": "2025-11-28T10:00:00"
            }
        }

class ArticleCreateResponse(BaseModel):
    message: str = Field(..., description="Success message")
    id: str = Field(..., description="Created article ID")
    
    class Config:
        schema_extra = {
            "example": {
                "message": "Article posted successfully",
                "id": "507f1f77bcf86cd799439011"
            }
        }

