"use client";

import { useRouter } from "next/navigation";
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
            <h1 className="font-semibold text-xl">Code Generators</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => router.push("/debug")}
              size="sm"
              variant="outline"
            >
              Try Debuggers
            </Button>
            {!hasPremium && (
              <>
                <span className="hidden text-muted-foreground text-sm sm:inline">
                  Unlock premium generators
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
            <DialogTitle>Unlock Premium Code Generators</DialogTitle>
            <DialogDescription>
              Support us with a $5+ Ko-fi donation to get lifetime access to all
              code generation features.
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
        {/* Generators Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <VBAGenerator isPremium={hasPremium} />
          <SQLGenerator isPremium={hasPremium} />
        </div>

        {/* Premium Thank You Message */}
        {hasPremium && (
          <div className="mt-6 rounded-lg border bg-card p-4 text-center">
            <p className="font-medium text-sm">
              ✨ Thank you for your support! You have premium access to all
              features.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
