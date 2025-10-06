import { TableIcon } from "lucide-react";
import Link from "next/link";
import { AppFooter } from "@/components/app-footer";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-gray-200 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link className="flex items-center gap-2" href="/">
            <TableIcon className="size-6 text-blue-600" />
            <span className="font-bold text-gray-900 text-xl">
              ExcelFormula.xyz
            </span>
          </Link>
          <Link href="/">
            <Button size="sm" variant="ghost">
              Back to Home
            </Button>
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        <h1 className="mb-8 font-bold text-4xl text-gray-900">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              Last Updated: January 2025
            </h2>
            <p>
              ExcelFormula.xyz ("we," "our," or "us") is committed to protecting
              your privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our website
              and services.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              Information We Collect
            </h2>
            <h3 className="mb-2 font-semibold text-gray-900 text-xl">
              Personal Information
            </h3>
            <p>When you register for an account, we collect:</p>
            <ul className="mt-2 ml-6 list-disc space-y-1">
              <li>Email address</li>
              <li>Name (optional)</li>
              <li>Payment information (processed securely through Ko-fi)</li>
            </ul>

            <h3 className="mt-4 mb-2 font-semibold text-gray-900 text-xl">
              Usage Information
            </h3>
            <p>We automatically collect:</p>
            <ul className="mt-2 ml-6 list-disc space-y-1">
              <li>Formulas you generate</li>
              <li>Chat conversations with our AI</li>
              <li>Device and browser information</li>
              <li>IP address and location data</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              How We Use Your Information
            </h2>
            <p>We use your information to:</p>
            <ul className="mt-2 ml-6 list-disc space-y-1">
              <li>Provide and improve our services</li>
              <li>Generate Excel formulas and code based on your requests</li>
              <li>Process premium feature upgrades</li>
              <li>Send service-related communications</li>
              <li>Analyze usage patterns and improve user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              Data Storage and Security
            </h2>
            <p>
              Your data is stored securely using industry-standard encryption.
              We use Vercel Postgres for database storage and implement security
              best practices to protect your information. However, no method of
              transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              Third-Party Services
            </h2>
            <p>We use the following third-party services:</p>
            <ul className="mt-2 ml-6 list-disc space-y-1">
              <li>
                <strong>Ko-fi:</strong> For payment processing
              </li>
              <li>
                <strong>OpenAI/xAI:</strong> For AI formula generation
              </li>
              <li>
                <strong>Vercel:</strong> For hosting and analytics
              </li>
            </ul>
            <p className="mt-2">
              These services have their own privacy policies governing the use
              of your information.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="mt-2 ml-6 list-disc space-y-1">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your data</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, contact us at support@excelformula.xyz
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">Cookies</h2>
            <p>
              We use essential cookies for authentication and session
              management. We do not use tracking cookies for advertising
              purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              Children's Privacy
            </h2>
            <p>
              Our services are not directed to individuals under 13 years of
              age. We do not knowingly collect personal information from
              children.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, please contact us
              at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> support@excelformula.xyz
            </p>
          </section>
        </div>
      </div>

      <AppFooter />
    </div>
  );
}
