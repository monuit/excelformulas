import Link from "next/link";
import { FormulaGenerator } from "@/components/formula/FormulaGenerator";
import { StructuredData } from "@/components/seo/StructuredData";
import { siteConfig } from "@/config/site";

const heroSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description: siteConfig.description,
  url: siteConfig.url,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteConfig.url}?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "AI Excel Formula Generator",
      item: siteConfig.url,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: siteConfig.faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to generate an Excel formula from text",
  description:
    "Enter a spreadsheet task, choose Excel or Google Sheets mode, and copy the AI-generated formula with explanation.",
  step: [
    {
      "@type": "HowToStep",
      name: "Describe your task",
      text: "Type what you want Excel or Google Sheets to do in the request field.",
    },
    {
      "@type": "HowToStep",
      name: "Choose formula mode",
      text: "Toggle between Excel or Google Sheets output for platform-specific syntax.",
    },
    {
      "@type": "HowToStep",
      name: "Generate and copy",
      text: "Press Generate formula, review the explanation, and copy the formula with one click.",
    },
  ],
};

const featureHighlights = [
  {
    title: "Excel formulas without guesswork",
    description:
      "Convert natural language into precise formulas that use SUMIFS, XLOOKUP, FILTER, LET, and LAMBDA functions when they offer better performance.",
  },
  {
    title: "Dual Excel & Google Sheets support",
    description:
      "Toggle between Excel and Sheets to adapt syntax instantly. Perfect for migrating automations between Microsoft 365 and Google Workspace.",
  },
  {
    title: "Explain every formula in plain English",
    description:
      "Get a plain-language breakdown of how the logic works so you can teach teammates, debug errors, or document complex spreadsheet models.",
  },
];

export default function HomePage() {
  return (
    <>
      <StructuredData data={[heroSchema, websiteSchema, breadcrumbSchema, faqSchema, howToSchema]} />
      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 pt-16 sm:px-8 lg:px-12">
        <section className="space-y-6 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300/80">
            AI Excel Formula Generator
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-slate-50 sm:text-5xl">
            AI Excel Formula Generator — Convert Text to Excel Formulas Free
          </h1>
          <p className="max-w-2xl text-lg text-slate-200/80">
            Describe what you need and get the exact Excel or Google Sheets formula in seconds. Free forever, privacy-friendly, powered by GPT-5 and Claude 4.5.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <Link
              href="#generator"
              className="rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-sky-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200"
            >
              Start generating formulas
            </Link>
            <Link
              href="/excel/xlookup-tutorial"
              className="text-sm font-semibold text-sky-200 hover:text-sky-100"
            >
              Learn XLOOKUP best practices →
            </Link>
          </div>
        </section>

        <section id="generator">
          <FormulaGenerator />
        </section>

        <section className="grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur lg:grid-cols-3">
          {featureHighlights.map((feature) => (
            <article key={feature.title} className="space-y-3">
              <h2 className="text-lg font-semibold text-sky-100">{feature.title}</h2>
              <p className="text-sm text-slate-300/80">{feature.description}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h2 className="text-2xl font-semibold text-sky-100">
              Why analysts love this Excel AI tool
            </h2>
            <ul className="space-y-4 text-sm text-slate-200/80">
              <li>
                ✅ Build SUMIFS, INDEX/MATCH, FILTER, and dynamic array formulas without memorizing syntax.
              </li>
              <li>
                ✅ Auto-detects when to use LAMBDA, LET, TEXTSPLIT, MAP, and BYROW helpers for reusable formulas.
              </li>
              <li>
                ✅ Supports complex spreadsheet automation including nested IF logic, regex text cleanup, and cross-sheet lookups.
              </li>
            </ul>
            <p className="text-sm text-slate-200/70">
              Great for financial modeling, marketing dashboards, CRM hygiene, revenue operations, and data analytics teams that live in Excel and Google Sheets.
            </p>
          </div>
          <aside className="rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-900/40 p-8 text-sm text-slate-200/80">
            <h2 className="text-lg font-semibold text-sky-100">Power features</h2>
            <ul className="mt-4 space-y-3">
              <li>• AI router picks GPT-5 or Claude 4.5 per prompt complexity.</li>
              <li>• Streaming responses, optimized for Edge performance.</li>
              <li>• Copyable formulas with plain-English explanations.</li>
              <li>• SEO-optimized guides and tutorials for ongoing learning.</li>
            </ul>
          </aside>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold text-sky-100">
                Excel & Google Sheets formula guides
              </h2>
              <p className="mt-2 text-sm text-slate-200/80">
                Explore ready-made tutorials with prompts and solutions for SUMIF, XLOOKUP, FILTER, LAMBDA, array formulas, date functions, and Google Sheets automation tricks.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {siteConfig.guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/${guide.slug}`}
                  className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-sky-100 transition hover:border-sky-300/60 hover:text-sky-50"
                >
                  {guide.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="text-2xl font-semibold text-sky-100">FAQ</h2>
          <dl className="mt-6 space-y-6">
            {siteConfig.faq.map((item) => (
              <div key={item.question}>
                <dt className="text-sm font-semibold text-sky-200/90">
                  {item.question}
                </dt>
                <dd className="mt-2 text-sm text-slate-200/80">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <footer className="pb-8 text-center text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} {siteConfig.author}. Built with Next.js 14, Vercel AI SDK, Claude 4.5, and GPT-5. Privacy-friendly analytics powered by Vercel.
          </p>
        </footer>
      </main>
    </>
  );
}
