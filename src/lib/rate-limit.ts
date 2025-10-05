import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { hasRateLimitConfig } from "@/env";

const HOUR_IN_SECONDS = 60 * 60;

type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
};

const memoryStore = new Map<string, { count: number; expiresAt: number }>();

const rateLimitPerHour = 60;

const redisLimiter = hasRateLimitConfig
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(rateLimitPerHour, "1 h"),
      analytics: true,
    })
  : null;

function fallbackLimit(identifier: string): RateLimitResult {
  const now = Date.now();
  const existing = memoryStore.get(identifier);
  if (existing && existing.expiresAt > now) {
    if (existing.count >= rateLimitPerHour) {
      return {
        success: false,
        limit: rateLimitPerHour,
        remaining: 0,
        reset: Math.ceil(existing.expiresAt / 1000),
      };
    }

    existing.count += 1;
    memoryStore.set(identifier, existing);
    return {
      success: true,
      limit: rateLimitPerHour,
      remaining: rateLimitPerHour - existing.count,
      reset: Math.ceil(existing.expiresAt / 1000),
    };
  }

  if (existing && existing.expiresAt <= now) {
    memoryStore.delete(identifier);
  }

  memoryStore.set(identifier, {
    count: 1,
    expiresAt: now + HOUR_IN_SECONDS * 1000,
  });

  return {
    success: true,
    limit: rateLimitPerHour,
    remaining: rateLimitPerHour - 1,
    reset: Math.ceil((now + HOUR_IN_SECONDS * 1000) / 1000),
  };
}

export async function enforceRateLimit(
  identifier: string,
): Promise<RateLimitResult> {
  if (!redisLimiter) {
    return fallbackLimit(identifier);
  }

  const result = await redisLimiter.limit(identifier);

  return {
    success: result.success,
    limit: result.limit,
    remaining: result.remaining,
    reset: result.reset,
  };
}
