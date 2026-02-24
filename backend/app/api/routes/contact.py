from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.db.models import ContactMessage
from app.schemas.contact import ContactCreate

router = APIRouter(tags=["contact"])


@router.post("/contact")
def create_contact(payload: ContactCreate, db: Session = Depends(get_db)):
    msg = ContactMessage(
        name=payload.name.strip(),
        email=str(payload.email).strip().lower(),
        message=payload.message.strip(),
    )
    db.add(msg)
    db.commit()
    db.refresh(msg)

    return {"ok": True, "id": msg.id}