"use client";

import { BugIcon, CheckCircleIcon, CodeIcon, SparklesIcon, TableIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SQLGenerator } from "@/components/generators/SQLGenerator";
import { VBAGenerator } from "@/components/generators/VBAGenerator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function GeneratorsPage() {
  const [hasPremium, setHasPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isKofiOpen, setIsKofiOpen] = useState(false);

  useEffect(() => {
    // Check premium status
    fetch("/api/user/premium")
      .then((res) => res.json())
      .then((data) => {
        setHasPremium(data.isPremium || false);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-blue-600 border-t-2 border-b-2" />
      </div>
    );
  }

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
          <div className="flex items-center gap-4">
            <Link href="/chat">
              <Button className="hidden text-gray-700 md:flex" size="sm" variant="ghost">
                <SparklesIcon className="mr-2 size-4" />
                Chat
              </Button>
            </Link>
            <Link href="/generators">
              <Button className="text-blue-600" size="sm" variant="ghost">
                <CodeIcon className="mr-2 size-4" />
                Generators
              </Button>
            </Link>
            <Link href="/debug">
              <Button className="hidden text-gray-700 md:flex" size="sm" variant="ghost">
                <BugIcon className="mr-2 size-4" />
                Debuggers
              </Button>
            </Link>
            {!hasPremium && (
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                onClick={() => setIsKofiOpen(true)}
                size="sm"
              >
                🎁 Premium
              </Button>
            )}
            {hasPremium && (
              <span className="flex items-center gap-2 font-medium text-green-600 text-sm">
                <CheckCircleIcon className="size-4" />
                Premium
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Ko-fi Dialog */}
      <Dialog onOpenChange={setIsKofiOpen} open={isKofiOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Unlock Premium Code Generators</DialogTitle>
            <DialogDescription>
              Support us with a Ko-fi donation to get access to all
              code generation features. Choose any amount that works for you!
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <iframe
              height="712"
              src="https://ko-fi.com/monuit/?hidefeed=true&widget=true&embed=true&preview=true"
              style={{
                border: "none",
                width: "100%",
                padding: "4px",
                background: "#f9f9f9",
              }}
              title="Support on Ko-fi"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <section className="border-gray-200 border-b bg-gradient-to-br from-gray-50 to-white px-4 pt-28 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="mb-6 font-bold text-5xl text-gray-900 leading-tight md:text-6xl">
              Production-Ready Code
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Generated Instantly
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-gray-600 text-xl leading-relaxed">
              Generate VBA macros and SQL queries with AI. Get clean, documented code
              that's ready to use in your projects.
            </p>
            {!hasPremium && (
              <Button
                className="h-12 bg-gradient-to-r from-blue-600 to-purple-600 px-8 text-base hover:from-blue-700 hover:to-purple-700"
                onClick={() => setIsKofiOpen(true)}
                size="lg"
              >
                🎁 Unlock Premium Features
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          {/* Premium Thank You Banner */}
          {hasPremium && (
            <div className="mb-12 rounded-2xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6 text-center">
              <div className="flex items-center justify-center gap-3">
                <CheckCircleIcon className="size-6 text-green-600" />
                <p className="font-semibold text-gray-900 text-lg">
                  Thank you for your support! You have full access to all code generators.
                </p>
              </div>
            </div>
          )}

          {/* Generators Grid */}
          <div className="mb-16 grid gap-8 lg:grid-cols-2">
            <VBAGenerator isPremium={hasPremium} />
            <SQLGenerator isPremium={hasPremium} />
          </div>

          {/* Features Section */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:p-12">
            <h2 className="mb-12 text-center font-bold text-3xl text-gray-900 md:text-4xl">
              What You Can Generate
            </h2>
            <div className="grid gap-12 md:grid-cols-2">
              {/* VBA Generator Features */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-xl bg-blue-100">
                    <CodeIcon className="size-7 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900">
                    VBA Macros
                  </h3>
                </div>
                <p className="text-gray-600">
                  Generate complete VBA macros for Excel automation. From simple data
                  manipulation to complex workflows, get production-ready code with
                  proper error handling and documentation.
                </p>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>Data validation and cleaning scripts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>Report automation and formatting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>Custom Excel functions (UDFs)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>Workbook and worksheet manipulation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>Interactive user forms and dialogs</span>
                  </li>
                </ul>
              </div>

              {/* SQL Generator Features */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-xl bg-purple-100">
                    <SparklesIcon className="size-7 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-2xl text-gray-900">
                    SQL Queries
                  </h3>
                </div>
                <p className="text-gray-600">
                  Create optimized SQL queries for data analysis and database operations.
                  Works with Excel tables, Access databases, and external data sources.
                </p>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-purple-600">✓</span>
                    <span>Complex JOIN operations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-purple-600">✓</span>
                    <span>Aggregations and GROUP BY queries</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-purple-600">✓</span>
                    <span>Subqueries and CTEs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-purple-600">✓</span>
                    <span>Data filtering and sorting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-purple-600">✓</span>
                    <span>INSERT, UPDATE, DELETE statements</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
