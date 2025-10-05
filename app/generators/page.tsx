import Link from "next/link";
import { auth } from "@/app/(auth)/auth";
import { isPremiumUser } from "@/lib/db/queries";
import { VBAGenerator } from "@/components/generators/VBAGenerator";
import { SQLGenerator } from "@/components/generators/SQLGenerator";

export default async function GeneratorsPage() {
  const session = await auth();
  const hasPremium = session?.user ? await isPremiumUser(session.user.id) : false;

  return (
    <div className="container-adaptive py-16 sm:py-20 lg:py-24 animate-fade-in">
      {/* Header Section */}
      <div className="mb-16 text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          <span className="gradient-text">Premium</span> Code Generators
        </h1>
        <p className="mx-auto max-w-3xl text-xl text-muted-foreground leading-relaxed">
          Generate VBA macros and SQL queries with AI. Unlock lifetime access with a $5+ Ko-fi donation!
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/debug" className="btn-secondary transition-smooth">
            Try Interactive Debuggers →
          </Link>
          {!hasPremium && (
            <a
              href={process.env.NEXT_PUBLIC_KOFI_URL || "https://ko-fi.com/monuit"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              🎁 Unlock Premium
            </a>
          )}
        </div>
      </div>

      {/* Generators Grid */}
      <div className="grid gap-8 lg:grid-cols-2 animate-slide-in">
        <VBAGenerator isPremium={hasPremium} />
        <SQLGenerator isPremium={hasPremium} />
      </div>

      {/* Premium Thank You Message */}
      {hasPremium && (
        <div className="mt-12 glass-strong border-primary/30 p-8 text-center glow animate-fade-in">
          <p className="text-xl font-semibold gradient-text">
            ✨ Thank you for your support! You have premium access to all features.
          </p>
        </div>
      )}
    </div>
  );
}
