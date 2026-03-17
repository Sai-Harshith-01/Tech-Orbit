from pydantic import BaseModel, Field
from datetime import datetime
from typing import List

class OverviewStatsResponse(BaseModel):
    total_students: int = Field(..., description="Total number of students")
    total_colleges: int = Field(..., description="Total number of colleges")
    total_hackathons: int = Field(..., description="Total number of hackathons")
    total_registrations: int = Field(..., description="Total hackathon registrations")
    pending_colleges: int = Field(..., description="Number of pending college approvals")
    
    class Config:
        schema_extra = {
            "example": {
                "total_students": 150,
                "total_colleges": 25,
                "total_hackathons": 40,
                "total_registrations": 320,
                "pending_colleges": 5
            }
        }

class MonthlyDataPoint(BaseModel):
    month: str = Field(..., description="Month name")
    count: int = Field(..., description="Count for that month")
    
    class Config:
        schema_extra = {
            "example": {
                "month": "January",
                "count": 15
            }
        }

class MonthlyStatsResponse(BaseModel):
    data: List[MonthlyDataPoint] = Field(..., description="Monthly statistics data")
    
    class Config:
        schema_extra = {
            "example": {
                "data": [
                    {"month": "January", "count": 15},
                    {"month": "February", "count": 20},
                    {"month": "March", "count": 18}
                ]
            }
        }
