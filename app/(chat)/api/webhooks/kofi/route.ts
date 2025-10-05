import { NextResponse } from "next/server";
import { createPayment, createOrUpdatePremiumUser, getUser } from "@/lib/db/queries";

export const maxDuration = 30;

interface KofiWebhookData {
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
  shop_items: Array<{ direct_link_code: string }> | null;
  tier_name: string | null;
  shipping: any;
  discord_username?: string;
  discord_userid?: string;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const dataString = formData.get("data") as string;

    if (!dataString) {
      console.error("No data field in Ko-fi webhook");
      return new Response("OK", { status: 200 });
    }

    const kofiData: KofiWebhookData = JSON.parse(dataString);

    const expectedToken = process.env.KOFI_VERIFICATION_TOKEN;
    if (expectedToken && kofiData.verification_token !== expectedToken) {
      console.error("Invalid Ko-fi verification token");
      return NextResponse.json(
        { error: "Invalid verification token" },
        { status: 401 }
      );
    }

    const users = await getUser(kofiData.email);
    
    if (users.length === 0) {
      console.error("User not found for Ko-fi payment:", kofiData.email);
      return new Response("OK", { status: 200 });
    }

    const [targetUser] = users;

    await createPayment({
      userId: targetUser.id,
      kofiTransactionId: kofiData.kofi_transaction_id,
      messageId: kofiData.message_id,
      type: kofiData.type,
      amount: kofiData.amount,
      currency: kofiData.currency,
      fromName: kofiData.from_name,
      email: kofiData.email,
      message: kofiData.message,
      isSubscriptionPayment: kofiData.is_subscription_payment,
      isFirstSubscriptionPayment: kofiData.is_first_subscription_payment,
      tierName: kofiData.tier_name,
      url: kofiData.url,
      rawData: kofiData,
    });

    const amount = parseFloat(kofiData.amount);
    
    if (kofiData.type === "Donation" && amount >= 5) {
      await createOrUpdatePremiumUser({
        userId: targetUser.id,
        isPremium: true,
        lifetimeAccess: true,
      });
    } else if (kofiData.type === "Subscription") {
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + 1);

      await createOrUpdatePremiumUser({
        userId: targetUser.id,
        isPremium: true,
        subscriptionActive: true,
        subscriptionExpiresAt: expiresAt,
        tierName: kofiData.tier_name,
      });
    }

    console.log("Ko-fi payment processed:", {
      email: kofiData.email,
      amount: kofiData.amount,
      type: kofiData.type,
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Ko-fi webhook error:", error);
    return new Response("OK", { status: 200 });
  }
}
