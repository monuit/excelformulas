"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Bug, Lock, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/lib/types";
import { fetchWithErrorHandlers, generateUUID } from "@/lib/utils";

type VBADebuggerProps = {
  isPremium: boolean;
};

export function VBADebugger({ isPremium }: VBADebuggerProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat<ChatMessage>({
    id: `vba-debug-${generateUUID()}`,
    generateId: generateUUID,
    transport: new DefaultChatTransport({
      api: "/api/debug/vba",
      fetch: fetchWithErrorHandlers,
    }),
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === "streaming") {
      return;
    }

    if (!isPremium) {
      alert("This is a premium feature. Please support us on Ko-fi to unlock!");
      return;
    }

    sendMessage({
      role: "user",
      parts: [{ type: "text", text: input }],
    });

    setInput("");
  };

  return (
    <div className="glass flex h-[600px] flex-col rounded-2xl">
      <div className="flex items-center justify-between border-white/10 border-b p-6">
        <div className="flex items-center gap-3">
          <Bug className="h-6 w-6 text-orange-400" />
          <div>
            <h2 className="font-bold text-slate-100 text-xl">
              VBA Debugger & Explainer
            </h2>
            <p className="text-slate-400 text-sm">
              Interactive VBA debugging assistant
            </p>
          </div>
        </div>
        {!isPremium && (
          <div className="flex items-center gap-2 rounded-lg bg-purple-500/20 px-4 py-2">
            <Lock className="h-4 w-4 text-purple-400" />
            <span className="font-semibold text-purple-300 text-sm">
              Premium
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Bug className="mb-4 h-12 w-12 text-slate-600" />
            <h3 className="mb-2 font-semibold text-lg text-slate-300">
              Start Debugging VBA Code
            </h3>
            <p className="max-w-md text-slate-400 text-sm">
              Paste your VBA code, describe the error, or ask questions about
              how your macros work.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                className={`rounded-xl p-4 ${
                  message.role === "user"
                    ? "ml-8 border border-blue-500/30 bg-blue-500/10"
                    : "mr-8 border border-white/10 bg-white/5"
                }`}
                key={message.id}
              >
                <div className="mb-2 font-semibold text-slate-400 text-xs uppercase tracking-wider">
                  {message.role === "user" ? "You" : "VBA Assistant"}
                </div>
                {message.parts.map((part, idx) => {
                  if (part.type === "text") {
                    return (
                      <div
                        className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap text-slate-100"
                        key={idx}
                      >
                        {part.text}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {isPremium ? (
        <form className="border-white/10 border-t p-4" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <textarea
              className="min-h-[80px] flex-1 resize-none rounded-xl border border-white/20 bg-black/40 p-3 text-slate-100 text-sm placeholder-slate-500 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              disabled={status === "streaming"}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  handleSubmit(e);
                }
              }}
              placeholder="Paste your VBA code or describe your issue..."
              value={input}
            />
            <button
              className="btn-primary flex h-[80px] items-center gap-2 px-6"
              disabled={status === "streaming" || !input.trim()}
              type="submit"
            >
              <Send className="h-4 w-4" />
              {status === "streaming" ? "..." : "Send"}
            </button>
          </div>
          <p className="mt-2 text-slate-500 text-xs">
            Press Ctrl+Enter to send • Be specific about errors for better help
          </p>
        </form>
      ) : (
        <div className="border-white/10 border-t bg-purple-500/10 p-6 text-center">
          <Lock className="mx-auto mb-3 h-8 w-8 text-purple-400" />
          <p className="mb-4 text-slate-300 text-sm">
            Unlock interactive VBA debugging with a $5+ Ko-fi donation
          </p>
          <a
            className="btn-primary inline-block"
            href={
              process.env.NEXT_PUBLIC_KOFI_URL || "https://ko-fi.com/yourpage"
            }
            rel="noopener noreferrer"
            target="_blank"
          >
            Support on Ko-fi
          </a>
        </div>
      )}
    </div>
  );
}
