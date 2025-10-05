import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { assertAiProvidersConfigured, env } from "@/env";
import { buildSystemPrompt } from "@/lib/ai/prompts";
import { selectModel } from "@/lib/ai/model-router";
import { enforceRateLimit } from "@/lib/rate-limit";

export const runtime = "edge";
export const maxDuration = 30;

const requestSchema = z.object({
  prompt: z.string().min(1).max(4000),
  mode: z.enum(["excel", "sheets"]).default("excel"),
});

const vercelAI = env.VERCEL_AI_API_KEY
  ? createOpenAI({
      apiKey: env.VERCEL_AI_API_KEY,
      baseURL: "https://api.ai.vercel.com/v1",
    })
  : null;

export async function POST(request: Request) {
  try {
    assertAiProvidersConfigured();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "AI providers are not configured.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const identifier =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "anonymous";

  const rateResult = await enforceRateLimit(identifier);
  if (!rateResult.success) {
    return NextResponse.json(
      {
        error: "Rate limit reached. Try again after a short break.",
        retryAt: rateResult.reset,
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": String(rateResult.limit),
          "X-RateLimit-Remaining": String(rateResult.remaining),
          "X-RateLimit-Reset": String(rateResult.reset),
        },
      },
    );
  }

  let parsedBody: z.infer<typeof requestSchema>;
  try {
    const json = await request.json();
    parsedBody = requestSchema.parse(json);
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 },
    );
  }

  const { prompt, mode } = parsedBody;
  const cleanedPrompt = prompt.trim();
  const selection = selectModel({ prompt: cleanedPrompt, mode });

  if (!vercelAI) {
    return NextResponse.json(
      { error: "Model provider is unavailable." },
      { status: 500 },
    );
  }

  try {
    const response = await streamText({
      model: vercelAI(selection.model),
      messages: [
        {
          role: "system",
          content: buildSystemPrompt(mode),
        },
        {
          role: "user",
          content: cleanedPrompt,
        },
      ],
      maxOutputTokens: selection.maxTokens,
    });

    return response.toAIStreamResponse({
      headers: {
        "X-RateLimit-Limit": String(rateResult.limit),
        "X-RateLimit-Remaining": String(rateResult.remaining),
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("formula_route_error", error);
    return NextResponse.json(
      { error: "Something went wrong generating the formula." },
      { status: 500 },
    );
  }
}
