from pathlib import Path
import os
from dotenv import load_dotenv

# Try loading a local .env if present (dev only)
ENV_PATH = Path(__file__).resolve().parents[1] / ".env"
if ENV_PATH.exists():
    load_dotenv(dotenv_path=ENV_PATH)

APP_NAME = os.getenv("APP_NAME", "Portfolio API")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# IMPORTANT: default for local dev
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./local.db")

OPENROUTER_MODEL = os.getenv("OPENROUTER_MODEL", "openrouter/free")
OPENROUTER_SITE_URL = os.getenv("OPENROUTER_SITE_URL")
OPENROUTER_APP_NAME = os.getenv("OPENROUTER_APP_NAME", "PortfolioAI")
CORS_ORIGINS = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,http://localhost:3000"
).split(",")