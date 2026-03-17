from pydantic import BaseModel, Field
from datetime import datetime

class CommentCreate(BaseModel):
    message: str = Field(..., description="Comment message")
    
    class Config:
        schema_extra = {
            "example": {
                "message": "Great article! Very informative."
            }
        }

class CommentResponse(BaseModel):
    message: str = Field(..., description="Success message")
    
    class Config:
        schema_extra = {
            "example": {
                "message": "Comment added"
            }
        }

