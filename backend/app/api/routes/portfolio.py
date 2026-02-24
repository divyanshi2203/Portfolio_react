from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.db.models import Project

router = APIRouter(tags=["portfolio"])


@router.get("/portfolio")
def get_portfolio(db: Session = Depends(get_db)):
    projects = (
        db.query(Project)
        .order_by(Project.sort_order.asc(), Project.id.asc())
        .all()
    )

    return {
        "projects": [
            {
                "id": p.id,
                "title": p.title,
                "description": p.description,
                "github_url": p.github_url,
                "live_url": p.live_url,
                "tech_stack": p.tech_stack,
            }
            for p in projects
        ]
    }