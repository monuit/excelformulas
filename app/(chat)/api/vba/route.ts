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
});

const vbaSystemPrompt = `You are an expert Excel VBA developer. 

Your task is to:
1. Generate clean, well-commented VBA code based on user requirements
2. Follow Excel VBA best practices
3. Use proper error handling
4. Provide clear explanations of what the code does
5. Include usage instructions

Format your response as:
- The VBA code wrapped in a code block
- A clear explanation of what it does
- Instructions on how to implement it
- Any important notes or warnings

Focus on writing production-ready, maintainable VBA code.`;

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
        error: "Premium feature. Support us on Ko-fi to unlock VBA generation!",
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

  const { prompt } = parsedBody;

  try {
    // Select model based on prompt complexity
    const selectedModel = selectModelByComplexity(prompt);
    
    const response = streamText({
      model: myProvider.languageModel(selectedModel) as any,
      messages: [
        {
          role: "system",
          content: vbaSystemPrompt,
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
    console.error("vba_route_error", error);
    return NextResponse.json(
      { error: "Something went wrong generating VBA code." },
      { status: 500 }
    );
  }
}
