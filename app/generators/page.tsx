import Link from "next/link";
import { auth } from "@/app/(auth)/auth";
import { isPremiumUser } from "@/lib/db/queries";
import { VBAGenerator } from "@/components/generators/VBAGenerator";
import { SQLGenerator } from "@/components/generators/SQLGenerator";
import { Button } from "@/components/ui/button";

export default async function GeneratorsPage() {
  const session = await auth();
  const hasPremium = session?.user ? await isPremiumUser(session.user.id) : false;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Premium Code Generators
        </h1>
        <p className="text-muted-foreground max-w-3xl">
          Generate VBA macros and SQL queries with AI. Unlock lifetime access with a $5+ Ko-fi donation.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/debug">
            <Button variant="outline">Try Interactive Debuggers →</Button>
          </Link>
          {!hasPremium && (
            <a
              href={process.env.NEXT_PUBLIC_KOFI_URL || "https://ko-fi.com/monuit"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>🎁 Unlock Premium</Button>
            </a>
          )}
        </div>
      </div>

      {/* Generators Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <VBAGenerator isPremium={hasPremium} />
        <SQLGenerator isPremium={hasPremium} />
      </div>

      {/* Premium Thank You Message */}
      {hasPremium && (
        <div className="mt-6 rounded-lg border bg-card p-4 text-center">
          <p className="text-sm font-medium">
            ✨ Thank you for your support! You have premium access to all features.
          </p>
        </div>
      )}
    </div>
  );
}
