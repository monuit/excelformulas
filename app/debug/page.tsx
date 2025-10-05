import { auth } from "@/app/(auth)/auth";
import { isPremiumUser } from "@/lib/db/queries";
import { VBADebugger } from "@/components/debuggers/VBADebugger";
import { FormulaDebugger } from "@/components/debuggers/FormulaDebugger";

export default async function DebugPage() {
  const session = await auth();
  const hasPremium = session?.user ? await isPremiumUser(session.user.id) : false;

  return (
    <div className="container-adaptive py-16 sm:py-20 lg:py-24 animate-fade-in">
      {/* Header Section */}
      <div className="mb-16 text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          <span className="gradient-text">Interactive</span> Debugging Tools
        </h1>
        <p className="mx-auto max-w-3xl text-xl text-muted-foreground leading-relaxed">
          Chat with AI to debug and understand your VBA code and Excel formulas. Get instant explanations and fixes!
        </p>
        <div className="mt-8">
          {!hasPremium && (
            <a
              href={process.env.NEXT_PUBLIC_KOFI_URL || "https://ko-fi.com/monuit"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              🎁 Unlock Debuggers
            </a>
          )}
        </div>
      </div>

      {/* Debuggers Grid */}
      <div className="grid gap-8 lg:grid-cols-2 animate-slide-in">
        <VBADebugger isPremium={hasPremium} />
        <FormulaDebugger isPremium={hasPremium} />
      </div>

      {/* Premium Thank You Message */}
      {hasPremium && (
        <div className="mt-12 glass-strong border-primary/30 p-8 text-center glow animate-fade-in">
          <p className="text-xl font-semibold gradient-text">
            ✨ Thank you for your support! You have full access to all debugging features.
          </p>
        </div>
      )}

      {/* Usage Guide */}
      <div className="mt-16 glass p-10 card-hover">
        <h2 className="mb-8 text-3xl font-bold gradient-text-blue text-center">
          How to Use the Debuggers
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <span className="text-2xl">🐛</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">VBA Debugger</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary">▸</span>
                <span>Paste your VBA macro code</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">▸</span>
                <span>Describe runtime or compile errors</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">▸</span>
                <span>Ask for code explanations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">▸</span>
                <span>Request optimization suggestions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">▸</span>
                <span>Get step-by-step breakdowns</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Formula Debugger</h3>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary">▸</span>
                <span>Paste formulas with errors</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">▸</span>
                <span>Get help with #REF!, #VALUE! errors</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">▸</span>
                <span>Understand complex nested formulas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">▸</span>
                <span>Learn about function alternatives</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">▸</span>
                <span>Optimize slow-running formulas</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
