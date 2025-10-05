"use client";

import clsx from "clsx";

type Mode = "excel" | "sheets";

interface ModeToggleProps {
  value: Mode;
  onChange: (mode: Mode) => void;
}

const MODES: Array<{ value: Mode; label: string; description: string }> = [
  {
    value: "excel",
    label: "Excel",
    description: "Microsoft 365 dynamic array formulas",
  },
  {
    value: "sheets",
    label: "Google Sheets",
    description: "ARRAYFORMULA-friendly syntax",
  },
];

export function ModeToggle({ value, onChange }: ModeToggleProps) {
  return (
    <fieldset className="rounded-2xl border border-white/10 bg-white/5 p-2 text-sm text-slate-200">
      <legend className="px-2 text-xs font-semibold uppercase tracking-wide text-slate-300/80">
        Output mode
      </legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {MODES.map((mode) => {
          const isActive = value === mode.value;
          return (
            <button
              type="button"
              key={mode.value}
              onClick={() => onChange(mode.value)}
              className={clsx(
                "rounded-xl border px-4 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400",
                isActive
                  ? "border-sky-300/40 bg-sky-400/20 text-sky-100"
                  : "border-white/10 bg-slate-900/60 hover:border-slate-100/20",
              )}
              aria-pressed={isActive}
            >
              <span className="font-semibold">{mode.label}</span>
              <span className="mt-1 block text-xs text-slate-300/80">
                {mode.description}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
