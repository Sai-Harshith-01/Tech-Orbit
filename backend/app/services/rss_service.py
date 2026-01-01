from app.database import get_db

db = get_db()

def get_latest_news():
    articles = list(db.rss_articles.find({}, {"_id": 0}).sort("published_at", -1).limit(10))
    return articles
