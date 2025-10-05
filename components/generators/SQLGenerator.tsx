"use client";

import { useCompletion } from "@ai-sdk/react";
import { useState, FormEvent } from "react";
import { Lock, Database } from "lucide-react";

interface SQLGeneratorProps {
  isPremium: boolean;
}

export function SQLGenerator({ isPremium }: SQLGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [dialect, setDialect] = useState<"mysql" | "postgresql" | "sqlserver" | "sqlite">("mysql");

  const { completion, isLoading, complete } = useCompletion({
    api: "/api/sql",
    body: { dialect },
    onError(error: any) {
      if (error?.message?.includes("Premium feature")) {
        // Show upgrade prompt
      }
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    if (!isPremium) {
      alert("This is a premium feature. Please support us on Ko-fi to unlock!");
      return;
    }

    await complete(prompt);
  };

  return (
    <div className="glass rounded-2xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-100">
            <Database className="h-6 w-6" />
            SQL Query Generator
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Generate optimized SQL queries for any database
          </p>
        </div>
        {!isPremium && (
          <div className="flex items-center gap-2 rounded-lg bg-purple-500/20 px-4 py-2">
            <Lock className="h-4 w-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300">Premium</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="sql-dialect" className="mb-2 block text-sm font-medium text-slate-300">
            Database Type
          </label>
          <select
            id="sql-dialect"
            value={dialect}
            onChange={(e) => setDialect(e.target.value as any)}
            className="w-full rounded-xl border border-white/20 bg-black/40 p-3 text-slate-100 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            disabled={!isPremium}
          >
            <option value="mysql">MySQL</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="sqlserver">SQL Server</option>
            <option value="sqlite">SQLite</option>
          </select>
        </div>

        <div>
          <label htmlFor="sql-prompt" className="mb-2 block text-sm font-medium text-slate-300">
            Describe the query you need
          </label>
          <textarea
            id="sql-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Select all users who made a purchase in the last 30 days, group by country, and show total revenue"
            className="min-h-[120px] w-full resize-y rounded-xl border border-white/20 bg-black/40 p-4 text-slate-100 placeholder-slate-500 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            disabled={!isPremium}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !prompt.trim() || !isPremium}
          className="btn-primary w-full"
        >
          {isLoading ? "Generating..." : isPremium ? "Generate SQL Query" : "🔒 Unlock with Ko-fi"}
        </button>
      </form>

      {completion && (
        <div className="mt-6 rounded-xl border border-white/20 bg-black/40 p-6">
          <h3 className="mb-3 text-sm font-semibold text-slate-300">Generated SQL Query</h3>
          <div className="prose prose-invert max-w-none">
            <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4">
              <code className="text-sm text-slate-100">{completion}</code>
            </pre>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(completion)}
            className="btn-secondary mt-4"
          >
            Copy Query
          </button>
        </div>
      )}

      {!isPremium && (
        <div className="mt-6 rounded-xl border border-purple-500/30 bg-purple-500/10 p-6 text-center">
          <Lock className="mx-auto mb-3 h-8 w-8 text-purple-400" />
          <h3 className="mb-2 text-lg font-semibold text-purple-300">Unlock Premium Features</h3>
          <p className="mb-4 text-sm text-slate-400">
            Support us with a $5+ donation on Ko-fi to get lifetime access to VBA and SQL generators!
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
      )}
    </div>
  );
}
