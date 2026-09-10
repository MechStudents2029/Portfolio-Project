"use client";

import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

const SUGGESTIONS = [
  { id: "Q-01", text: "What's your coolest project?" },
  { id: "Q-02", text: "Tell me about the robotic arm" },
  { id: "Q-03", text: "What's Tarjam?" },
  { id: "Q-04", text: "Are you hiring-ready?" },
];

const ChatWidget = forwardRef(function ChatWidget({ name }, ref) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    openWidget: () => setOpen(true),
  }));

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [open]);

  async function send(text) {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;
    const nextMessages = [...messages, { role: "user", text: userText }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages
            .filter((m) => m.role === "user" || m.role === "bot")
            .map((m) => ({
              role: m.role === "user" ? "user" : "assistant",
              content: m.text,
            })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessages((m) => [
          ...m,
          { role: "error", text: data.reply || `Fault ${res.status} — channel refused the query.` },
        ]);
        return;
      }
      setMessages((m) => [
        ...m,
        { role: "bot", text: data.reply || "Empty reply from the mill. Try another query." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "error", text: "Line down — network fault. Recheck the connection and send again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const empty = messages.length === 0 && !loading;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="mb-3 flex h-[min(78vh,560px)] w-[min(calc(100vw-2rem),420px)] flex-col border border-ink bg-paper shadow-[6px_6px_0_0_#161410]"
            role="dialog"
            aria-label={`Ask ${name}`}
          >
            <header className="flex items-center justify-between border-b border-ink bg-mill px-3 py-2.5">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-cadmium" aria-hidden />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cadmium">
                    Comms · CH-07
                  </p>
                  <p className="font-display text-[20px] font-bold uppercase leading-none tracking-tight text-paper">
                    Ask {name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setMessages([])}
                    className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/50 hover:text-cadmium"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="flex h-8 w-8 items-center justify-center border border-paper/25 text-paper/70 hover:border-cadmium hover:text-cadmium"
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </button>
              </div>
            </header>

            <p className="border-b border-ink bg-paper px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
              Ground truth only · no invented specs
            </p>

            <div ref={scrollRef} className="relative flex-1 overflow-y-auto">
              {empty ? (
                <div className="flex h-full flex-col justify-between p-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cadmium">Log empty</p>
                    <h3 className="mt-2 font-display text-[34px] font-extrabold uppercase leading-[0.88] tracking-tight text-ink">
                      Channel open.
                    </h3>
                    <p className="mt-3 max-w-[18rem] font-sans text-[13px] leading-relaxed text-mute">
                      Query the drawing. I only know projects, hackathons, and what {name} is actually building.
                    </p>
                  </div>
                  <ul className="mt-6 divide-y divide-ink border-y border-ink">
                    {SUGGESTIONS.map((s) => (
                      <li key={s.id}>
                        <button
                          type="button"
                          onClick={() => send(s.text)}
                          className="flex w-full items-baseline justify-between gap-3 py-2.5 text-left hover:text-cadmium"
                        >
                          <span className="font-mono text-[10px] text-cadmium">{s.id}</span>
                          <span className="flex-1 font-sans text-[13px] text-ink">{s.text}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="space-y-0">
                  {messages.map((m, i) => {
                    const isUser = m.role === "user";
                    const isError = m.role === "error";
                    const tag = isUser ? "YOU" : isError ? "FAULT" : "SYS";
                    return (
                      <article
                        key={`${tag}-${i}`}
                        className={`border-b border-ink px-3 py-3 ${isError ? "bg-cadmium/10" : isUser ? "bg-ink/[0.03]" : "bg-paper"}`}
                      >
                        <div className="mb-1.5 flex items-center justify-between">
                          <span
                            className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
                              isUser ? "text-ink" : "text-cadmium"
                            }`}
                          >
                            {tag} · {String(i + 1).padStart(2, "0")}
                          </span>
                          {isError && (
                            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-cadmium">
                              retry from input
                            </span>
                          )}
                        </div>
                        <p className="font-sans text-[13.5px] leading-relaxed text-ink">{m.text}</p>
                      </article>
                    );
                  })}
                  {loading && (
                    <div className="border-b border-ink px-3 py-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cadmium">
                        Mill · waiting
                      </p>
                      <p className="mt-2 flex items-center gap-2 font-mono text-[12px] text-mute">
                        <span className="inline-block h-2 w-2 animate-pulse bg-cadmium" />
                        Cutting a reply…
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex border-t border-ink"
            >
              <label htmlFor="comms-input" className="sr-only">
                Ask a question
              </label>
              <input
                id="comms-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a query…"
                disabled={loading}
                className="min-w-0 flex-1 bg-paper px-3 py-3 font-sans text-[14px] text-ink outline-none placeholder:text-mute/70 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="shrink-0 bg-cadmium px-4 font-mono text-[11px] uppercase tracking-[0.16em] text-paper disabled:bg-ink/20 disabled:text-ink/40"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ x: 1, y: -1 }}
        whileTap={{ x: 0, y: 0 }}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
        className="flex items-center gap-3 border border-ink bg-cadmium px-3 py-2.5 text-left text-paper shadow-[4px_4px_0_0_#161410]"
      >
        <span className={`h-2 w-2 bg-paper ${open ? "" : "animate-pulse"}`} />
        <span>
          <span className="block font-mono text-[10px] uppercase tracking-[0.2em] opacity-80">
            {open ? "Close channel" : "Comms live"}
          </span>
          <span className="font-display text-[18px] font-bold uppercase leading-none tracking-tight">
            {open ? "Hang up" : "Ask Adam"}
          </span>
        </span>
      </motion.button>
    </div>
  );
});

export default ChatWidget;
