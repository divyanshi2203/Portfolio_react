import { useMemo, useRef, useState } from "react";
import { sendChat } from "../api";
import "./ChatWidget.css";

type ChatMsg = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      id: uid(),
      role: "assistant",
      text:
        "Hey 👋 I’m Divyanshi’s portfolio assistant. Ask me about projects, skills, or how to contact him.",
    },
  ]);

  const listRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: ChatMsg = { id: uid(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Scroll after render
    setTimeout(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }, 0);

    try {
      const res = await sendChat({ message: text });
      const botMsg: ChatMsg = { id: uid(), role: "assistant", text: res.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Chat failed";
      setMessages((prev) => [
        ...prev,
        { id: uid(), role: "assistant", text: `Sorry — ${msg}` },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
      }, 0);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") send();
  }

  return (
    <>
      <button className="chatFab" onClick={() => setOpen((v) => !v)} aria-label="Open chat">
        <span className="chatFabDot" />
        <span className="chatFabText">{open ? "Close" : "Ask AI"}</span>
      </button>

      {open ? (
        <div className="chatPanel" role="dialog" aria-label="Portfolio assistant chat">
          <div className="chatHeader">
            <div className="chatTitle">
              <span className="chatLogo" />
              <div>
                <div className="chatTitleMain">Portfolio Assistant</div>
                <div className="chatTitleSub">Powered by OpenRouter</div>
              </div>
            </div>

            <button className="chatClose" onClick={() => setOpen(false)} aria-label="Close chat">
              ✕
            </button>
          </div>

          <div className="chatQuick">
            <button onClick={() => setInput("Summarize Divyanshi’s skills in 3 lines.")}>
              Skills
            </button>
            <button onClick={() => setInput("What projects has Divyanshi built?")}>Projects</button>
            <button onClick={() => setInput("How can I contact Divyanshi?")}>Contact</button>
          </div>

          <div className="chatList" ref={listRef}>
            {messages.map((m) => (
              <div key={m.id} className={`chatBubble ${m.role}`}>
                {m.text}
              </div>
            ))}
            {loading ? <div className="chatTyping">Typing…</div> : null}
          </div>

          <div className="chatInputRow">
            <input
              className="chatInput"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask something…"
            />
            <button className="chatSend" disabled={!canSend} onClick={send}>
              Send
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}