export const siteConfig = {
  name: "AI Excel Formula Generator",
  shortName: "Excel Formula Generator",
  tagline:
    "Free AI Excel Formula Generator — Type what you need, get the formula instantly. Powered by Claude and GPT on Vercel.",
  description:
    "Type your task and get an accurate Excel or Google Sheets formula instantly — plus a plain-English explanation. No sign-up, no limits. Powered by AI (GPT-5 + Claude 4.5).",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://excel-formula-generator.vercel.app",
  ogImage: "/opengraph-image",
  twitterHandle: "@excelformulasai",
  keywords: [
    "Excel formula generator",
    "AI Excel formula creator",
    "convert text to Excel formula",
    "Excel AI tool",
    "Excel function builder",
    "Excel formula explainer",
    "Google Sheets formula generator",
    "SUMIF",
    "XLOOKUP",
    "FILTER",
    "LAMBDA",
    "dynamic arrays",
    "spreadsheet automation",
  ],
  author: "Excel Formulas AI",
  contactEmail: "hello@excelformulas.ai",
  faq: [
    {
      question: "Is the AI Excel Formula Generator free?",
      answer:
        "Yes. The generator is free to use with no sign-up required. Optional Ko-fi donations keep the project running.",
    },
    {
      question: "Does it work for Google Sheets formulas?",
      answer:
        "Absolutely. Toggle the Sheets mode to receive functions tailored for Google Sheets syntax and capabilities.",
    },
    {
      question: "Which AI models power the formulas?",
      answer:
        "We route between GPT-5 for quick completions and Claude 4.5 for more complex logic to balance accuracy and speed.",
    },
    {
      question: "Do you store my data?",
      answer:
        "No. Prompts are processed anonymously. Analytics are aggregated and cookie-free to protect your privacy.",
    },
  ],
  guides: [
    {
      slug: "excel/sumif-examples",
      title: "SUMIF Examples for Excel",
    },
    {
      slug: "excel/xlookup-tutorial",
      title: "XLOOKUP Tutorial",
    },
    {
      slug: "excel/text-cleanup-formulas",
      title: "Text Cleanup Formulas",
    },
    {
      slug: "excel/date-functions-guide",
      title: "Date Functions Guide",
    },
    {
      slug: "excel/array-formulas",
      title: "Array Formulas",
    },
    {
      slug: "google-sheets/formulas",
      title: "Google Sheets Formulas",
    },
  ],
} as const;

export type GuideConfig = (typeof siteConfig.guides)[number];
