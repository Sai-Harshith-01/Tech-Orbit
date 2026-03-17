from fastapi import APIRouter, Depends, status
from app.services import admin_service
from app.utils.role_checker import role_required
from app.schemas.college_schema import CollegeResponse, CollegeApprovalResponse
from typing import List

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get(
    "/colleges/pending",
    response_model=List[CollegeResponse],
    status_code=status.HTTP_200_OK,
    summary="Get pending college approvals",
    description="Retrieve all colleges pending admin approval. Admin only."
)
def get_pending_colleges(current_user: dict = Depends(role_required(["ADMIN"]))):
    return admin_service.get_pending_colleges()

@router.put(
    "/colleges/{id}/approve",
    response_model=CollegeApprovalResponse,
    status_code=status.HTTP_200_OK,
    summary="Approve a college",
    description="Approve a college registration. The college will be notified and can start posting hackathons. Admin only."
)
def approve_college(id: str, current_user: dict = Depends(role_required(["ADMIN"]))):
    return admin_service.approve_college(id)

@router.put(
    "/colleges/{id}/reject",
    response_model=CollegeApprovalResponse,
    status_code=status.HTTP_200_OK,
    summary="Reject a college",
    description="Reject a college registration. Admin only."
)
def reject_college(id: str, current_user: dict = Depends(role_required(["ADMIN"]))):
    return admin_service.reject_college(id)

