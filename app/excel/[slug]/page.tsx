import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppFooter } from "@/components/app-footer";
import { Button } from "@/components/ui/button";
import {
  getSeoFormulaBySlug,
  incrementFormulaViews,
} from "@/lib/db/seo-queries";

export const revalidate = 3600; // ISR: Revalidate every hour

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const formula = await getSeoFormulaBySlug(slug);

  if (!formula) {
    return {
      title: "Formula Not Found - ExcelFormula.xyz",
    };
  }

  const title = `${formula.query} - Excel Formula | ExcelFormula.xyz`;
  const description = formula.explanation.slice(0, 160);

  return {
    title,
    description,
    keywords: [
      "excel formula",
      formula.category || "general",
      formula.query,
      "spreadsheet",
      "tutorial",
    ],
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://excelformula.xyz/excel/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ExcelFormulaPage({ params }: Props) {
  const { slug } = await params;
  const formula = await getSeoFormulaBySlug(slug);

  if (!formula) {
    notFound();
  }

  // Increment view count
  await incrementFormulaViews(slug);

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: formula.query,
      text: formula.query,
      answerCount: 1,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${formula.explanation}

Formula: ${formula.formula}`,
        author: {
          "@type": "Organization",
          name: "ExcelFormula.xyz",
        },
      },
    },
  };

  return (
    <>
      {/* JSON-LD for SEO */}
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />

      <div className="flex min-h-screen flex-col bg-white">
        {/* Navigation */}
        <div className="border-gray-200 border-b bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <Link href="/">
              <Button size="sm" variant="ghost">
                ← Back to Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1">
          <div className="mx-auto max-w-4xl px-4 py-12">
            {/* Header */}
            <div className="mb-8">
              <div className="mb-2 flex items-center gap-2">
                {formula.category && (
                  <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-800 text-sm">
                    {formula.category}
                  </span>
                )}
                <span className="text-gray-500 text-sm">
                  {typeof formula.views === "number" ? formula.views : 0} views
                </span>
              </div>
              <h1 className="mb-4 font-bold text-4xl text-gray-900">
                {formula.query}
              </h1>
            </div>

            {/* The Formula */}
            <section className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
              <h2 className="mb-3 font-semibold text-gray-900 text-xl">
                The Formula
              </h2>
              <div className="overflow-x-auto rounded bg-gray-900 p-4">
                <code className="text-green-400 text-lg">
                  {formula.formula}
                </code>
              </div>
            </section>

            {/* Explanation */}
            <section className="mb-8">
              <h2 className="mb-3 font-semibold text-gray-900 text-xl">
                How It Works
              </h2>
              <div className="prose max-w-none text-gray-700">
                {formula.explanation.split("\n").map((paragraph) => (
                  <p className="mb-4" key={paragraph.slice(0, 50)}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Examples */}
            {formula.examples && formula.examples.length > 0 && (
              <section className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
                <h2 className="mb-4 font-semibold text-gray-900 text-xl">
                  Examples
                </h2>
                <ul className="space-y-3">
                  {formula.examples.map((example, idx) => (
                    <li className="flex gap-3" key={example.slice(0, 50)}>
                      <span className="font-semibold text-blue-600">
                        {idx + 1}.
                      </span>
                      <span className="text-gray-700">{example}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Alternatives */}
            {formula.alternatives && formula.alternatives.length > 0 && (
              <section className="mb-8">
                <h2 className="mb-4 font-semibold text-gray-900 text-xl">
                  Alternative Approaches
                </h2>
                <div className="space-y-4">
                  {formula.alternatives.map((alt) => (
                    <div
                      className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                      key={alt.formula}
                    >
                      <div className="mb-2 overflow-x-auto rounded bg-gray-900 p-3">
                        <code className="text-green-400 text-sm">
                          {alt.formula}
                        </code>
                      </div>
                      <p className="text-gray-600">{alt.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* CTA Section */}
            <section className="rounded-lg border border-blue-200 bg-blue-50 p-8 text-center">
              <h2 className="mb-4 font-bold text-2xl text-gray-900">
                Need More Help?
              </h2>
              <p className="mb-6 text-gray-600">
                Chat with our AI to generate custom formulas for your specific
                needs.
              </p>
              <Link href="/chat">
                <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
                  Start Chat →
                </Button>
              </Link>
            </section>
          </div>
        </main>

        {/* Footer */}
        <AppFooter />
      </div>
    </>
  );
}
