from fastapi import APIRouter, status
from app.schemas.user_schema import StudentRegister, Login, Token, RegisterResponse
from app.schemas.college_schema import CollegeRegister
from app.services import auth_service

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post(
    "/register/student",
    response_model=RegisterResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new student",
    description="Register a new student account. The first user registered becomes an admin automatically."
)
def register_student(student: StudentRegister):
    return auth_service.register_student(student)

@router.post(
    "/register/college",
    response_model=RegisterResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new college",
    description="Register a new college account. College accounts require admin approval before they can post hackathons."
)
def register_college(college: CollegeRegister):
    return auth_service.register_college(college)

@router.post(
    "/login",
    response_model=Token,
    status_code=status.HTTP_200_OK,
    summary="User login",
    description="Login with email and password. Returns JWT access token for authentication."
)
def login(login_data: Login):
    return auth_service.login_user(login_data)

