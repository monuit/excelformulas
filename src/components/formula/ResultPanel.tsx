"use client";

import { useEffect, useState } from "react";
import { parseFormulaOutput } from "@/lib/ui/parse-formula";

interface ResultPanelProps {
  completion: string;
  isLoading: boolean;
  mode: "excel" | "sheets";
}

export function ResultPanel({ completion, isLoading, mode }: ResultPanelProps) {
  const [copied, setCopied] = useState(false);
  const parsed = parseFormulaOutput(completion);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    if (!parsed.formula) {
      return;
    }
    await navigator.clipboard.writeText(parsed.formula);
    setCopied(true);
  };

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-sky-100">Generated formula</h2>
          <p className="text-xs text-slate-300/80">
            {mode === "excel" ? "Excel" : "Google Sheets"} optimized
            expression with explanation.
          </p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!parsed.formula}
          className="rounded-full border border-sky-300/40 px-4 py-2 text-xs font-semibold text-sky-100 transition hover:bg-sky-400/20 disabled:cursor-not-allowed disabled:border-slate-400/20 disabled:text-slate-400"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </header>

      <div className="rounded-2xl border border-white/10 bg-black/40 p-4 shadow-inner">
        {isLoading ? (
          <div className="space-y-3 text-sm text-slate-400">
            <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
            <div className="h-4 w-full animate-pulse rounded bg-white/10" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
          </div>
        ) : parsed.formula ? (
          <pre className="whitespace-pre-wrap break-words text-sm text-sky-100">
            {parsed.formula}
          </pre>
        ) : (
          <p className="text-sm text-slate-300/80">
            Describe what you want Excel or Google Sheets to do, then tap
            “Generate formula.”
          </p>
        )}
      </div>

      {parsed.explanation && (
        <div className="rounded-2xl border border-white/5 bg-white/10 p-4 text-sm text-slate-200">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-sky-200/80">
            How it works
          </h3>
          <p>{parsed.explanation}</p>
        </div>
      )}
    </section>
  );
}
