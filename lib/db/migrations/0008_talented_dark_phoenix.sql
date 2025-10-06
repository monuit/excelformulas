CREATE TABLE IF NOT EXISTS "Payment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"kofiTransactionId" varchar(255) NOT NULL,
	"messageId" varchar(255) NOT NULL,
	"type" varchar(50) NOT NULL,
	"amount" varchar(20) NOT NULL,
	"currency" varchar(10) NOT NULL,
	"fromName" varchar(255),
	"email" varchar(255),
	"message" text,
	"isSubscriptionPayment" boolean DEFAULT false NOT NULL,
	"isFirstSubscriptionPayment" boolean DEFAULT false NOT NULL,
	"tierName" varchar(100),
	"url" text,
	"rawData" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Payment_kofiTransactionId_unique" UNIQUE("kofiTransactionId"),
	CONSTRAINT "Payment_messageId_unique" UNIQUE("messageId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "PremiumUser" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"isPremium" boolean DEFAULT false NOT NULL,
	"subscriptionActive" boolean DEFAULT false NOT NULL,
	"subscriptionExpiresAt" timestamp,
	"tierName" varchar(100),
	"lifetimeAccess" boolean DEFAULT false NOT NULL,
	"activatedAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "PremiumUser_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "SeoFormula" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(100) NOT NULL,
	"queryHash" varchar(32) NOT NULL,
	"query" text NOT NULL,
	"formula" text NOT NULL,
	"explanation" text NOT NULL,
	"examples" jsonb,
	"alternatives" jsonb,
	"category" varchar(50),
	"views" json DEFAULT '0'::json,
	"blobUrl" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "SeoFormula_slug_unique" UNIQUE("slug"),
	CONSTRAINT "SeoFormula_queryHash_unique" UNIQUE("queryHash")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "PremiumUser" ADD CONSTRAINT "PremiumUser_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
