"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import { Lock, AlertCircle, Send } from "lucide-react";
import { generateUUID, fetchWithErrorHandlers } from "@/lib/utils";
import type { ChatMessage } from "@/lib/types";

interface FormulaDebuggerProps {
  isPremium: boolean;
}

export function FormulaDebugger({ isPremium }: FormulaDebuggerProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat<ChatMessage>({
    id: `formula-debug-${generateUUID()}`,
    generateId: generateUUID,
    transport: new DefaultChatTransport({
      api: "/api/debug/formula",
      fetch: fetchWithErrorHandlers,
    }),
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === "streaming") return;

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
      <div className="flex items-center justify-between border-b border-white/10 p-6">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-6 w-6 text-yellow-400" />
          <div>
            <h2 className="text-xl font-bold text-slate-100">Formula Debugger & Explainer</h2>
            <p className="text-sm text-slate-400">Interactive formula debugging assistant</p>
          </div>
        </div>
        {!isPremium && (
          <div className="flex items-center gap-2 rounded-lg bg-purple-500/20 px-4 py-2">
            <Lock className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300">Premium</span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <AlertCircle className="mb-4 h-12 w-12 text-slate-600" />
            <h3 className="mb-2 text-lg font-semibold text-slate-300">
              Start Debugging Formulas
            </h3>
            <p className="max-w-md text-sm text-slate-400">
              Paste your Excel formula, describe what's wrong, or ask for explanations of complex formulas.
            </p>
            <div className="mt-6 grid gap-2 text-left text-xs text-slate-500">
              <p>💡 Common issues we can help with:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>#REF!, #VALUE!, #DIV/0! errors</li>
                <li>Understanding nested IF statements</li>
                <li>VLOOKUP vs INDEX/MATCH optimization</li>
                <li>Array formula explanations</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`rounded-xl p-4 ${
                  message.role === "user"
                    ? "ml-8 border border-blue-500/30 bg-blue-500/10"
                    : "mr-8 border border-white/10 bg-white/5"
                }`}
              >
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {message.role === "user" ? "You" : "Formula Assistant"}
                </div>
                {message.parts.map((part, idx) => {
                  if (part.type === "text") {
                    return (
                      <div
                        key={idx}
                        className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap text-slate-100"
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

      {!isPremium ? (
        <div className="border-t border-white/10 bg-purple-500/10 p-6 text-center">
          <Lock className="mx-auto mb-3 h-8 w-8 text-purple-400" />
          <p className="mb-4 text-sm text-slate-300">
            Unlock interactive formula debugging with a $5+ Ko-fi donation
          </p>
          <a
            href={process.env.NEXT_PUBLIC_KOFI_URL || "https://ko-fi.com/yourpage"}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-block"
          >
            Support on Ko-fi
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="border-t border-white/10 p-4">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your formula or describe the issue..."
              className="min-h-[80px] flex-1 resize-none rounded-xl border border-white/20 bg-black/40 p-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              disabled={status === "streaming"}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                  handleSubmit(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={status === "streaming" || !input.trim()}
              className="btn-primary flex h-[80px] items-center gap-2 px-6"
            >
              <Send className="h-4 w-4" />
              {status === "streaming" ? "..." : "Send"}
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Press Ctrl+Enter to send • Include sample data for better debugging
          </p>
        </form>
      )}
    </div>
  );
}
