import { BugIcon, CodeIcon, MessageSquareIcon } from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/ui/card";

const features = [
  {
    icon: MessageSquareIcon,
    title: "AI Formula Chat",
    description: "Natural language to Excel formulas instantly",
    color: "blue",
    href: "/chat",
    example: {
      input: '"Calculate compound interest over 5 years"',
      output: "=P*(1+r)^n",
      explanation: "Returns your formula with step-by-step breakdown",
    },
  },
  {
    icon: CodeIcon,
    title: "VBA & SQL Generators",
    description: "Generate production-ready code",
    color: "purple",
    href: "/generators",
    example: {
      input: '"Auto-sort data by date"',
      output: "Sub AutoSortData()...",
      explanation: "Complete VBA macros ready to use",
    },
  },
  {
    icon: BugIcon,
    title: "Smart Debugger",
    description: "Fix errors with AI-powered analysis",
    color: "orange",
    href: "/debug",
    example: {
      input: "Error: #REF!",
      output: "✓ Fixed Formula",
      explanation: "Identifies issue and provides corrected version",
    },
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-white px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-4xl text-gray-900 sm:text-5xl">
            Everything You Need for Excel Mastery
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 text-lg">
            Powerful AI tools proven to save hours of work
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link href={feature.href} key={feature.title}>
                <Card className="group relative h-full overflow-hidden border-2 border-gray-200 bg-white p-8 transition-all hover:border-blue-300 hover:shadow-xl">
                  <div className="mb-4">
                    <div
                      className={`inline-flex rounded-2xl p-4 ${
                        feature.color === "blue"
                          ? "bg-blue-100"
                          : feature.color === "purple"
                            ? "bg-purple-100"
                            : "bg-orange-100"
                      }`}
                    >
                      <Icon
                        className={`size-8 ${
                          feature.color === "blue"
                            ? "text-blue-600"
                            : feature.color === "purple"
                              ? "text-purple-600"
                              : "text-orange-600"
                        }`}
                      />
                    </div>
                  </div>
                  <h3 className="mb-2 font-bold text-2xl text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mb-6 text-gray-600">{feature.description}</p>

                  {/* Interactive Example */}
                  <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                    <div className="text-sm">
                      <span className="font-semibold text-gray-700">
                        Input:
                      </span>
                      <p className="mt-1 text-gray-600">
                        {feature.example.input}
                      </p>
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold text-gray-700">
                        Output:
                      </span>
                      <p className="mt-1 font-mono text-gray-900">
                        {feature.example.output}
                      </p>
                    </div>
                    <div className="border-gray-200 border-t pt-3 text-gray-500 text-xs">
                      {feature.example.explanation}
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
