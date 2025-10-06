import { ArrowLeft, TableIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AppFooter } from "@/components/app-footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sales Dashboard Formulas - ExcelFormula.xyz",
  description:
    "Learn how to create powerful sales dashboard formulas with VLOOKUP, SUMIFS, and pivot table techniques. Track revenue, calculate growth, and analyze sales trends effortlessly.",
  keywords: [
    "sales dashboard",
    "excel formulas",
    "VLOOKUP",
    "SUMIFS",
    "pivot tables",
    "revenue tracking",
    "sales analytics",
  ],
};

export default function SalesDashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-gray-200 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link className="flex items-center gap-2" href="/">
            <TableIcon className="size-6 text-blue-600" />
            <span className="font-bold text-gray-900 text-xl">
              ExcelFormula.xyz
            </span>
          </Link>
          <Link href="/">
            <Button className="gap-2" size="sm" variant="ghost">
              <ArrowLeft className="size-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        <h1 className="mb-8 font-bold text-5xl text-gray-900">
          Sales Dashboard Formulas
        </h1>

        <p className="mb-12 text-gray-600 text-xl">
          Master the art of building comprehensive sales dashboards with Excel.
          Learn formulas that automatically track revenue, analyze trends, and
          generate insights.
        </p>

        <div className="space-y-12">
          {/* VLOOKUP Section */}
          <section>
            <h2 className="mb-4 font-bold text-3xl text-gray-900">
              Customer Data Lookup
            </h2>
            <p className="mb-4 text-gray-700">
              Use VLOOKUP to automatically pull customer information from your
              database:
            </p>
            <div className="rounded-lg bg-gray-50 p-6">
              <code className="text-sm">
                =VLOOKUP(A2, Customers!$A$2:$F$1000, 3, FALSE)
              </code>
              <p className="mt-4 text-gray-600 text-sm">
                This formula looks up the customer ID in cell A2, searches the
                Customers sheet range A2:F1000, and returns the value from the
                3rd column (customer name).
              </p>
            </div>
          </section>

          {/* SUMIFS Section */}
          <section>
            <h2 className="mb-4 font-bold text-3xl text-gray-900">
              Filtered Revenue Totals
            </h2>
            <p className="mb-4 text-gray-700">
              Calculate revenue with multiple criteria using SUMIFS:
            </p>
            <div className="rounded-lg bg-gray-50 p-6">
              <code className="text-sm">
                {`=SUMIFS(Revenue!$D:$D, Revenue!$B:$B, ">=1/1/2025", Revenue!$B:$B, "<=3/31/2025", Revenue!$C:$C, "North")`}
              </code>
              <p className="mt-4 text-gray-600 text-sm">
                Sum all revenue (column D) where the date (column B) is in Q1
                2025 AND the region (column C) is &quot;North&quot;.
              </p>
            </div>
          </section>

          {/* Growth Calculation */}
          <section>
            <h2 className="mb-4 font-bold text-3xl text-gray-900">
              Period-over-Period Growth
            </h2>
            <p className="mb-4 text-gray-700">
              Track growth percentage between periods:
            </p>
            <div className="rounded-lg bg-gray-50 p-6">
              <code className="text-sm">
                =((CurrentMonth - PreviousMonth) / PreviousMonth) * 100
              </code>
              <p className="mt-4 text-gray-600 text-sm">
                Calculate percentage change: (New Value - Old Value) / Old Value
                × 100
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 p-8 text-center">
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              Need Custom Sales Formulas?
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-gray-700">
              Let our AI generate complex sales dashboard formulas tailored to
              your specific needs in seconds.
            </p>
            <Link href="/chat">
              <Button className="bg-blue-600 hover:bg-blue-700" size="lg">
                Generate Custom Formula
              </Button>
            </Link>
          </section>
        </div>
      </div>

      <AppFooter />
    </div>
  );
}
