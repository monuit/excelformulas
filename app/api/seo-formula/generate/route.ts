import { put } from "@vercel/blob";
import { generateText } from "ai";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import { myProvider } from "@/lib/ai/providers";
import { createSeoFormula } from "@/lib/db/seo-queries";
import { unmarkFormulaGenerating } from "@/lib/seo/redis-cache";

const generateSchema = z.object({
  query: z.string(),
  hash: z.string(),
  slug: z.string(),
});

export const maxDuration = 60;

/**
 * POST /api/seo-formula/generate
 * Background worker to generate formula and store result
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, hash, slug } = generateSchema.parse(body);

    // Use Vercel AI SDK to generate formula content
    const { text } = await generateText({
      model: myProvider.languageModel("claude-3-5-sonnet-20241022"),
      prompt: `You are an Excel formula expert. Generate a comprehensive response for this query: "${query}"

Please provide your response in the following JSON format:
{
  "formula": "The Excel formula (just the formula, starting with =)",
  "explanation": "A clear, detailed explanation of how the formula works (2-3 paragraphs)",
  "examples": ["Example 1: practical usage", "Example 2: another scenario"],
  "alternatives": [
    {"formula": "Alternative formula 1", "description": "When to use this"},
    {"formula": "Alternative formula 2", "description": "When to use this"}
  ],
  "category": "One of: lookup, math, text, date, logical, statistical, financial"
}

Make it beginner-friendly but comprehensive. Include real-world examples.`,
    });

    // Parse the generated JSON
    let formulaData: {
      formula: string;
      explanation: string;
      examples: string[];
      alternatives: { formula: string; description: string }[];
      category: string;
    };
    try {
      formulaData = JSON.parse(text);
    } catch {
      // If AI didn't return valid JSON, create a structured response
      formulaData = {
        formula: "Unable to generate formula",
        explanation: text,
        examples: [],
        alternatives: [],
        category: "general",
      };
    }

    // Store result JSON to Vercel Blob
    const blobData = JSON.stringify(
      {
        query,
        slug,
        generatedAt: new Date().toISOString(),
        ...formulaData,
      },
      null,
      2
    );

    const blob = await put(`excel/${slug}.json`, blobData, {
      access: "public",
      contentType: "application/json",
    });

    // Save to database
    await createSeoFormula({
      slug,
      queryHash: hash,
      query,
      formula: formulaData.formula,
      explanation: formulaData.explanation,
      examples: formulaData.examples || [],
      alternatives: formulaData.alternatives || [],
      category: formulaData.category,
      blobUrl: blob.url,
    });

    // Remove generation lock
    await unmarkFormulaGenerating(hash);

    // Trigger on-demand revalidation for the page
    revalidatePath(`/excel/${slug}`);

    return NextResponse.json({
      success: true,
      slug,
      blobUrl: blob.url,
    });
  } catch (error) {
    console.error("Error generating SEO formula:", error);

    // Remove lock on error
    const body = await request.json();
    if (body.hash) {
      await unmarkFormulaGenerating(body.hash);
    }

    return NextResponse.json(
      { error: "Failed to generate formula" },
      { status: 500 }
    );
  }
}
