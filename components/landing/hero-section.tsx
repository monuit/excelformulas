"use client";

import { ArrowRightIcon, PlayIcon, UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const handleTryForFree = () => {
    window.location.href = "/chat";
  };

  const handleSeeHowItWorks = () => {
    // Scroll to features or showcase section
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen px-4 pt-24 pb-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Left Content */}
        <div className="space-y-8">
          {/* User Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
            <div className="-space-x-2 flex">
              <div className="flex size-6 items-center justify-center rounded-full bg-blue-500 ring-2 ring-white">
                <UsersIcon className="size-3 text-white" />
              </div>
              <div className="flex size-6 items-center justify-center rounded-full bg-purple-500 ring-2 ring-white">
                <UsersIcon className="size-3 text-white" />
              </div>
              <div className="flex size-6 items-center justify-center rounded-full bg-green-500 ring-2 ring-white">
                <UsersIcon className="size-3 text-white" />
              </div>
            </div>
            <span className="font-medium text-gray-700 text-sm">
              Join 500+ Excel Users
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-bold text-5xl text-gray-900 leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Build Excel formulas.
            <br />
            Ask anything. Get results{" "}
            <span className="italic">10x faster</span>.
          </h1>

          {/* Subheadline */}
          <p className="max-w-xl text-gray-600 text-lg leading-relaxed md:text-xl">
            ExcelFormula.xyz is your AI-powered assistant that instantly
            transforms questions into working formulas, VBA scripts, and
            step-by-step solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              className="group h-14 bg-black px-8 text-base hover:bg-gray-800"
              onClick={handleTryForFree}
              size="lg"
            >
              Unlimited, Free forever
              <ArrowRightIcon className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              className="group h-14 border-2 border-gray-300 bg-white px-8 text-base text-gray-900 hover:border-gray-400 hover:bg-gray-50"
              onClick={handleSeeHowItWorks}
              size="lg"
              variant="outline"
            >
              <PlayIcon className="mr-2 size-5" />
              See how it works
            </Button>
          </div>
        </div>

        {/* Right - Product Preview */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white shadow-2xl">
            {/* Browser Chrome */}
            <div className="flex items-center gap-2 border-gray-200 border-b bg-white px-4 py-3">
              <div className="flex gap-2">
                <div className="size-3 rounded-full bg-red-400" />
                <div className="size-3 rounded-full bg-yellow-400" />
                <div className="size-3 rounded-full bg-green-400" />
              </div>
              <div className="ml-4 flex-1 rounded bg-gray-100 px-3 py-1 text-gray-500 text-xs">
                excelformula.xyz/chat
              </div>
            </div>

            {/* Chat Interface Preview */}
            <div className="space-y-4 bg-white p-6">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-blue-600 px-4 py-3 text-white">
                  <p className="text-sm">
                    How do I calculate compound interest in Excel?
                  </p>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex justify-start">
                <div className="max-w-[90%] space-y-3 rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-3">
                  <p className="text-gray-900 text-sm">
                    Here's the formula for compound interest:
                  </p>
                  <div className="rounded-lg bg-gray-900 p-3 font-mono text-green-400 text-xs">
                    =P*(1+r/n)^(n*t)
                  </div>
                  <p className="text-gray-700 text-xs">
                    Where P = principal, r = rate, n = compounds per year, t =
                    years
                  </p>
                </div>
              </div>

              {/* User Message */}
              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-blue-600 px-4 py-3 text-white">
                  <p className="text-sm">Can you show me an example?</p>
                </div>
              </div>

              {/* AI Response with Example */}
              <div className="flex justify-start">
                <div className="max-w-[90%] space-y-2 rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-3">
                  <p className="text-gray-900 text-sm">
                    Sure! For $1,000 at 5% for 10 years:
                  </p>
                  <div className="rounded-lg bg-gray-900 p-3 font-mono text-green-400 text-xs">
                    =1000*(1+0.05/12)^(12*10)
                  </div>
                  <p className="font-medium text-gray-900 text-sm">
                    Result: $1,647.01
                  </p>
                </div>
              </div>

              {/* Typing Indicator */}
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-tl-sm bg-gray-100 px-4 py-3">
                  <div className="flex gap-1">
                    <div className="size-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                    <div className="size-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                    <div className="size-2 animate-bounce rounded-full bg-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
          </div>

          {/* Floating badge - "Data Science" style */}
          <div className="absolute -bottom-4 -right-4 rounded-xl border border-gray-200 bg-blue-500 px-6 py-3 shadow-lg">
            <p className="font-semibold text-white text-sm">
              ⚡ Instant Results
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
