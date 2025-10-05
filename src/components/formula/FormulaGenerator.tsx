"use client";

import { useCompletion } from "ai/react";
import clsx from "clsx";
import { FormEvent, useMemo, useRef, useState } from "react";
import { track } from "@vercel/analytics/react";
import { ExamplesRail } from "./ExamplesRail";
import { ModeToggle } from "./ModeToggle";
import { ResultPanel } from "./ResultPanel";
import { SupportKoFi } from "./SupportKoFi";

type Mode = "excel" | "sheets";

const MAX_PROMPT_LENGTH = 1000;

export function FormulaGenerator() {
  const [mode, setMode] = useState<Mode>("excel");
  const [prompt, setPrompt] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const completionConfig = useCompletion({
    api: "/api/formula",
    onFinish(_, completionText) {
      const completion = typeof completionText === "string" ? completionText : "";
      if (completion) {
        track("formula_generated", {
          mode,
          length: completion.length,
        });
      }
    },
    onError(error) {
      setErrorMessage(
        error?.message ?? "We couldn’t generate a formula right now. Please try again.",
      );
    },
  });

  const { complete, completion, isLoading, setCompletion, error } =
    completionConfig;

  const characterCount = useMemo(() => prompt.trim().length, [prompt]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleaned = prompt.trim();
    if (!cleaned) {
      setErrorMessage("Tell us what you need the spreadsheet to do.");
      textareaRef.current?.focus();
      return;
    }

    if (cleaned.length > MAX_PROMPT_LENGTH) {
      setErrorMessage("Keep the request under 1,000 characters so we can process it quickly.");
      return;
    }

    setErrorMessage(null);
    setCompletion("");
    track("formula_submit", { mode, length: cleaned.length });
    await complete(cleaned, {
      body: {
        mode,
      },
    });
  };

  const handleExampleSelect = (example: string) => {
    setPrompt(example);
    setErrorMessage(null);
    textareaRef.current?.focus();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <header className="space-y-2">
          <h2 className="text-xl font-semibold text-sky-100">
            Describe what you want Excel to do
          </h2>
          <p className="text-sm text-slate-200/80">
            Paste requirements, sample data, or business rules. We route your
            prompt through GPT-5 and Claude 4.5 to craft the best formula.
          </p>
        </header>

        <ModeToggle value={mode} onChange={setMode} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="flex flex-col gap-2 text-sm" htmlFor="formula-input">
            <span className="text-xs font-medium uppercase tracking-wide text-slate-300/80">
              Your request
            </span>
            <textarea
              id="formula-input"
              ref={textareaRef}
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="e.g. Compare current month revenue vs same month last year and return a percentage change"
              className="min-h-[180px] resize-y rounded-2xl border border-white/10 bg-black/40 p-4 text-base text-slate-100 outline-none transition focus:border-sky-300/60 focus:ring-2 focus:ring-sky-400/40"
            />
          </label>
          <div className="flex items-center justify-between text-xs text-slate-300/80">
            <span>
              {characterCount} / {MAX_PROMPT_LENGTH}
            </span>
            {(errorMessage || error) && (
              <span className="text-orange-300">
                {errorMessage ?? error?.message ?? "We couldn’t generate a formula right now."}
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className={clsx(
                "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300",
                isLoading
                  ? "cursor-wait border border-white/10 bg-white/10 text-slate-300"
                  : "bg-sky-400 text-slate-900 hover:bg-sky-300",
              )}
              disabled={isLoading}
            >
              {isLoading ? "Generating…" : "Generate formula"}
            </button>
            <span className="text-xs text-slate-300/80">
              No sign-up. Unlimited runs. Anonymous analytics only.
            </span>
          </div>
        </form>

        <ExamplesRail onSelect={handleExampleSelect} />
      </section>

      <div className="space-y-8">
        <ResultPanel completion={completion} isLoading={isLoading} mode={mode} />
        <SupportKoFi />
      </div>
    </div>
  );
}
