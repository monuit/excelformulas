import { z } from "zod";

const serverSchema = z.object({
  VERCEL_AI_API_KEY: z.string().trim().min(1).optional(),
  UPSTASH_REDIS_REST_URL: z.string().trim().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().trim().min(1).optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().trim().url().optional(),
});

const serverEnv = serverSchema.parse(process.env);
const clientEnv = clientSchema.parse(process.env);

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
