import feedparser
from apscheduler.schedulers.background import BackgroundScheduler
from app.database import get_db
from datetime import datetime
import time

db = get_db()

RSS_FEEDS = [
    "https://techcrunch.com/feed/",
    "https://www.theverge.com/rss/index.xml",
    "https://news.ycombinator.com/rss"
]

def fetch_rss_feed():
    print(f"[{datetime.now()}] Fetching RSS feeds...")
    articles = []
    
    for url in RSS_FEEDS:
        feed = feedparser.parse(url)
        for entry in feed.entries[:5]:  # Limit to top 5 per source to avoid overload
            # Avoid duplicates
            if db.rss_articles.find_one({"link": entry.link}):
                continue
            
            published_at = datetime.now()
            if hasattr(entry, 'published_parsed') and entry.published_parsed:
                 published_at = datetime.fromtimestamp(time.mktime(entry.published_parsed))
            
            article = {
                "title": entry.title,
                "link": entry.link,
                "summary": entry.summary if hasattr(entry, 'summary') else "",
                "source": feed.feed.title if hasattr(feed.feed, 'title') else url,
                "published_at": published_at
            }
            articles.append(article)
    
    if articles:
        db.rss_articles.insert_many(articles)
        print(f"Inserted {len(articles)} new articles.")
    else:
        print("No new articles found.")

def start_rss_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(fetch_rss_feed, 'interval', hours=1)
    scheduler.start()
    # Fetch immediately on startup
    fetch_rss_feed()
