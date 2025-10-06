import { geolocation } from "@vercel/functions";
import {
  convertToModelMessages,
  createUIMessageStream,
  JsonToSseTransformStream,
  streamText,
} from "ai";
import { z } from "zod";
import { auth } from "@/app/(auth)/auth";
import { selectModelByComplexity } from "@/lib/ai/model-selector";
import { myProvider } from "@/lib/ai/providers";
import { isProductionEnvironment } from "@/lib/constants";
import { isPremiumUser } from "@/lib/db/queries";
import { generateUUID } from "@/lib/utils";

export const maxDuration = 60;

const postRequestBodySchema = z.object({
  messages: z.array(z.any()),
});

const vbaDebugSystemPrompt = `You are an expert VBA debugger and Excel automation specialist.

Your role is to help users:
1. Debug VBA code errors and identify issues
2. Explain how VBA code works line-by-line
3. Suggest improvements and optimizations
4. Fix runtime errors and logic bugs
5. Explain VBA concepts clearly

When debugging:
- Ask clarifying questions about the error or expected behavior
- Analyze the code step-by-step
- Point out specific lines with issues
- Provide corrected code with explanations
- Suggest best practices and alternatives

Be conversational, patient, and educational. Help users understand not just what's wrong, but why it's wrong and how to prevent similar issues.`;

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
        error: "Premium feature. Support us on Ko-fi to unlock VBA debugging!",
        upgradeUrl:
          process.env.NEXT_PUBLIC_KOFI_URL || "https://ko-fi.com/yourpage",
      }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  let requestBody: z.infer<typeof postRequestBodySchema>;

  try {
    const json = await request.json();
    requestBody = postRequestBodySchema.parse(json);
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request payload." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { messages } = requestBody;
  const { longitude, latitude, city, country } = geolocation(request);

  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      // Get last user message for complexity analysis
      const lastUserMessage = messages
        .filter((m: any) => m.role === "user")
        .pop();
      const userInput =
        lastUserMessage?.parts?.find((p: any) => p.type === "text")?.text || "";
      const selectedModel = selectModelByComplexity(userInput);

      const result = streamText({
        model: myProvider.languageModel(selectedModel) as any,
        system:
          vbaDebugSystemPrompt +
          (city && country ? `\n\nUser Location: ${city}, ${country}` : ""),
        messages: convertToModelMessages(messages),
        experimental_telemetry: {
          isEnabled: isProductionEnvironment,
          functionId: "vba-debug",
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
