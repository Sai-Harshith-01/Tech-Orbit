from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException, status
from app.services import article_service
from app.utils.role_checker import role_required
from app.schemas.article_schema import ArticleCreate, ArticleResponse, ArticleCreateResponse
from app.schemas.comment_schema import CommentCreate, CommentResponse
from typing import List

router = APIRouter(prefix="/student/articles", tags=["Student Articles"])

@router.post(
    "/",
    response_model=ArticleCreateResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Post a new article",
    description="Create a new article with title, content (max 500 chars), and image. Only students can post articles."
)
def post_article(
    title: str = Form(..., description="Article title"),
    content: str = Form(..., description="Article content (max 500 characters)"),
    image: UploadFile = File(..., description="Article image"),
    current_user: dict = Depends(role_required(["STUDENT"]))
):
    if len(content) > 500:
        raise HTTPException(status_code=400, detail="Content exceeds 500 characters")
    
    article_data = ArticleCreate(title=title, content=content)
    return article_service.create_article(article_data, image, current_user)

@router.get(
    "/",
    response_model=List[ArticleResponse],
    status_code=status.HTTP_200_OK,
    summary="Get all articles",
    description="Retrieve all student articles, sorted by creation date (newest first). Public endpoint."
)
def get_articles():
    return article_service.get_all_articles()

@router.post(
    "/{article_id}/comment",
    response_model=CommentResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Comment on an article",
    description="Add a comment to an article. All authenticated users can comment."
)
def comment_on_article(
    article_id: str,
    comment: CommentCreate,
    current_user: dict = Depends(role_required(["STUDENT", "COLLEGE", "ADMIN"]))
):
    return article_service.add_comment(article_id, comment, current_user)

