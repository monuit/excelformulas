"use client";

import { BugIcon, CodeIcon, MessageSquareIcon, TableIcon } from "lucide-react";
import Link from "next/link";
import type { Session } from "next-auth";

import { Button } from "@/components/ui/button";

type NavigationProps = {
  session: Session | null;
};

export function Navigation({ session }: NavigationProps) {
  return (
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
  );
}
