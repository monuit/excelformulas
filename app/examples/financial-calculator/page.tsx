import type { Metadata } from "next";
import Link from "next/link";
import { AppFooter } from "@/components/app-footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Financial Calculator Formulas - ExcelFormula.xyz",
  description:
    "Learn how to create powerful financial calculator formulas in Excel. Master PMT, FV, IRR, NPV, and more with real-world examples and explanations.",
  keywords: [
    "financial calculator",
    "excel formulas",
    "PMT formula",
    "FV formula",
    "IRR formula",
    "NPV formula",
    "loan calculator",
    "investment calculator",
    "mortgage calculator",
    "excel financial functions",
  ],
};

export default function FinancialCalculatorPage() {
  return (
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
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-bold text-4xl text-gray-900">
              Financial Calculator Formulas
            </h1>
            <p className="text-gray-600 text-lg">
              Build sophisticated financial calculators with these Excel
              formulas. Calculate loan payments, investment returns, and more.
            </p>
          </div>

          {/* Loan Payment Calculator */}
          <section className="mb-12 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-lg bg-green-100 p-2">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <h2 className="font-semibold text-2xl text-gray-900">
                  Monthly Loan Payment
                </h2>
                <p className="mt-1 text-gray-600">
                  Calculate monthly payments for loans and mortgages
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold text-gray-700">Formula:</h3>
                <div className="overflow-x-auto rounded bg-gray-900 p-4">
                  <code className="text-green-400 text-sm">
                    {"=PMT(rate/12, nper*12, pv)"}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-gray-700">Example:</h3>
                <div className="overflow-x-auto rounded bg-gray-900 p-4">
                  <code className="text-green-400 text-sm">
                    {"=PMT(5%/12, 30*12, -250000)"}
                  </code>
                </div>
                <p className="mt-2 text-gray-600 text-sm">
                  Result: <span className="font-semibold">$1,342.05</span> per
                  month
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-gray-700">
                  Explanation:
                </h3>
                <p className="text-gray-600">
                  This formula calculates the monthly payment for a $250,000
                  loan at 5% annual interest rate over 30 years. The rate is
                  divided by 12 for monthly payments, and the period is
                  multiplied by 12 to convert years to months. The loan amount
                  is negative because it's money you're borrowing.
                </p>
              </div>
            </div>
          </section>

          {/* Future Value Calculator */}
          <section className="mb-12 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <span className="text-2xl">📈</span>
              </div>
              <div>
                <h2 className="font-semibold text-2xl text-gray-900">
                  Investment Growth Calculator
                </h2>
                <p className="mt-1 text-gray-600">
                  Calculate how much your investments will grow over time
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold text-gray-700">Formula:</h3>
                <div className="overflow-x-auto rounded bg-gray-900 p-4">
                  <code className="text-green-400 text-sm">
                    {"=FV(rate/12, nper*12, -pmt, -pv)"}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-gray-700">Example:</h3>
                <div className="overflow-x-auto rounded bg-gray-900 p-4">
                  <code className="text-green-400 text-sm">
                    {"=FV(7%/12, 20*12, -500, -10000)"}
                  </code>
                </div>
                <p className="mt-2 text-gray-600 text-sm">
                  Result: <span className="font-semibold">$260,513.68</span>{" "}
                  after 20 years
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-gray-700">
                  Explanation:
                </h3>
                <p className="text-gray-600">
                  This calculates the future value of an investment with a
                  $10,000 initial deposit and $500 monthly contributions over 20
                  years at 7% annual return. Both the initial amount and monthly
                  payments are negative because they're cash outflows. The
                  result shows you'll have over $260,000 after 20 years.
                </p>
              </div>
            </div>
          </section>

          {/* IRR Calculator */}
          <section className="mb-12 rounded-lg border border-gray-200 bg-gray-50 p-6">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-lg bg-purple-100 p-2">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h2 className="font-semibold text-2xl text-gray-900">
                  Return on Investment (IRR)
                </h2>
                <p className="mt-1 text-gray-600">
                  Calculate the internal rate of return for investments
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold text-gray-700">Formula:</h3>
                <div className="overflow-x-auto rounded bg-gray-900 p-4">
                  <code className="text-green-400 text-sm">
                    {"=IRR(values, [guess])"}
                  </code>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-gray-700">Example:</h3>
                <div className="overflow-x-auto rounded bg-gray-900 p-4">
                  <code className="text-green-400 text-sm">
                    {"=IRR({-50000, 15000, 18000, 22000, 25000})"}
                  </code>
                </div>
                <p className="mt-2 text-gray-600 text-sm">
                  Result: <span className="font-semibold">25.69%</span> annual
                  return
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-gray-700">
                  Explanation:
                </h3>
                <p className="text-gray-600">
                  This calculates the annualized return rate for an investment
                  where you put in $50,000 initially and receive returns of
                  $15,000, $18,000, $22,000, and $25,000 over four years. The
                  25.69% IRR shows this is a strong investment with excellent
                  returns.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="rounded-lg border border-blue-200 bg-blue-50 p-8 text-center">
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              Need a Custom Financial Formula?
            </h2>
            <p className="mb-6 text-gray-600">
              Our AI can generate any financial calculator formula tailored to
              your specific needs.
            </p>
            <Link href="/chat">
              <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
                Generate Custom Formula →
              </Button>
            </Link>
          </section>
        </div>
      </main>

      {/* Footer */}
      <AppFooter />
    </div>
  );
}
