import { type NextRequest, NextResponse } from "next/server";

import { createOrUpdatePremiumUser, getUser } from "@/lib/db/queries";

/**
 * Ko-fi Webhook Handler
 * POST /api/webhook/kofi
 *
 * Handles Ko-fi payment notifications and updates premium user status
 * https://ko-fi.com/manage/webhooks
 *
 * Set this URL in Ko-fi dashboard:
 * https://excelformula.xyz/api/webhook/kofi
 *
 * Add environment variable:
 * KOFI_VERIFICATION_TOKEN=your-token-here (optional but recommended)
 */

type KofiWebhookData = {
  verification_token: string;
  message_id: string;
  timestamp: string;
  type: "Donation" | "Subscription" | "Commission" | "Shop Order";
  is_public: boolean;
  from_name: string;
  message: string | null;
  amount: string;
  url: string;
  email: string;
  currency: string;
  is_subscription_payment: boolean;
  is_first_subscription_payment: boolean;
  kofi_transaction_id: string;
  shop_items: Array<{
    direct_link_code: string;
    variation_name?: string;
    quantity?: number;
  }> | null;
  tier_name: string | null;
  shipping: Record<string, string> | null;
  discord_username?: string;
  discord_userid?: string;
};

export async function POST(request: NextRequest) {
  try {
    // Parse form data
    const formData = await request.formData();
    const dataString = formData.get("data") as string;

    if (!dataString) {
      console.error("[Ko-fi Webhook] Missing data field");
      return NextResponse.json(
        { error: "Missing data field" },
        { status: 400 }
      );
    }

    // Parse JSON data
    const data: KofiWebhookData = JSON.parse(dataString);

    // Verify webhook token (optional but recommended)
    const expectedToken = process.env.KOFI_VERIFICATION_TOKEN;
    if (expectedToken && data.verification_token !== expectedToken) {
      console.error("[Ko-fi Webhook] Invalid verification token");
      return NextResponse.json(
        { error: "Invalid verification token" },
        { status: 401 }
      );
    }

    // Log webhook received
    console.log("[Ko-fi Webhook] Received payment:", {
      type: data.type,
      email: data.email,
      amount: data.amount,
      is_subscription: data.is_subscription_payment,
      tier: data.tier_name,
    });

    // Handle different payment types
    if (
      data.type === "Donation" ||
      data.type === "Subscription" ||
      data.tier_name
    ) {
      await handlePremiumActivation(data);
    }

    // Return 200 status to acknowledge receipt
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[Ko-fi Webhook] Error processing webhook:", error);
    // Return 200 to prevent Ko-fi from retrying (logged for manual review)
    return NextResponse.json(
      { success: false, error: "Internal error" },
      { status: 200 }
    );
  }
}

/**
 * Handle premium user activation/renewal
 */
async function handlePremiumActivation(data: KofiWebhookData) {
  const email = data.email.toLowerCase().trim();

  try {
    // Find user by email
    const users = await getUser(email);

    if (users.length === 0) {
      console.warn(
        "[Ko-fi Webhook] No user found with email:",
        email,
        "- User needs to register first"
      );
      return;
    }

    const userId = users[0].id;

    // Calculate expiry date (30 days for single, 31 days for subscription)
    const expiryDate = new Date();
    if (data.is_subscription_payment) {
      expiryDate.setDate(expiryDate.getDate() + 31); // 1 extra day buffer
    } else {
      expiryDate.setDate(expiryDate.getDate() + 30);
    }

    // Create or update premium status
    await createOrUpdatePremiumUser({
      userId,
      isPremium: true,
      subscriptionActive: data.is_subscription_payment,
      subscriptionExpiresAt: expiryDate,
      tierName: data.tier_name || null,
      lifetimeAccess: false, // Could add logic for lifetime based on amount
    });

    console.log("[Ko-fi Webhook] Premium activated for:", email, {
      userId,
      subscription: data.is_subscription_payment,
      expiresAt: expiryDate,
      tier: data.tier_name,
    });
  } catch (error) {
    console.error("[Ko-fi Webhook] Error activating premium:", error);
    throw error;
  }
}
