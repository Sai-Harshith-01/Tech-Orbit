from fastapi import APIRouter, Depends, status
from app.utils.role_checker import role_required
from app.services import hackathon_service
from typing import Dict

router = APIRouter(prefix="/college/stats", tags=["College Statistics"])

@router.get(
    "/overview",
    response_model=Dict,
    status_code=status.HTTP_200_OK,
    summary="Get college statistics",
    description="Get overview statistics for the logged-in college including total hackathons and total registered students."
)
def get_college_stats(
    current_user: dict = Depends(role_required(["COLLEGE"]))
):
    """Get overview statistics for college dashboard."""
    return hackathon_service.get_college_stats(current_user["user_id"])
