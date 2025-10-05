"use client";

interface ExamplesRailProps {
  onSelect: (example: string) => void;
}

const EXAMPLES = [
  "Sum column B when the date in column A is within the current month",
  "Extract the domain name from email addresses in column C",
  "Flag rows where revenue in D is above 150% of the rolling 3-month average",
  "Split full names in column A into first, middle, and last names",
  "Match the latest status in sheet 'Updates' by project ID",
  "Fill down the last non-empty value until a new header appears",
];

export function ExamplesRail({ onSelect }: ExamplesRailProps) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Prompt examples">
      {EXAMPLES.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onSelect(item)}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-200 transition hover:border-sky-300/50 hover:text-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
