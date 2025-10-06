"use client";

import { SparklesIcon } from "lucide-react";
import { useState } from "react";
import { TypewriterEffect } from "@/components/typewriter-effect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSection() {
  const [inputValue, setInputValue] = useState("");

  const handleGetStarted = () => {
    if (inputValue.trim()) {
      window.location.href = `/chat?prompt=${encodeURIComponent(inputValue)}`;
    } else {
      window.location.href = "/chat";
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 pt-16">
      <div className="mx-auto w-full max-w-5xl text-center">
        <h1 className="mb-6 font-bold text-6xl text-gray-900 leading-tight tracking-tight sm:text-7xl md:text-8xl">
          Excel Formulas
          <br />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Made Simple
          </span>
        </h1>

        {/* Typewriter Effect */}
        <div className="mx-auto mb-12 min-h-[80px] max-w-3xl">
          <TypewriterEffect />
        </div>

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
            No credit card required • Free forever • Premium features available
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
  );
}
