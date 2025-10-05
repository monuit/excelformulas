import Link from "next/link";
import { auth } from "@/app/(auth)/auth";
import { isPremiumUser } from "@/lib/db/queries";
import { VBAGenerator } from "@/components/generators/VBAGenerator";
import { SQLGenerator } from "@/components/generators/SQLGenerator";

export default async function GeneratorsPage() {
  const session = await auth();
  const hasPremium = session?.user ? await isPremiumUser(session.user.id) : false;

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl">
          <span className="gradient-text">Premium</span> Code Generators
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Generate VBA macros and SQL queries with AI. Unlock lifetime access with a $5+ Ko-fi donation!
        </p>
        <div className="mt-6">
          <Link href="/debug" className="btn-secondary inline-block">
            Try Interactive Debuggers →
          </Link>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <VBAGenerator isPremium={hasPremium} />
        <SQLGenerator isPremium={hasPremium} />
      </div>

      {hasPremium && (
        <div className="mt-8 rounded-2xl border border-green-500/30 bg-green-500/10 p-6 text-center">
          <p className="text-lg font-semibold text-green-300">
            ✨ Thank you for your support! You have premium access.
          </p>
        </div>
      )}
    </div>
  );
}
