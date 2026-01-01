from app.database import get_db, serialize_doc
from datetime import datetime
from bson import ObjectId

db = get_db()

def create_notification(user_id: str, title: str, message: str, type: str):
    notification = {
        "user_id": user_id,
        "title": title,
        "message": message,
        "type": type,
        "is_read": False,
        "created_at": datetime.utcnow()
    }
    db.notifications.insert_one(notification)

def get_user_notifications(user_id: str):
    notifications = list(db.notifications.find({"user_id": user_id}).sort("created_at", -1))
    return [serialize_doc(notif) for notif in notifications]

def mark_notification_read(notification_id: str, user_id: str):
    db.notifications.update_one(
        {"_id": ObjectId(notification_id), "user_id": user_id},
        {"$set": {"is_read": True}}
    )
    return {"message": "Notification marked as read"}

def mark_all_read(user_id: str):
    db.notifications.update_many(
        {"user_id": user_id, "is_read": False},
        {"$set": {"is_read": True}}
    )
    return {"message": "All notifications marked as read"}

