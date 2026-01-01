from pydantic import BaseModel, EmailStr, Field

class StudentRegister(BaseModel):
    email: EmailStr = Field(..., description="Student email address")
    password: str = Field(..., min_length=6, max_length=72, description="Password (6-72 characters)")
    
    class Config:
        schema_extra = {
            "example": {
                "email": "student@example.com",
                "password": "SecurePass123"
            }
        }

class CollegeRegister(BaseModel):
    email: EmailStr = Field(..., description="College email address")
    website: str = Field(..., description="College website URL")
    password: str = Field(..., min_length=6, max_length=72, description="Password (6-72 characters)")
    
    class Config:
        schema_extra = {
            "example": {
                "email": "admin@college.edu",
                "website": "https://www.college.edu",
                "password": "SecurePass123"
            }
        }

class Login(BaseModel):
    email: EmailStr = Field(..., description="User email address")
    password: str = Field(..., min_length=1, max_length=72, description="User password")
    
    class Config:
        schema_extra = {
            "example": {
                "email": "user@example.com",
                "password": "password123"
            }
        }

class Token(BaseModel):
    access_token: str = Field(..., description="JWT access token")
    token_type: str = Field(..., description="Token type (bearer)")
    role: str = Field(..., description="User role (STUDENT, COLLEGE, ADMIN)")
    
    class Config:
        schema_extra = {
            "example": {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "token_type": "bearer",
                "role": "STUDENT"
            }
        }

class RegisterResponse(BaseModel):
    message: str = Field(..., description="Registration status message")
    
    class Config:
        schema_extra = {
            "example": {
                "message": "Student registered successfully"
            }
        }

