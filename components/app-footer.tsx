"use client";

import { TableIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AppFooter() {
  const [isKofiDialogOpen, setIsKofiDialogOpen] = useState(false);

  return (
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
                <Dialog
                  onOpenChange={setIsKofiDialogOpen}
                  open={isKofiDialogOpen}
                >
                  <DialogTrigger asChild>
                    <button
                      className="flex items-center hover:opacity-80"
                      type="button"
                    >
                      {/* biome-ignore lint/performance/noImgElement: Ko-fi requires their specific CDN image */}
                      <img
                        alt="Buy Me a Coffee at ko-fi.com"
                        height="36"
                        src="https://storage.ko-fi.com/cdn/kofi6.png?v=6"
                        style={{ border: 0, height: 36 }}
                        width="150"
                      />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Support ExcelFormula.xyz</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <iframe
                        height="712"
                        id="kofiframe"
                        src="https://ko-fi.com/monuit/?hidefeed=true&widget=true&embed=true&preview=true"
                        style={{
                          border: "none",
                          width: "100%",
                          padding: "4px",
                          background: "#f9f9f9",
                        }}
                        title="monuit"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
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

        <div className="mt-12 border-gray-200 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-center text-gray-600 text-sm">
              © 2025 ExcelFormula.xyz. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-sm">
                Feedback, suggestions, or issues?
              </span>
              <a
                className="inline-flex items-center gap-1 text-blue-600 text-sm transition-colors hover:text-blue-700"
                href="https://x.com/moevals"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg
                  className="size-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>X (Twitter)</title>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>@moevals</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
