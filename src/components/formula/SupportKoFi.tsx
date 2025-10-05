"use client";

import { track } from "@vercel/analytics/react";

const KOFI_URL = "https://ko-fi.com/monuit";

export function SupportKoFi() {
  const handleClick = () => {
    track("kofi_click");
  };

  return (
    <section
      aria-labelledby="support-title"
      className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
    >
      <div className="flex flex-col gap-4">
        <div>
          <h2 id="support-title" className="text-lg font-semibold text-sky-200">
            Keep the generator free
          </h2>
          <p className="text-sm text-slate-200/80">
            Saved you hours? Support the project on Ko-fi so we can cover API
            costs and ship new features.
          </p>
        </div>
        <a
          href={KOFI_URL}
          target="_blank"
          rel="noreferrer"
          onClick={handleClick}
          className="inline-flex items-center justify-center rounded-full bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200"
        >
          Support on Ko-fi ☕
        </a>
        <div className="overflow-hidden rounded-xl border border-slate-200/10">
          <iframe
            id="kofiframe"
            src="https://ko-fi.com/monuit/?hidefeed=true&widget=true&embed=true&preview=true"
            style={{
              border: "none",
              width: "100%",
              padding: "4px",
              background: "#f9f9f9",
            }}
            height={712}
            title="monuit"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
