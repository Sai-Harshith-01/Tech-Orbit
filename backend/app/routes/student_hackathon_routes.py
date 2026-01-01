from fastapi import APIRouter, Depends, status
from app.utils.role_checker import role_required, get_current_user
from app.services import hackathon_service, registration_service
from app.schemas.hackathon_schema import HackathonResponse
from app.schemas.registration_schema import RegistrationResponse
from typing import List

router = APIRouter(prefix="/hackathons", tags=["Student Hackathons"])

@router.get(
    "",
    response_model=List[HackathonResponse],
    status_code=status.HTTP_200_OK,
    summary="Browse all hackathons",
    description="Get all upcoming and ongoing hackathons available for students to register."
)
def get_all_hackathons(current_user: dict = Depends(get_current_user)):
    """Get all UPCOMING and ONGOING hackathons for students."""
    return hackathon_service.get_all_hackathons_for_students()

@router.post(
    "/{hackathon_id}/register",
    response_model=RegistrationResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register for a hackathon",
    description="Register for a hackathon and receive a unique registration code. Students can only register once per hackathon."
)
def register_for_hackathon(
    hackathon_id: str,
    current_user: dict = Depends(role_required(["STUDENT"]))
):
    """Register for a hackathon (STUDENT only)."""
    return registration_service.register_for_hackathon(hackathon_id, current_user["user_id"])

@router.get(
    "/my-registrations",
    response_model=List[RegistrationResponse],
    status_code=status.HTTP_200_OK,
    summary="Get my registrations",
    description="Retrieve all hackathon registrations for the logged-in student with unique codes."
)
def get_my_registrations(
    current_user: dict = Depends(role_required(["STUDENT"]))
):
    """Get all hackathon registrations for the logged-in student."""
    return registration_service.get_student_registrations(current_user["user_id"])

