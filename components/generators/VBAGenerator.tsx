"use client";

import { useCompletion } from "@ai-sdk/react";
import { useState, FormEvent } from "react";
import { Lock } from "lucide-react";

interface VBAGeneratorProps {
  isPremium: boolean;
}

export function VBAGenerator({ isPremium }: VBAGeneratorProps) {
  const [prompt, setPrompt] = useState("");

  const { completion, isLoading, complete } = useCompletion({
    api: "/api/vba",
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
          <h2 className="text-2xl font-bold text-slate-100">VBA Code Generator</h2>
          <p className="mt-1 text-sm text-slate-400">
            Generate Excel VBA macros and automation code
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
          <label htmlFor="vba-prompt" className="mb-2 block text-sm font-medium text-slate-300">
            Describe what you want the VBA code to do
          </label>
          <textarea
            id="vba-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Create a macro that automatically formats selected cells with alternating row colors and bold headers"
            className="min-h-[120px] w-full resize-y rounded-xl border border-white/20 bg-black/40 p-4 text-slate-100 placeholder-slate-500 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            disabled={!isPremium}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !prompt.trim() || !isPremium}
          className="btn-primary w-full"
        >
          {isLoading ? "Generating..." : isPremium ? "Generate VBA Code" : "🔒 Unlock with Ko-fi"}
        </button>
      </form>

      {completion && (
        <div className="mt-6 rounded-xl border border-white/20 bg-black/40 p-6">
          <h3 className="mb-3 text-sm font-semibold text-slate-300">Generated VBA Code</h3>
          <div className="prose prose-invert max-w-none">
            <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4">
              <code className="text-sm text-slate-100">{completion}</code>
            </pre>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(completion)}
            className="btn-secondary mt-4"
          >
            Copy Code
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
