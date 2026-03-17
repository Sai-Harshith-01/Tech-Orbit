from fastapi import APIRouter, status
from app.services import rss_service
from app.schemas.rss_schema import RSSArticle
from typing import List

router = APIRouter(prefix="/news", tags=["News"])

@router.get(
    "/",
    response_model=List[RSSArticle],
    status_code=status.HTTP_200_OK,
    summary="Get latest tech news",
    description="Fetch the latest 10 tech news articles from RSS feeds, sorted by publication date (newest first)."
)
def get_news():
    return rss_service.get_latest_news()

