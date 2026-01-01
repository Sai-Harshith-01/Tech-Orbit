from fastapi import APIRouter, Depends, Form, UploadFile, File, status
from app.utils.role_checker import role_required
from app.services import hackathon_service
from app.schemas.hackathon_schema import HackathonResponse, HackathonCreateResponse, HackathonDeleteResponse
from app.schemas.registration_schema import StudentRegistrationInfo
from typing import List

router = APIRouter(prefix="/college", tags=["College Hackathons"])

@router.post(
    "/hackathons",
    response_model=HackathonCreateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new hackathon",
    description="Create a new hackathon with details and images. Only approved colleges can create hackathons."
)
def create_hackathon(
    hackathon_name: str = Form(..., description="Hackathon name"),
    description: str = Form(..., description="Hackathon description"),
    max_participants: int = Form(..., description="Maximum number of participants", gt=0),
    start_date: str = Form(..., description="Start date (YYYY-MM-DD)"),
    end_date: str = Form(..., description="End date (YYYY-MM-DD)"),
    hackathon_image: UploadFile = File(..., description="Hackathon banner image"),
    payment_qr_image: UploadFile = File(..., description="Payment QR code image"),
    current_user: dict = Depends(role_required(["COLLEGE"]))
):
    """Create a new hackathon (COLLEGE only, must be APPROVED)."""
    return hackathon_service.create_hackathon(
        college_id=current_user["user_id"],
        hackathon_name=hackathon_name,
        description=description,
        hackathon_image=hackathon_image,
        payment_qr_image=payment_qr_image,
        max_participants=max_participants,
        start_date=start_date,
        end_date=end_date
    )

@router.get(
    "/hackathons",
    response_model=List[HackathonResponse],
    status_code=status.HTTP_200_OK,
    summary="Get college's hackathons",
    description="Retrieve all hackathons created by the logged-in college with registration counts."
)
def get_college_hackathons(
    current_user: dict = Depends(role_required(["COLLEGE"]))
):
    """Get all hackathons for the logged-in college with student counts."""
    return hackathon_service.get_college_hackathons(current_user["user_id"])

@router.get(
    "/hackathons/{hackathon_id}/registrations",
    response_model=List[StudentRegistrationInfo],
    status_code=status.HTTP_200_OK,
    summary="Get hackathon registrations",
    description="Retrieve all registered students for a specific hackathon with their unique codes."
)
def get_hackathon_registrations(
    hackathon_id: str,
    current_user: dict = Depends(role_required(["COLLEGE"]))
):
    """Get all registered students for a specific hackathon."""
    return hackathon_service.get_hackathon_registrations(hackathon_id, current_user["user_id"])

@router.delete(
    "/hackathons/{hackathon_id}",
    response_model=HackathonDeleteResponse,
    status_code=status.HTTP_200_OK,
    summary="Delete a hackathon",
    description="Delete or close a hackathon. Only the college that created it can delete it."
)
def delete_hackathon(
    hackathon_id: str,
    current_user: dict = Depends(role_required(["COLLEGE"]))
):
    """Delete or close a hackathon."""
    return hackathon_service.delete_hackathon(hackathon_id, current_user["user_id"])

