import { TableIcon } from "lucide-react";
import Link from "next/link";
import { AppFooter } from "@/components/app-footer";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
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
          Terms of Service
        </h1>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              Last Updated: January 2025
            </h2>
            <p>
              Welcome to ExcelFormula.xyz. By using our website and services,
              you agree to these Terms of Service. Please read them carefully.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using ExcelFormula.xyz, you agree to be bound by
              these Terms of Service and our Privacy Policy. If you do not agree
              to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              2. Description of Service
            </h2>
            <p>
              ExcelFormula.xyz provides AI-powered tools for generating Excel
              formulas, VBA macros, SQL queries, and debugging spreadsheet
              errors. Our service includes:
            </p>
            <ul className="mt-2 ml-6 list-disc space-y-1">
              <li>Free AI formula generation</li>
              <li>Premium code generators (VBA, SQL)</li>
              <li>Premium formula and code debuggers</li>
              <li>Chat-based interface for natural language queries</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              3. User Accounts
            </h2>
            <p>
              You may be required to create an account to access certain
              features. You are responsible for:
            </p>
            <ul className="mt-2 ml-6 list-disc space-y-1">
              <li>
                Maintaining the confidentiality of your account credentials
              </li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              4. Premium Features
            </h2>
            <p>
              Premium features require a one-time payment of $5 processed
              through Ko-fi. Premium access includes:
            </p>
            <ul className="mt-2 ml-6 list-disc space-y-1">
              <li>Lifetime access to VBA and SQL code generators</li>
              <li>Advanced formula and code debugging tools</li>
              <li>Priority support</li>
            </ul>
            <p className="mt-2">
              All payments are final and non-refundable except as required by
              law.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              5. Acceptable Use
            </h2>
            <p>You agree NOT to:</p>
            <ul className="mt-2 ml-6 list-disc space-y-1">
              <li>Use the service for any illegal purposes</li>
              <li>Attempt to reverse engineer or hack our systems</li>
              <li>Share your account credentials with others</li>
              <li>Abuse or overload our AI systems</li>
              <li>Upload malicious code or viruses</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              6. Intellectual Property
            </h2>
            <p>
              All content, features, and functionality of ExcelFormula.xyz are
              owned by us and protected by copyright, trademark, and other
              intellectual property laws. The formulas and code generated remain
              your property, but you acknowledge that our AI technology was used
              to create them.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              7. Disclaimer of Warranties
            </h2>
            <p>
              ExcelFormula.xyz is provided "AS IS" and "AS AVAILABLE" without
              warranties of any kind. We do not guarantee that:
            </p>
            <ul className="mt-2 ml-6 list-disc space-y-1">
              <li>The service will be uninterrupted or error-free</li>
              <li>
                Generated formulas or code will be accurate or suitable for your
                specific use case
              </li>
              <li>Any errors will be corrected</li>
            </ul>
            <p className="mt-2">
              <strong>
                Always test generated formulas and code before using in
                production.
              </strong>
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              8. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, ExcelFormula.xyz and its
              operators shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages resulting from your
              use or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              9. Indemnification
            </h2>
            <p>
              You agree to indemnify and hold harmless ExcelFormula.xyz from any
              claims, damages, losses, liabilities, and expenses arising from
              your use of the service or violation of these terms.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              10. Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate your account at any
              time for violations of these terms or for any other reason. Upon
              termination, your right to use the service ceases immediately.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              11. Changes to Terms
            </h2>
            <p>
              We may update these Terms of Service from time to time. Continued
              use of the service after changes constitutes acceptance of the new
              terms.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              12. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              applicable laws, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-bold text-2xl text-gray-900">
              13. Contact Information
            </h2>
            <p>For questions about these Terms of Service, contact us at:</p>
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
