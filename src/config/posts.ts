export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  keywords: string[];
}

export const blogPosts: BlogPostMeta[] = [
  {
    slug: "best-ai-excel-formula-generator-2025",
    title: "Best AI Excel Formula Generator in 2025",
    description:
      "Compare the top AI Excel formula generators in 2025 and learn how our tool combines GPT-5 and Claude 4.5 for unmatched accuracy.",
    publishedAt: "2025-01-12",
    keywords: [
      "AI Excel formula generator",
      "Excel automation",
      "GPT-5 Excel",
    ],
  },
  {
    slug: "how-to-use-filter-and-xlookup-together",
    title: "How to Use FILTER and XLOOKUP Together",
    description:
      "Step-by-step walkthrough combining FILTER and XLOOKUP to build dynamic Excel dashboards and Google Sheets reports.",
    publishedAt: "2025-01-19",
    keywords: [
      "FILTER",
      "XLOOKUP",
      "dynamic arrays",
    ],
  },
  {
    slug: "excel-vs-google-sheets-formulas",
    title: "Excel vs Google Sheets: Which Formulas Work Where",
    description:
      "A breakdown of Excel vs Google Sheets formula compatibility with conversion tips for SUMIFS, LAMBDA, ARRAYFORMULA, and more.",
    publishedAt: "2025-01-26",
    keywords: [
      "Excel vs Google Sheets",
      "formula compatibility",
      "ARRAYFORMULA",
    ],
  },
  {
    slug: "top-excel-formulas-for-data-analysts",
    title: "Top 10 Excel Formulas Every Data Analyst Should Know",
    description:
      "Review the must-know Excel and Google Sheets formulas for analysts and see prompt ideas to generate them with AI.",
    publishedAt: "2025-02-02",
    keywords: [
      "Excel formulas",
      "data analyst",
      "SUMIFS",
    ],
  },
];

export function getBlogPost(slug: string): BlogPostMeta | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
