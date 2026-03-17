from fastapi import APIRouter, Depends, status
from app.services import notification_service
from app.utils.role_checker import get_current_user
from app.schemas.notification_schema import NotificationResponse, NotificationUpdateResponse
from typing import List

router = APIRouter(prefix="/notifications", tags=["Notifications"])

@router.get(
    "/",
    response_model=List[NotificationResponse],
    status_code=status.HTTP_200_OK,
    summary="Get user notifications",
    description="Retrieve all notifications for the authenticated user, sorted by creation date."
)
def get_notifications(current_user: dict = Depends(get_current_user)):
    return notification_service.get_user_notifications(current_user["user_id"])

@router.put(
    "/{id}/read",
    response_model=NotificationUpdateResponse,
    status_code=status.HTTP_200_OK,
    summary="Mark notification as read",
    description="Mark a specific notification as read for the authenticated user."
)
def mark_read(id: str, current_user: dict = Depends(get_current_user)):
    return notification_service.mark_notification_read(id, current_user["user_id"])

@router.put(
    "/read-all",
    response_model=NotificationUpdateResponse,
    status_code=status.HTTP_200_OK,
    summary="Mark all notifications as read",
    description="Mark all notifications as read for the authenticated user."
)
def read_all(current_user: dict = Depends(get_current_user)):
    return notification_service.mark_all_read(current_user["user_id"])

