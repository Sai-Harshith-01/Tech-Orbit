from app.database import get_db, serialize_doc
from app.schemas.article_schema import ArticleCreate
from app.schemas.comment_schema import CommentCreate
from app.services import notification_service
from fastapi import UploadFile, HTTPException
import shutil
import os
from datetime import datetime
from bson import ObjectId

db = get_db()
UPLOAD_DIR = "uploads/articles"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def create_article(article_data: ArticleCreate, image: UploadFile, user: dict):
    # Save image
    file_location = f"{UPLOAD_DIR}/{datetime.now().timestamp()}_{image.filename}"
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    
    article = {
        "title": article_data.title,
        "content": article_data.content,
        "image_url": file_location,
        "student_id": user["user_id"],
        "student_email": db.users.find_one({"_id": ObjectId(user["user_id"])})["email"],
        "created_at": datetime.utcnow()
    }
    result = db.articles.insert_one(article)
    return {"message": "Article posted successfully", "id": str(result.inserted_id)}

def get_all_articles():
    articles = list(db.articles.find().sort("created_at", -1))
    return [serialize_doc(article) for article in articles]

def add_comment(article_id: str, comment_data: CommentCreate, user: dict):
    article = db.articles.find_one({"_id": ObjectId(article_id)})
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    comment = {
        "article_id": article_id,
        "user_id": user["user_id"],
        "message": comment_data.message,
        "created_at": datetime.utcnow()
    }
    db.comments.insert_one(comment)
    
    # Trigger notification
    if article["student_id"] != user["user_id"]: # Don't notify if commenting on own article
        # Get commenter's email/name
        commenter = db.users.find_one({"_id": ObjectId(user["user_id"])})
        commenter_name = commenter["email"] if commenter else "Someone"
        
        notification_service.create_notification(
            user_id=article["student_id"],
            title="New Comment",
            message=f"{commenter_name} commented on your article: {article['title']}",
            type="COMMENT"
        )
    
    return {"message": "Comment added"}

