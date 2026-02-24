// frontend/src/api.ts

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export type Project = {
  id: number;
  title: string;
  description: string;
  github_url: string | null;
  live_url: string | null;
  tech_stack: string | null;
};

export type PortfolioResponse = {
  projects: Project[];
};

export async function getPortfolio(): Promise<PortfolioResponse> {
  const res = await fetch(`${API_BASE_URL}/portfolio`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to fetch portfolio (${res.status}). ${text}`);
  }

  return (await res.json()) as PortfolioResponse;
}

export type ContactCreate = {
  name: string;
  email: string;
  message: string;
};

export type ContactResponse = {
  ok: boolean;
  id: number;
};

export async function sendContact(payload: ContactCreate): Promise<ContactResponse> {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to send message (${res.status}). ${text}`);
  }

  return (await res.json()) as ContactResponse;
}

export type ChatRequest = {
  message: string;
};

export type ChatResponse = {
  reply: string;
};

export async function sendChat(payload: ChatRequest): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Chat failed (${res.status}). ${text}`);
  }

  return (await res.json()) as ChatResponse;
}