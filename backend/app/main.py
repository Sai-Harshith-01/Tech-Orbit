from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from dotenv import load_dotenv
import os
import traceback

load_dotenv()

app = FastAPI(
    title="TechOrbit Backend",
    description="Backend API for TechOrbit - A platform for students, colleges, and hackathon management",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files for uploads
if not os.path.exists("uploads"):
    os.makedirs("uploads/hackathons", exist_ok=True)
    os.makedirs("uploads/articles", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Global exception handlers
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    print(f"❌ Validation Error: {exc.errors()}")
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": exc.errors(), "body": str(exc.body)}
    )

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    print(f"❌ Unhandled Exception: {str(exc)}")
    print(traceback.format_exc())
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "Internal server error", "error": str(exc)}
    )

@app.get("/", tags=["Root"])
def root():
    return {
        "message": "TechOrbit API Running",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }

# Import routers
from app.routes import (
    auth_routes, 
    rss_routes, 
    student_article_routes, 
    notification_routes, 
    admin_routes,
    hackathon_routes,
    student_hackathon_routes,
    admin_stats_routes,
    college_stats_routes
)
from app.workers.rss_worker import start_rss_scheduler

# Include routers
app.include_router(auth_routes.router)
app.include_router(rss_routes.router)
app.include_router(student_article_routes.router)
app.include_router(notification_routes.router)
app.include_router(admin_routes.router)
app.include_router(hackathon_routes.router)
app.include_router(student_hackathon_routes.router)
app.include_router(admin_stats_routes.router)
app.include_router(college_stats_routes.router)

@app.on_event("startup")
def startup_event():
    print("🚀 Starting TechOrbit Backend...")
    start_rss_scheduler()
    print("✅ RSS Scheduler started")
    print("📚 API Documentation available at /docs")

