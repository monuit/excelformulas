"use client";

import type { Session } from "next-auth";

import { AppFooter } from "@/components/app-footer";
import { FeaturesSection } from "@/components/landing/features-section";
import { HeroSection } from "@/components/landing/hero-section";
import { Navigation } from "@/components/landing/navigation";
import { ShowcaseSection } from "@/components/landing/showcase-section";

type NewLandingPageProps = {
  session: Session | null;
};

export function NewLandingPage({ session }: NewLandingPageProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-gray-900">
      <Navigation session={session} />
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <AppFooter />
    </div>
  );
}
