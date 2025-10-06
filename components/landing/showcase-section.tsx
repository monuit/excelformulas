import Link from "next/link";

import { Card } from "@/components/ui/card";

const examples = [
  {
    title: "Sales Dashboard Formulas",
    description: "Track revenue, calculate growth, analyze trends",
    image: "📊",
    href: "/examples/sales-dashboard",
    features: [
      "VLOOKUP for customer data",
      "SUMIFS for filtered totals",
      "Pivot table formulas",
    ],
  },
  {
    title: "Financial Calculator",
    description: "Compound interest, loan payments, ROI analysis",
    image: "💰",
    href: "/examples/financial-calculator",
    features: [
      "PMT for loan calculations",
      "FV for future value",
      "IRR for investments",
    ],
  },
  {
    title: "Data Automation with VBA",
    description: "Automate repetitive tasks, batch processing",
    image: "⚡",
    href: "/examples/data-automation",
    features: ["Auto-sort and filter", "Report generation", "Email automation"],
  },
];

/**
 * Showcase Section - Display example use cases
 */
export function ShowcaseSection() {
  return (
    <section className="bg-gray-50 px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-4xl text-gray-900 sm:text-5xl">
            Join 500+ Excel Users
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 text-lg">
            Real examples of what you can build with ExcelFormula.xyz
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {examples.map((example) => (
            <Link href={example.href} key={example.title}>
              <Card className="group h-full overflow-hidden border-2 border-gray-200 bg-white transition-all hover:border-blue-300 hover:shadow-xl">
                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 text-6xl transition-transform group-hover:scale-110">
                  {example.image}
                </div>
                <div className="p-6">
                  <h3 className="mb-2 font-bold text-gray-900 text-xl">
                    {example.title}
                  </h3>
                  <p className="mb-4 text-gray-600">{example.description}</p>
                  <ul className="space-y-2">
                    {example.features.map((feature) => (
                      <li
                        className="flex items-start text-gray-600 text-sm"
                        key={feature}
                      >
                        <span className="mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
