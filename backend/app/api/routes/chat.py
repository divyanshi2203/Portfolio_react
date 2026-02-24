from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.db.models import Project
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.openrouter_service import ask_openrouter

router = APIRouter(tags=["chat"])


def build_context(projects: list[Project]) -> str:
    lines = []
    lines.append("Name: Divyanshi Saini")
    lines.append("Role: Software Engineer (Python / JS)")
    lines.append("Projects:")
    for p in projects:
        lines.append(f"- {p.title}: {p.description} (Tech: {p.tech_stack or 'N/A'})")
        if p.github_url:
            lines.append(f"  GitHub: {p.github_url}")
        if p.live_url:
            lines.append(f"  Live: {p.live_url}")
    lines.append("Contact: Use the contact form on the site or email shown on the site.")
    return "\n".join(lines)


@router.post("/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest, db: Session = Depends(get_db)):
    projects = (
        db.query(Project)
        .order_by(Project.sort_order.asc(), Project.id.asc())
        .all()
    )
    context = build_context(projects)
    reply = await ask_openrouter(payload.message, context)
    return ChatResponse(reply=reply)