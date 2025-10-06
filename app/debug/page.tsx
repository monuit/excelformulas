"use client";

import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-blue-600 border-t-2 border-b-2" />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button onClick={() => router.push("/")} size="sm" variant="ghost">
              ← Home
            </Button>
            <h1 className="font-semibold text-xl">Debug Tools</h1>
          </div>
          <div className="flex items-center gap-2">
            {!hasPremium && (
              <>
                <span className="hidden text-muted-foreground text-sm sm:inline">
                  Unlock premium debuggers
                </span>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                  onClick={() => setIsKofiOpen(true)}
                  size="sm"
                >
                  🎁 Get Premium
                </Button>
              </>
            )}
            {hasPremium && (
              <span className="flex items-center gap-2 text-muted-foreground text-sm">
                <span className="text-green-600">✓</span>
                Premium Active
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Ko-fi Dialog */}
      <Dialog onOpenChange={setIsKofiOpen} open={isKofiOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Unlock Premium Debugging Tools</DialogTitle>
            <DialogDescription>
              Support us with a $5+ Ko-fi donation to get lifetime access to all
              debugging features.
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

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4">
        {/* Debuggers Grid */}
        <div className="grid animate-slide-in gap-8 lg:grid-cols-2">
          <VBADebugger isPremium={hasPremium} />
          <FormulaDebugger isPremium={hasPremium} />
        </div>

        {/* Premium Thank You Message */}
        {hasPremium && (
          <div className="glass-strong glow mt-12 animate-fade-in border-accent/30 p-8 text-center">
            <p className="gradient-text font-semibold text-xl">
              ✨ Thank you for your support! You have full access to all
              debugging features.
            </p>
          </div>
        )}

        {/* Usage Guide */}
        <div className="glass card-hover mt-16 p-10">
          <h2 className="gradient-text-blue mb-8 text-center font-bold text-3xl">
            How to Use the Debuggers
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/20">
                  <span className="text-2xl">🐛</span>
                </div>
                <h3 className="font-semibold text-foreground text-xl">
                  VBA Debugger
                </h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-accent">▸</span>
                  <span>Paste your VBA macro code</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">▸</span>
                  <span>Describe runtime or compile errors</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">▸</span>
                  <span>Ask for code explanations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">▸</span>
                  <span>Request optimization suggestions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">▸</span>
                  <span>Get step-by-step breakdowns</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/20">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h3 className="font-semibold text-foreground text-xl">
                  Formula Debugger
                </h3>
              </div>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-accent">▸</span>
                  <span>Paste formulas with errors</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">▸</span>
                  <span>Get help with #REF!, #VALUE! errors</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">▸</span>
                  <span>Understand complex nested formulas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">▸</span>
                  <span>Learn about function alternatives</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent">▸</span>
                  <span>Optimize slow-running formulas</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
