import { auth } from "@/app/(auth)/auth";
import { isPremiumUser } from "@/lib/db/queries";
import { VBADebugger } from "@/components/debuggers/VBADebugger";
import { FormulaDebugger } from "@/components/debuggers/FormulaDebugger";

export default async function DebugPage() {
  const session = await auth();
  const hasPremium = session?.user ? await isPremiumUser(session.user.id) : false;

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl">
          <span className="gradient-text">Interactive</span> Debugging Tools
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Chat with AI to debug and understand your VBA code and Excel formulas. Get instant explanations and fixes!
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <VBADebugger isPremium={hasPremium} />
        <FormulaDebugger isPremium={hasPremium} />
      </div>

      {hasPremium && (
        <div className="mt-8 rounded-2xl border border-green-500/30 bg-green-500/10 p-6 text-center">
          <p className="text-lg font-semibold text-green-300">
            ✨ Thank you for your support! You have full access to all debugging features.
          </p>
        </div>
      )}

      <div className="mt-12 rounded-2xl border border-border bg-card p-8">
        <h2 className="mb-6 text-2xl font-bold text-foreground">How to Use the Debuggers</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="font-semibold text-purple-300">VBA Debugger</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Paste your VBA macro code</li>
              <li>• Describe runtime or compile errors</li>
              <li>• Ask for code explanations</li>
              <li>• Request optimization suggestions</li>
              <li>• Get step-by-step breakdowns</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-purple-300">Formula Debugger</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Paste formulas with errors</li>
              <li>• Get help with #REF!, #VALUE! errors</li>
              <li>• Understand complex nested formulas</li>
              <li>• Learn about function alternatives</li>
              <li>• Optimize slow-running formulas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
