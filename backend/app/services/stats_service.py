from app.database import get_db
from datetime import datetime

db = get_db()

def get_overview_stats():
    """Get overview statistics for admin dashboard."""
    
    total_students = db.users.count_documents({"role": "STUDENT"})
    total_colleges = db.colleges.count_documents({})
    total_hackathons = db.hackathons.count_documents({})
    total_registrations = db.registrations.count_documents({})
    pending_colleges = db.colleges.count_documents({"status": "PENDING"})
    
    return {
        "total_students": total_students,
        "total_colleges": total_colleges,
        "total_hackathons": total_hackathons,
        "total_registrations": total_registrations,
        "pending_colleges": pending_colleges
    }

def get_hackathons_monthly():
    """Get monthly hackathon creation statistics for charts."""
    
    pipeline = [
        {
            "$group": {
                "_id": {
                    "year": {"$year": "$created_at"},
                    "month": {"$month": "$created_at"}
                },
                "count": {"$sum": 1}
            }
        },
        {
            "$sort": {"_id.year": 1, "_id.month": 1}
        },
        {
            "$limit": 12  # Last 12 months
        }
    ]
    
    results = list(db.hackathons.aggregate(pipeline))
    
    # Convert to chart-ready format
    month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    labels = []
    values = []
    
    for item in results:
        month_index = item["_id"]["month"] - 1
        year = item["_id"]["year"]
        labels.append(f"{month_names[month_index]} {year}")
        values.append(item["count"])
    
    return {
        "labels": labels,
        "values": values
    }

def get_registrations_monthly():
    """Get monthly registration statistics for charts."""
    
    pipeline = [
        {
            "$group": {
                "_id": {
                    "year": {"$year": "$created_at"},
                    "month": {"$month": "$created_at"}
                },
                "count": {"$sum": 1}
            }
        },
        {
            "$sort": {"_id.year": 1, "_id.month": 1}
        },
        {
            "$limit": 12  # Last 12 months
        }
    ]
    
    results = list(db.registrations.aggregate(pipeline))
    
    # Convert to chart-ready format
    month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    labels = []
    values = []
    
    for item in results:
        month_index = item["_id"]["month"] - 1
        year = item["_id"]["year"]
        labels.append(f"{month_names[month_index]} {year}")
        values.append(item["count"])
    
    return {
        "labels": labels,
        "values": values
    }
