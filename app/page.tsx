import { auth } from "@/app/(auth)/auth";
import { NewLandingPage } from "@/components/landing/new-landing-page";

export default async function LandingPage() {
  const session = await auth();

  // Show landing page to everyone (authenticated or not)
  // Users can navigate to /chat when they want
  return <NewLandingPage session={session} />;
}
