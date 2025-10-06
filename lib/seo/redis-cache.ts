import "server-only";

import { createClient, type RedisClientType } from "redis";

let redis: RedisClientType | null = null;

/**
 * Get or create Redis client for caching SEO queries
 * Uses REDIS_URL environment variable
 */
export async function getRedisClient(): Promise<RedisClientType | null> {
  if (!process.env.REDIS_URL) {
    console.warn("REDIS_URL not configured, caching disabled");
    return null;
  }

  if (!redis) {
    redis = createClient({
      url: process.env.REDIS_URL,
    });

    redis.on("error", (err) => {
      console.error("Redis Client Error", err);
    });

    await redis.connect();
  }

  return redis;
}

/**
 * Store query slug mapping in Redis
 * Key: query hash
 * Value: slug
 * TTL: 30 days
 */
export async function storeQuerySlug(
  hash: string,
  slug: string
): Promise<void> {
  const client = await getRedisClient();
  if (!client) {
    return;
  }

  try {
    await client.setEx(`query:${hash}`, 60 * 60 * 24 * 30, slug); // 30 days
  } catch (error) {
    console.error("Failed to store query slug:", error);
  }
}

/**
 * Get slug for a query hash from Redis
 * Returns null if not found
 */
export async function getQuerySlug(hash: string): Promise<string | null> {
  const client = await getRedisClient();
  if (!client) {
    return null;
  }

  try {
    return await client.get(`query:${hash}`);
  } catch (error) {
    console.error("Failed to get query slug:", error);
    return null;
  }
}

/**
 * Increment view count for a slug
 */
export async function incrementSlugViews(slug: string): Promise<number> {
  const client = await getRedisClient();
  if (!client) {
    return 0;
  }

  try {
    return await client.incr(`views:${slug}`);
  } catch (error) {
    console.error("Failed to increment views:", error);
    return 0;
  }
}

/**
 * Get view count for a slug
 */
export async function getSlugViews(slug: string): Promise<number> {
  const client = await getRedisClient();
  if (!client) {
    return 0;
  }

  try {
    const views = await client.get(`views:${slug}`);
    return views ? Number.parseInt(views, 10) : 0;
  } catch (error) {
    console.error("Failed to get views:", error);
    return 0;
  }
}

/**
 * Check if a formula is being generated (to prevent duplicate work)
 */
export async function isFormulaGenerating(hash: string): Promise<boolean> {
  const client = await getRedisClient();
  if (!client) {
    return false;
  }

  try {
    const exists = await client.exists(`generating:${hash}`);
    return exists === 1;
  } catch (error) {
    console.error("Failed to check generation status:", error);
    return false;
  }
}

/**
 * Mark a formula as being generated (lock for 5 minutes)
 */
export async function markFormulaGenerating(hash: string): Promise<void> {
  const client = await getRedisClient();
  if (!client) {
    return;
  }

  try {
    await client.setEx(`generating:${hash}`, 60 * 5, "true"); // 5 minutes
  } catch (error) {
    console.error("Failed to mark formula as generating:", error);
  }
}

/**
 * Remove generation lock
 */
export async function unmarkFormulaGenerating(hash: string): Promise<void> {
  const client = await getRedisClient();
  if (!client) {
    return;
  }

  try {
    await client.del(`generating:${hash}`);
  } catch (error) {
    console.error("Failed to unmark formula:", error);
  }
}
