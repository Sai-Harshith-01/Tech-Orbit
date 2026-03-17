from fastapi import APIRouter, Depends, status
from app.utils.role_checker import role_required
from app.services import stats_service
from app.schemas.admin_schema import OverviewStatsResponse, MonthlyStatsResponse

router = APIRouter(prefix="/admin/stats", tags=["Admin Statistics"])

@router.get(
    "/overview",
    response_model=OverviewStatsResponse,
    status_code=status.HTTP_200_OK,
    summary="Get overview statistics",
    description="Get dashboard overview statistics including total students, colleges, hackathons, and registrations. Admin only."
)
def get_overview_stats(
    current_user: dict = Depends(role_required(["ADMIN"]))
):
    """Get overview statistics for admin dashboard."""
    return stats_service.get_overview_stats()

@router.get(
    "/hackathons/monthly",
    response_model=MonthlyStatsResponse,
    status_code=status.HTTP_200_OK,
    summary="Get monthly hackathon statistics",
    description="Get monthly hackathon creation statistics for charts and analytics. Admin only."
)
def get_hackathons_monthly(
    current_user: dict = Depends(role_required(["ADMIN"]))
):
    """Get monthly hackathon creation statistics for charts."""
    return stats_service.get_hackathons_monthly()

@router.get(
    "/registrations/monthly",
    response_model=MonthlyStatsResponse,
    status_code=status.HTTP_200_OK,
    summary="Get monthly registration statistics",
    description="Get monthly registration statistics for charts and analytics. Admin only."
)
def get_registrations_monthly(
    current_user: dict = Depends(role_required(["ADMIN"]))
):
    """Get monthly registration statistics for charts."""
    return stats_service.get_registrations_monthly()

