"use client";

import { BugIcon, CheckCircleIcon, CodeIcon, SparklesIcon, TableIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FormulaDebugger } from "@/components/debuggers/FormulaDebugger";
import { VBADebugger } from "@/components/debuggers/VBADebugger";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DebugPage() {
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
              <Button className="hidden text-gray-700 md:flex" size="sm" variant="ghost">
                <CodeIcon className="mr-2 size-4" />
                Generators
              </Button>
            </Link>
            <Link href="/debug">
              <Button className="text-blue-600" size="sm" variant="ghost">
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
            <DialogTitle>Unlock Premium Debugging Tools</DialogTitle>
            <DialogDescription>
              Support us with a Ko-fi donation to get access to all
              debugging features. Choose any amount that works for you!
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
              AI-Powered Debug Tools
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-gray-600 text-xl leading-relaxed">
              Fix VBA macros and Excel formulas instantly. Get detailed explanations,
              error fixes, and optimization suggestions powered by AI.
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
                  Thank you for your support! You have full access to all debugging features.
                </p>
              </div>
            </div>
          )}

          {/* Debuggers Grid */}
          <div className="mb-16 grid gap-8 lg:grid-cols-2">
            <VBADebugger isPremium={hasPremium} />
            <FormulaDebugger isPremium={hasPremium} />
          </div>

          {/* How to Use Section */}
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm md:p-12">
            <h2 className="mb-12 text-center font-bold text-3xl text-gray-900 md:text-4xl">
              How to Use the Debuggers
            </h2>
            <div className="grid gap-12 md:grid-cols-2">
              {/* VBA Debugger Guide */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-xl bg-orange-100">
                    <BugIcon className="size-7 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    VBA Debugger
                  </h3>
                </div>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>Paste your VBA macro code for analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>Get help with runtime or compile errors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>Request detailed code explanations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>Receive optimization suggestions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>Get step-by-step execution breakdowns</span>
                  </li>
                </ul>
              </div>

              {/* Formula Debugger Guide */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-xl bg-yellow-100">
                    <SparklesIcon className="size-7 text-yellow-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    Formula Debugger
                  </h3>
                </div>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>Paste Excel formulas with errors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>Fix #REF!, #VALUE!, and other error types</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>Understand complex nested formulas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>Discover alternative function approaches</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-blue-600">✓</span>
                    <span>Optimize slow-running calculations</span>
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
