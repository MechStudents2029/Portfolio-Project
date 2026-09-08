"use client";

import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

const SUGGESTIONS = [
  "What's your coolest project?",
  "Tell me about the robotic arm",
  "What's Tarjam?",
  "Are you hiring-ready?",
];

const ChatWidget = forwardRef(function ChatWidget({ name }, ref) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: `Hey, I'm an AI version of ${name}. Ask me about any of my projects, hackathons, or what I'm building toward.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useImperativeHandle(ref, () => ({
    openWidget: () => setOpen(true),
  }));

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading, open]);

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
          messages: nextMessages.map((m) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "bot", text: data.reply || "Something went wrong — try again." },
      ]);
    } catch (e) {
      setMessages((m) => [...m, { role: "bot", text: "Network error — try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mb-4 flex h-[min(70vh,520px)] w-[min(90vw,380px)] flex-col overflow-hidden rounded-[22px] border border-white/15 bg-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.25)] backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <p className="font-sf text-[14px] font-semibold text-slate-900">
                  Ask {name}
                </p>
                <p className="font-sf text-[11.5px] text-slate-400">
                  Only knows real things I've built
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 font-sf text-[13px] leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-gradient-to-br from-sky-start to-sky-mid text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              {loading && (
                <div className="w-fit rounded-2xl bg-slate-100 px-3.5 py-2.5">
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.1s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                  </span>
                </div>
              )}
            </div>

            {messages.length < 2 && (
              <div className="flex flex-wrap gap-1.5 px-5 pb-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-slate-200 px-2.5 py-1 font-sf text-[11px] font-medium text-slate-500 transition-colors hover:border-sky-mid hover:text-sky-start"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 border-t border-slate-100 px-4 py-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask a question..."
                disabled={loading}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-sf text-[13px] text-slate-800 outline-none focus:border-sky-mid disabled:opacity-60"
              />
              <button
                onClick={() => send()}
                disabled={loading}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-start to-sky-mid text-white disabled:opacity-50"
                aria-label="Send"
              >
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
                  <path d="M2 10L18 2L11 18L9 11L2 10Z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        aria-label={open ? "Close chat" : "Open chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sky-start via-sky-mid to-sky-end text-white shadow-[0_10px_30px_rgba(43,111,255,0.4)]"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-4 4v-4H6a2 2 0 0 1-2-2V5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </motion.button>
    </div>
  );
});

export default ChatWidget;
