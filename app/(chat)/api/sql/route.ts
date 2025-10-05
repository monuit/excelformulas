import { streamText } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/app/(auth)/auth";
import { myProvider } from "@/lib/ai/providers";
import { isPremiumUser } from "@/lib/db/queries";
import { selectModelByComplexity } from "@/lib/ai/model-selector";

export const maxDuration = 30;

const requestSchema = z.object({
  prompt: z.string().min(1).max(4000),
  dialect: z.enum(["mysql", "postgresql", "sqlserver", "sqlite"]).default("mysql"),
});

const sqlSystemPrompt = (dialect: string) => `You are an expert SQL developer specializing in ${dialect}.

Your task is to:
1. Generate optimized, well-formatted SQL queries
2. Follow ${dialect}-specific best practices and syntax
3. Use proper indexing suggestions where applicable
4. Include comments explaining complex parts
5. Provide performance tips

Format your response as:
- The SQL query wrapped in a code block
- A clear explanation of what the query does
- Performance considerations
- Any important notes about ${dialect}-specific features

Focus on writing production-ready, optimized SQL queries.`;

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized. Please sign in." },
      { status: 401 }
    );
  }

  const hasPremium = await isPremiumUser(session.user.id);

  if (!hasPremium) {
    return NextResponse.json(
      {
        error: "Premium feature. Support us on Ko-fi to unlock SQL generation!",
        upgradeUrl: process.env.NEXT_PUBLIC_KOFI_URL || "https://ko-fi.com/yourpage",
      },
      { status: 403 }
    );
  }

  let parsedBody: z.infer<typeof requestSchema>;
  try {
    const json = await request.json();
    parsedBody = requestSchema.parse(json);
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }

  const { prompt, dialect } = parsedBody;

  try {
    // Select model based on prompt complexity
    const selectedModel = selectModelByComplexity(prompt);
    
    const response = streamText({
      model: myProvider.languageModel(selectedModel) as any,
      messages: [
        {
          role: "system",
          content: sqlSystemPrompt(dialect),
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return response.toTextStreamResponse({
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("sql_route_error", error);
    return NextResponse.json(
      { error: "Something went wrong generating SQL query." },
      { status: 500 }
    );
  }
}
