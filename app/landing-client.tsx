"use client";

import {
  ArrowRightIcon,
  BugIcon,
  CheckIcon,
  CodeIcon,
  MessageSquareIcon,
  SparklesIcon,
  TableIcon,
  ZapIcon,
} from "lucide-react";
import Link from "next/link";
import type { Session } from "next-auth";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type LandingPageClientProps = {
  session: Session | null;
};

export function LandingPageClient({ session }: LandingPageClientProps) {
  const [inputValue, setInputValue] = useState("");

  const handleGetStarted = () => {
    if (inputValue.trim()) {
      window.location.href = `/chat?prompt=${encodeURIComponent(inputValue)}`;
    } else {
      window.location.href = "/chat";
    }
  };

  const features = [
    {
      icon: MessageSquareIcon,
      title: "AI Formula Chat",
      description: "Natural language to Excel formulas instantly",
      color: "blue",
      href: "/chat",
    },
    {
      icon: CodeIcon,
      title: "VBA & SQL Generators",
      description: "Generate production-ready code",
      color: "purple",
      href: "/generators",
    },
    {
      icon: BugIcon,
      title: "Smart Debugger",
      description: "Fix errors with AI-powered analysis",
      color: "orange",
      href: "/debug",
    },
  ];

  const examples = [
    {
      title: "Sales Dashboard",
      description: "Complex VLOOKUP and pivot formulas",
      image: "📊",
    },
    {
      title: "Financial Calculator",
      description: "Compound interest and loan payments",
      image: "💰",
    },
    {
      title: "Data Automation",
      description: "VBA macros for repetitive tasks",
      image: "⚡",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-gray-900">
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
            <Link href="/generators">
              <Button
                className="hidden text-gray-700 md:flex"
                size="sm"
                variant="ghost"
              >
                <CodeIcon className="mr-2 size-4" />
                Generators
              </Button>
            </Link>
            <Link href="/debug">
              <Button
                className="hidden text-gray-700 md:flex"
                size="sm"
                variant="ghost"
              >
                <BugIcon className="mr-2 size-4" />
                Debuggers
              </Button>
            </Link>
            {session?.user ? (
              <Link href="/chat">
                <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                  <MessageSquareIcon className="mr-2 size-4" />
                  Open Chat
                </Button>
              </Link>
            ) : (
              <div className="flex gap-3">
                <Link href="/login">
                  <Button size="sm" variant="ghost">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center px-4 pt-16">
        <div className="mx-auto w-full max-w-5xl text-center">
          <Badge className="mb-8 border-blue-200 bg-blue-50 px-4 py-1.5 text-blue-700">
            <SparklesIcon className="mr-2 size-4" />
            AI-Powered Excel Assistant
          </Badge>

          <h1 className="mb-6 font-bold text-6xl text-gray-900 leading-tight tracking-tight sm:text-7xl md:text-8xl">
            Excel Formulas
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-gray-600 text-xl sm:text-2xl">
            Transform plain English into powerful Excel formulas instantly. No
            more searching, no more frustration.
          </p>

          {/* Input Field */}
          <div className="mx-auto mb-8 max-w-3xl">
            <div className="flex flex-col gap-3 rounded-2xl border border-gray-300 bg-white p-2 shadow-lg transition-shadow hover:shadow-xl sm:flex-row">
              <Input
                className="flex-1 border-0 text-lg focus-visible:ring-0"
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleGetStarted();
                  }
                }}
                placeholder="What formula do you need? e.g., Calculate compound interest..."
                value={inputValue}
              />
              <Button
                className="h-12 bg-blue-600 px-8 hover:bg-blue-700"
                onClick={handleGetStarted}
                size="lg"
              >
                <SparklesIcon className="mr-2 size-5" />
                Get Started
              </Button>
            </div>
            <p className="mt-4 text-gray-500 text-sm">
              No credit card required • Free forever • Premium features
              available
            </p>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center">
            <div>
              <div className="font-bold text-3xl text-gray-900">10,000+</div>
              <div className="text-gray-600 text-sm">Formulas Generated</div>
            </div>
            <div className="h-12 w-px bg-gray-300" />
            <div>
              <div className="font-bold text-3xl text-gray-900">500+</div>
              <div className="text-gray-600 text-sm">Excel Users</div>
            </div>
            <div className="h-12 w-px bg-gray-300" />
            <div>
              <div className="font-bold text-3xl text-gray-900">24/7</div>
              <div className="text-gray-600 text-sm">AI Assistance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-4xl text-gray-900 sm:text-5xl">
              Everything You Need for Excel Mastery
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 text-lg">
              Powerful AI tools to help you work faster and smarter with Excel
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  className="group relative overflow-hidden border-2 border-gray-200 bg-white p-8 transition-all hover:border-blue-300 hover:shadow-xl"
                  key={feature.title}
                >
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
                  <Link href={feature.href}>
                    <Button
                      className="group-hover:translate-x-1"
                      size="sm"
                      variant="ghost"
                    >
                      Learn More
                      <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="bg-gray-50 px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-4xl text-gray-900 sm:text-5xl">
              Join 500+ Excel Users
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 text-lg">
              See what you can build with ExcelFormula.xyz
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {examples.map((example) => (
              <Card
                className="overflow-hidden border-2 border-gray-200 bg-white transition-all hover:shadow-xl"
                key={example.title}
              >
                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 text-6xl">
                  {example.image}
                </div>
                <div className="p-6">
                  <h3 className="mb-2 font-bold text-gray-900 text-xl">
                    {example.title}
                  </h3>
                  <p className="text-gray-600">{example.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-4xl text-gray-900 sm:text-5xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 text-lg">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-blue-100 font-bold text-2xl text-blue-600">
                1
              </div>
              <h3 className="mb-3 font-bold text-gray-900 text-xl">
                Describe Your Need
              </h3>
              <p className="text-gray-600">
                Tell us what you want to calculate in plain English
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-purple-100 font-bold text-2xl text-purple-600">
                2
              </div>
              <h3 className="mb-3 font-bold text-gray-900 text-xl">
                AI Generates Formula
              </h3>
              <p className="text-gray-600">
                Our AI creates the perfect formula with explanations
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-green-100 font-bold text-2xl text-green-600">
                3
              </div>
              <h3 className="mb-3 font-bold text-gray-900 text-xl">
                Copy & Use
              </h3>
              <p className="text-gray-600">
                Copy the formula directly into your Excel sheet
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-blue-600 px-4 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-4xl sm:text-5xl">
              Why Choose ExcelFormula.xyz?
            </h2>
            <p className="mx-auto max-w-2xl text-blue-100 text-lg">
              The most powerful Excel AI assistant
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ZapIcon,
                title: "Lightning Fast",
                description: "Get formulas in seconds",
              },
              {
                icon: CheckIcon,
                title: "Always Accurate",
                description: "AI-verified results",
              },
              {
                icon: SparklesIcon,
                title: "Easy to Use",
                description: "No Excel knowledge needed",
              },
              {
                icon: TableIcon,
                title: "Premium Tools",
                description: "One-time $5 unlock",
              },
            ].map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div className="text-center" key={benefit.title}>
                  <Icon className="mx-auto mb-4 size-12" />
                  <h3 className="mb-2 font-bold text-xl">{benefit.title}</h3>
                  <p className="text-blue-100">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-bold text-4xl text-gray-900 sm:text-5xl">
            Ready to Master Excel?
          </h2>

          <p className="mx-auto mb-12 max-w-2xl text-gray-600 text-xl">
            Join hundreds of users who are saving time and becoming Excel
            experts with AI-powered assistance.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/chat">
              <Button
                className="group h-14 gap-2 bg-blue-600 px-8 text-lg hover:bg-blue-700"
                size="lg"
              >
                <SparklesIcon className="size-5" />
                Get Started Free
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/generators">
              <Button className="h-14 px-8 text-lg" size="lg" variant="outline">
                Explore Features
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-gray-500 text-sm">
            Premium features: $5 one-time payment • Lifetime access
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-gray-200 border-t bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link className="mb-4 flex items-center gap-2" href="/">
                <TableIcon className="size-6 text-blue-600" />
                <span className="font-bold text-gray-900 text-lg">
                  ExcelFormula.xyz
                </span>
              </Link>
              <p className="text-gray-600 text-sm">
                AI-powered Excel formula generation and debugging tools.
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Product</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>
                  <Link className="hover:text-gray-900" href="/chat">
                    Formula Generator
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-gray-900" href="/debug">
                    Debuggers
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-gray-900" href="/generators">
                    Code Generators
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Support</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>
                  <a
                    className="hover:text-gray-900"
                    href={
                      process.env.NEXT_PUBLIC_KOFI_URL ||
                      "https://ko-fi.com/monuit"
                    }
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Support on Ko-fi
                  </a>
                </li>
                <li>
                  <Link className="hover:text-gray-900" href="/login">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-gray-900" href="/register">
                    Create Account
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Legal</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>
                  <Link className="hover:text-gray-900" href="/privacy">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-gray-900" href="/terms">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-gray-200 border-t pt-8 text-center text-gray-600 text-sm">
            <p>© 2025 ExcelFormula.xyz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
