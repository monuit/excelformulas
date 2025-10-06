import { NextResponse } from "next/server";
import { z } from "zod";

import { formulaExistsByHash, getSeoFormulaBySlug } from "@/lib/db/seo-queries";
import { generateUniqueSlug, hashQuery } from "@/lib/seo/query-hash";
import {
  getQuerySlug,
  isFormulaGenerating,
  markFormulaGenerating,
  storeQuerySlug,
} from "@/lib/seo/redis-cache";

const querySchema = z.object({
  query: z.string().min(1).max(500),
});

/**
 * POST /api/seo-formula/submit
 * Submit a query and get a slug for the SEO page
 * - If formula exists → return existing slug
 * - If generating → return status: generating
 * - If new → enqueue generation and return slug
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query } = querySchema.parse(body);

    // 1. Normalize and hash the query
    const hash = hashQuery(query);

    // 2. Check Redis cache for existing slug
    let slug = await getQuerySlug(hash);

    if (slug) {
      // Formula exists in cache
      // Verify it's also in database
      const formula = await getSeoFormulaBySlug(slug);

      if (formula) {
        return NextResponse.json({
          status: "ready",
          slug,
          url: `/excel/${slug}`,
        });
      }
    }

    // 3. Check if formula exists in database (cache miss)
    const exists = await formulaExistsByHash(hash);

    if (exists) {
      // Generate slug and store in cache
      slug = generateUniqueSlug(query);
      await storeQuerySlug(hash, slug);

      return NextResponse.json({
        status: "ready",
        slug,
        url: `/excel/${slug}`,
      });
    }

    // 4. Check if formula is currently being generated
    const generating = await isFormulaGenerating(hash);

    if (generating) {
      return NextResponse.json({
        status: "generating",
        message:
          "Your formula is being generated. Please check back in a few seconds.",
        hash,
      });
    }

    // 5. New query - enqueue for generation
    slug = generateUniqueSlug(query);

    // Mark as generating (lock for 5 minutes)
    await markFormulaGenerating(hash);

    // Store slug in cache
    await storeQuerySlug(hash, slug);

    // Trigger background worker (serverless function)
    // In production, use Vercel's after() or a queue like Upstash QStash
    if (process.env.NODE_ENV === "production") {
      // Call background worker
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/seo-formula/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, hash, slug }),
      }).catch(console.error);
    }

    return NextResponse.json({
      status: "generating",
      slug,
      url: `/excel/${slug}`,
      message:
        "Generating your formula... This page will be available in a moment.",
    });
  } catch (error) {
    console.error("Error submitting SEO formula query:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to submit query" },
      { status: 500 }
    );
  }
}
