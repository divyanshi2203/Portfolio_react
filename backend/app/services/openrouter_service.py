import httpx

from app.core.config import (
    OPENROUTER_API_KEY,
    OPENROUTER_MODEL,
    OPENROUTER_SITE_URL,
    OPENROUTER_APP_NAME,
)


def build_portfolio_system_prompt(context: str) -> str:
    return (
        "You are Divyanshi's portfolio assistant.\n"
        "Answer questions about Divyanshi's skills, projects, experience, and how to contact him.\n"
        "Be concise, friendly, and professional.\n"
        "Only use the portfolio context provided below. If the answer isn't in the context, say you don't know.\n\n"
        "PORTFOLIO CONTEXT:\n"
        f"{context}\n"
    )


async def ask_openrouter(user_message: str,context: str) -> str:
    if not OPENROUTER_API_KEY:
        raise RuntimeError("OPENROUTER_API_KEY is not set")

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }

    # Optional but recommended by OpenRouter
    if OPENROUTER_SITE_URL:
        headers["HTTP-Referer"] = OPENROUTER_SITE_URL
    if OPENROUTER_APP_NAME:
        headers["X-Title"] = OPENROUTER_APP_NAME

    payload = {
        "model": OPENROUTER_MODEL,
        "messages": [
            {"role": "system","content": build_portfolio_system_prompt(context)},
            {"role": "user", "content": user_message},
        ],
    }

    async with httpx.AsyncClient(timeout=30) as client:
        r = await client.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=payload,
        )
        r.raise_for_status()
        data = r.json()

    # OpenAI-style response
    return data["choices"][0]["message"]["content"]