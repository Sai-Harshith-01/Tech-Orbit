from pydantic import BaseModel, Field
from datetime import datetime

class RSSArticle(BaseModel):
    title: str = Field(..., description="Article title")
    link: str = Field(..., description="Article URL")
    summary: str = Field(..., description="Article summary")
    source: str = Field(..., description="News source")
    published_at: datetime = Field(..., description="Publication timestamp")
    
    class Config:
        schema_extra = {
            "example": {
                "title": "Latest Tech News",
                "link": "https://example.com/article",
                "summary": "Breaking news in technology...",
                "source": "TechCrunch",
                "published_at": "2025-11-28T10:00:00"
            }
        }

