
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import APP_NAME, CORS_ORIGINS
from app.db.init_db import init_db
from app.db.seed import seed_projects
from app.api.routes import portfolio
from app.api.routes import contact
from app.api.routes import chat

app = FastAPI(title=APP_NAME)

@app.on_event("startup")
def on_startup():
    init_db()
    seed_projects()

app.include_router(portfolio.router)
app.include_router(contact.router)
app.include_router(chat.router)
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
