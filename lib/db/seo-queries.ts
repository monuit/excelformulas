import "server-only";

import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { type SeoFormula, seoFormula } from "./schema";

// biome-ignore lint: Forbidden non-null assertion.
const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

/**
 * Create a new SEO formula entry
 */
export async function createSeoFormula(data: {
  slug: string;
  queryHash: string;
  query: string;
  formula: string;
  explanation: string;
  examples?: string[];
  alternatives?: { formula: string; description: string }[];
  category?: string;
  blobUrl?: string;
}): Promise<SeoFormula> {
  const [formula] = await db
    .insert(seoFormula)
    .values({
      ...data,
      examples: data.examples || [],
      alternatives: data.alternatives || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return formula;
}

/**
 * Get SEO formula by slug
 */
export async function getSeoFormulaBySlug(
  slug: string
): Promise<SeoFormula | null> {
  const [formula] = await db
    .select()
    .from(seoFormula)
    .where(eq(seoFormula.slug, slug));

  return formula || null;
}

/**
 * Get SEO formula by query hash
 */
export async function getSeoFormulaByHash(
  hash: string
): Promise<SeoFormula | null> {
  const [formula] = await db
    .select()
    .from(seoFormula)
    .where(eq(seoFormula.queryHash, hash));

  return formula || null;
}

/**
 * Update view count for a formula
 */
export async function incrementFormulaViews(slug: string): Promise<void> {
  const formula = await getSeoFormulaBySlug(slug);
  if (!formula) {
    return;
  }

  const currentViews = typeof formula.views === "number" ? formula.views : 0;

  await db
    .update(seoFormula)
    .set({ views: currentViews + 1 })
    .where(eq(seoFormula.slug, slug));
}

/**
 * Get top viewed formulas (for trending section)
 */
export async function getTopFormulas(limit = 10): Promise<SeoFormula[]> {
  return await db
    .select()
    .from(seoFormula)
    .orderBy(seoFormula.views)
    .limit(limit);
}

/**
 * Check if formula exists by query hash
 */
export async function formulaExistsByHash(hash: string): Promise<boolean> {
  const formula = await getSeoFormulaByHash(hash);
  return !!formula;
}
