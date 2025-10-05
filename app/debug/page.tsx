import { auth } from "@/app/(auth)/auth";
import { FormulaDebugger } from "@/components/debuggers/FormulaDebugger";
import { VBADebugger } from "@/components/debuggers/VBADebugger";
import { isPremiumUser } from "@/lib/db/queries";

export default async function DebugPage() {
  const session = await auth();
  const hasPremium = session?.user
    ? await isPremiumUser(session.user.id)
    : false;

  return (
    <div className="container-adaptive animate-fade-in py-16 sm:py-20 lg:py-24">
      {/* Header Section */}
      <div className="mb-16 text-center">
        <h1 className="mb-6 font-bold text-5xl tracking-tight sm:text-6xl lg:text-7xl">
          <span className="gradient-text">Interactive</span> Debugging Tools
        </h1>
        <p className="mx-auto max-w-3xl text-muted-foreground text-xl leading-relaxed">
          Chat with AI to debug and understand your VBA code and Excel formulas.
          Get instant explanations and fixes!
        </p>
        <div className="mt-8">
          {!hasPremium && (
            <a
              className="btn-primary"
              href={
                process.env.NEXT_PUBLIC_KOFI_URL || "https://ko-fi.com/monuit"
              }
              rel="noopener noreferrer"
              target="_blank"
            >
              🎁 Unlock Debuggers
            </a>
          )}
        </div>
      </div>

      {/* Debuggers Grid */}
      <div className="grid animate-slide-in gap-8 lg:grid-cols-2">
        <VBADebugger isPremium={hasPremium} />
        <FormulaDebugger isPremium={hasPremium} />
      </div>

      {/* Premium Thank You Message */}
      {hasPremium && (
        <div className="glass-strong glow mt-12 animate-fade-in border-accent/30 p-8 text-center">
          <p className="gradient-text font-semibold text-xl">
            ✨ Thank you for your support! You have full access to all debugging
            features.
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
  );
}
