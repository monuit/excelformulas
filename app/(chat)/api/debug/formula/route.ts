import { geolocation } from "@vercel/functions";
import {
  convertToModelMessages,
  createUIMessageStream,
  JsonToSseTransformStream,
  streamText,
} from "ai";
import { z } from "zod";
import { auth } from "@/app/(auth)/auth";
import { myProvider } from "@/lib/ai/providers";
import { isPremiumUser } from "@/lib/db/queries";
import { isProductionEnvironment } from "@/lib/constants";
import { generateUUID } from "@/lib/utils";
import type { ChatMessage } from "@/lib/types";
import { selectModelByComplexity } from "@/lib/ai/model-selector";

export const maxDuration = 60;

const postRequestBodySchema = z.object({
  messages: z.array(z.any()),
});

const formulaDebugSystemPrompt = `You are an expert Excel formula debugger and analyst.

Your role is to help users:
1. Debug Excel formulas that aren't working correctly
2. Explain complex formulas step-by-step
3. Identify why formulas return errors (#REF!, #VALUE!, #DIV/0!, etc.)
4. Suggest optimized alternatives
5. Break down nested functions for clarity

When helping with formulas:
- Ask for the formula and expected vs actual results
- Explain each function and argument clearly
- Identify common mistakes (relative vs absolute references, data types, etc.)
- Show corrected formulas with explanations
- Suggest more efficient approaches when applicable

Be interactive, ask clarifying questions, and explain concepts in simple terms. Help users understand the logic behind formulas.`;

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return new Response(
      JSON.stringify({ error: "Unauthorized. Please sign in." }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const hasPremium = await isPremiumUser(session.user.id);

  if (!hasPremium) {
    return new Response(
      JSON.stringify({
        error: "Premium feature. Support us on Ko-fi to unlock formula debugging!",
        upgradeUrl: process.env.NEXT_PUBLIC_KOFI_URL || "https://ko-fi.com/yourpage",
      }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  let requestBody: z.infer<typeof postRequestBodySchema>;

  try {
    const json = await request.json();
    requestBody = postRequestBodySchema.parse(json);
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request payload." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { messages } = requestBody;
  const { longitude, latitude, city, country } = geolocation(request);

  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      // Get last user message for complexity analysis
      const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop();
      const userInput = lastUserMessage?.parts?.find((p: any) => p.type === 'text')?.text || '';
      const selectedModel = selectModelByComplexity(userInput);
      
      const result = streamText({
        model: myProvider.languageModel(selectedModel) as any,
        system: formulaDebugSystemPrompt + (city && country ? `\n\nUser Location: ${city}, ${country}` : ""),
        messages: convertToModelMessages(messages),
        experimental_telemetry: {
          isEnabled: isProductionEnvironment,
          functionId: "formula-debug",
        },
      });

      result.consumeStream();
      writer.merge(result.toUIMessageStream());
    },
    generateId: generateUUID,
    onError: () => {
      return "Oops, an error occurred while debugging!";
    },
  });

  return new Response(stream.pipeThrough(new JsonToSseTransformStream()));
}
