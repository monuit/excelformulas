import { z } from "zod";

const serverSchema = z.object({
  VERCEL_AI_API_KEY: z.string().min(1).optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
});

const scrub = (value: string | undefined): string | undefined => {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : undefined;
};

const serverEnv = serverSchema.parse({
  VERCEL_AI_API_KEY: scrub(process.env.VERCEL_AI_API_KEY),
  UPSTASH_REDIS_REST_URL: scrub(process.env.UPSTASH_REDIS_REST_URL),
  UPSTASH_REDIS_REST_TOKEN: scrub(process.env.UPSTASH_REDIS_REST_TOKEN),
});

const clientEnv = clientSchema.parse({
  NEXT_PUBLIC_SITE_URL: scrub(process.env.NEXT_PUBLIC_SITE_URL),
});

export const env = {
  ...serverEnv,
  ...clientEnv,
};

export const hasRateLimitConfig =
  Boolean(env.UPSTASH_REDIS_REST_URL) &&
  Boolean(env.UPSTASH_REDIS_REST_TOKEN);

export function assertAiProvidersConfigured(): void {
  if (!env.VERCEL_AI_API_KEY) {
    throw new Error(
      "Missing Vercel AI API key. Set VERCEL_AI_API_KEY before calling the formula API.",
    );
  }
}
