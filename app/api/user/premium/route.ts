import { NextResponse } from "next/server";
import { auth } from "@/app/(auth)/auth";
import { isPremiumUser } from "@/lib/db/queries";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ isPremium: false });
    }

    const premium = await isPremiumUser(session.user.id);

    return NextResponse.json({ isPremium: premium });
  } catch (error) {
    console.error("Error checking premium status:", error);
    return NextResponse.json({ isPremium: false });
  }
}
