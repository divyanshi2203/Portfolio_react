from app.db.session import SessionLocal
from app.db.models import Project


def seed_projects():
    db = SessionLocal()
    try:
        exists = db.query(Project).first()
        if exists:
            return

        db.add_all(
            [
                Project(
                    title="Project 1 - Flask REST API",
                    description="Collaborated on building a REST API with authentication and clean architecture.",
                    github_url="https://github.com/divyanshi2203/flask_rest_2026",
                    live_url=None,
                    tech_stack="Python, Flask, SQLAlchemy",
                    sort_order=1,
                ),
                Project(
                    title="Project 2 - LungCare+",
                    description="A project based on django and CNN, In it we detect cancer in an Lung CT scan and suggest doctors.",
                    github_url="https://github.com/divyanshi2203/Lungcare-",
                    live_url=None,
                    tech_stack="Python, Django, ML, Pytorch",
                    sort_order=2,
                ),
                Project(
                    title="Project 3 - Portfolio AI",
                    description="Portfolio with AI chat using OpenRouter and Python backend.",
                    github_url="https://github.com/divyanshi2203",
                    live_url=None,
                    tech_stack="React, FastAPI, OpenRouter",
                    sort_order=3,
                ),
            ]
        )
        db.commit()
    finally:
        db.close()