import {
  ArrowRightIcon,
  BugIcon,
  CheckCircleIcon,
  CodeIcon,
  MessageSquareIcon,
  SparklesIcon,
  StarIcon,
  TableIcon,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/app/(auth)/auth";
import { KofiButton } from "@/components/kofi-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function LandingPage() {
  const session = await auth();

  // Redirect authenticated users to the chat
  if (session?.user) {
    redirect("/chat");
  }

  const features = [
    {
      icon: <SparklesIcon className="size-6 text-blue-500" />,
      title: "AI-Powered Formula Generation",
      description:
        "Simply describe what you want to calculate, and our AI generates the perfect Excel formula instantly. No more searching through documentation!",
      link: "/chat",
      linkText: "Try Now",
    },
    {
      icon: <MessageSquareIcon className="size-6 text-green-500" />,
      title: "Interactive Chat Interface",
      description:
        "Chat naturally with AI to create, refine, and understand complex Excel formulas. Get explanations and variations in real-time.",
      link: "/chat",
      linkText: "Start Chatting",
    },
    {
      icon: <BugIcon className="size-6 text-orange-500" />,
      title: "Formula & VBA Debuggers",
      description:
        "Upload your broken formulas or VBA code and get instant debugging help. AI explains errors and suggests fixes step-by-step.",
      link: "/debug",
      linkText: "Debug Now",
    },
    {
      icon: <CodeIcon className="size-6 text-purple-500" />,
      title: "VBA & SQL Generators",
      description:
        "Generate powerful VBA macros and SQL queries from plain English. Perfect for automation and data manipulation tasks.",
      link: "/generators",
      linkText: "Generate Code",
    },
    {
      icon: <TableIcon className="size-6 text-yellow-500" />,
      title: "Excel Function Library",
      description:
        "Access comprehensive explanations of all Excel functions with examples, use cases, and best practices built right in.",
      link: "/chat",
      linkText: "Explore Functions",
    },
    {
      icon: <CheckCircleIcon className="size-6 text-teal-500" />,
      title: "Formula Validation",
      description:
        "Check your formulas for errors, optimization opportunities, and compatibility issues across different Excel versions.",
      link: "/chat",
      linkText: "Validate Now",
    },
  ];

  const benefits = [
    "Save hours of formula debugging time",
    "No Excel expertise required",
    "Works with Excel 2010+, Google Sheets, and more",
    "Free to use with premium features available",
    "Secure and privacy-focused",
    "Constantly learning and improving",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link className="flex items-center gap-2" href="/">
            <TableIcon className="size-6 text-primary" />
            <span className="font-bold text-xl">ExcelFormula.xyz</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/generators">
              <Button size="sm" variant="ghost">
                Generators
              </Button>
            </Link>
            <Link href="/debug">
              <Button size="sm" variant="ghost">
                Debuggers
              </Button>
            </Link>
            <KofiButton />
            {session?.user ? (
              <Link href="/chat">
                <Button size="sm">
                  Open Chat <ArrowRightIcon className="ml-2 size-4" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button size="sm" variant="ghost">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4" variant="secondary">
              <SparklesIcon className="mr-2 size-3" />
              Powered by Advanced AI
            </Badge>
            <h1 className="mb-6 font-bold text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Generate Excel Formulas
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                In Seconds, Not Hours
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Stop struggling with complex Excel formulas. Describe what you
              need in plain English, and let AI create the perfect formula
              instantly. Debug, generate VBA code, and become an Excel power
              user.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href={session?.user ? "/chat" : "/register"}>
                <Button className="h-12 gap-2 px-8 text-base" size="lg">
                  <SparklesIcon className="size-5" />
                  {session?.user ? "Open Chat" : "Start For Free"}
                </Button>
              </Link>
              <Link href="/debug">
                <Button
                  className="h-12 gap-2 px-8 text-base"
                  size="lg"
                  variant="outline"
                >
                  <BugIcon className="size-5" />
                  Try Debuggers
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-muted-foreground text-sm">
              No credit card required • Free forever • Upgrade for premium
              features
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-3xl tracking-tight sm:text-4xl">
              Everything You Need
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              From simple formulas to complex VBA macros, we've got all your
              Excel needs covered.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                className="group transition-shadow hover:shadow-lg"
                key={feature.title}
              >
                <CardHeader>
                  <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-muted">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={feature.link}>
                    <Button className="w-full" variant="outline">
                      {feature.linkText}
                      <ArrowRightIcon className="ml-2 size-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-y bg-muted/50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-bold text-3xl tracking-tight sm:text-4xl">
                Why Choose ExcelFormula.xyz?
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li className="flex items-start gap-3" key={benefit}>
                    <CheckCircleIcon className="mt-1 size-5 shrink-0 text-green-600" />
                    <span className="text-foreground text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center gap-6">
              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <CardTitle>Premium Features</CardTitle>
                    <Badge>$5 One-Time</Badge>
                  </div>
                  <CardDescription>
                    Unlock lifetime access to VBA generators, interactive
                    debuggers, and priority support with a single Ko-fi
                    donation.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href={
                      process.env.NEXT_PUBLIC_KOFI_URL ||
                      "https://ko-fi.com/monuit"
                    }
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Button className="w-full" size="lg">
                      <StarIcon className="mr-2 size-5" />
                      Unlock Premium Features
                    </Button>
                  </a>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Free Forever</CardTitle>
                  <CardDescription>
                    Core features including AI formula generation, chat
                    interface, and basic debugging are completely free with no
                    limits.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 font-bold text-3xl tracking-tight sm:text-4xl">
            Ready to Master Excel?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join thousands of users who are saving time and becoming Excel
            experts with AI-powered assistance.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={session?.user ? "/chat" : "/register"}>
              <Button className="h-12 gap-2 px-8 text-base" size="lg">
                <SparklesIcon className="size-5" />
                {session?.user ? "Open Chat" : "Get Started Free"}
              </Button>
            </Link>
            <a
              href={
                process.env.NEXT_PUBLIC_KOFI_URL || "https://ko-fi.com/monuit"
              }
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button
                className="h-12 gap-2 px-8 text-base"
                size="lg"
                variant="outline"
              >
                <StarIcon className="size-5" />
                Support on Ko-fi
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link className="mb-4 flex items-center gap-2" href="/">
                <TableIcon className="size-6 text-primary" />
                <span className="font-bold text-lg">ExcelFormula.xyz</span>
              </Link>
              <p className="text-muted-foreground text-sm">
                AI-powered Excel formula generation and debugging tools. Made
                with ❤️ for spreadsheet enthusiasts.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Product</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>
                  <Link className="hover:text-foreground" href="/chat">
                    Formula Generator
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-foreground" href="/debug">
                    Debuggers
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-foreground" href="/generators">
                    Code Generators
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Support</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>
                  <a
                    className="hover:text-foreground"
                    href={
                      process.env.NEXT_PUBLIC_KOFI_URL ||
                      "https://ko-fi.com/monuit"
                    }
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Support on Ko-fi
                  </a>
                </li>
                <li>
                  <Link className="hover:text-foreground" href="/login">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-foreground" href="/register">
                    Create Account
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Legal</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>
                  <Link className="hover:text-foreground" href="/privacy">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-foreground" href="/terms">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-muted-foreground text-sm">
            <p>© 2025 ExcelFormula.xyz. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
