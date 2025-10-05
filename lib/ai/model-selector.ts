/**
 * Determines the optimal AI model based on query complexity
 * Longer, more complex queries use GPT-4o Mini
 * Shorter, simpler queries use Grok
 */

export function selectModelByComplexity(input: string): string {
  const inputLength = input.trim().length;
  const wordCount = input.trim().split(/\s+/).length;

  // Count complexity indicators
  const hasCodeBlock = /```/.test(input);
  const hasMultipleQuestions = (input.match(/\?/g) || []).length > 1;
  const hasLongSentences = input
    .split(/[.!?]/)
    .some((sentence) => sentence.length > 150);
  const hasTechnicalTerms =
    /\b(function|formula|VBA|SQL|database|query|macro|script|code|debug|error)\b/i.test(
      input
    );

  // Complexity score calculation
  let complexityScore = 0;

  // Length-based scoring
  if (inputLength > 500) complexityScore += 3;
  else if (inputLength > 300) complexityScore += 2;
  else if (inputLength > 150) complexityScore += 1;

  // Word count scoring
  if (wordCount > 100) complexityScore += 2;
  else if (wordCount > 50) complexityScore += 1;

  // Feature-based scoring
  if (hasCodeBlock) complexityScore += 2;
  if (hasMultipleQuestions) complexityScore += 1;
  if (hasLongSentences) complexityScore += 1;
  if (hasTechnicalTerms) complexityScore += 1;

  // Decision threshold: score >= 4 uses GPT-4o Mini, otherwise Grok
  // GPT-4o Mini is better for complex, technical queries
  // Grok is faster for simple, straightforward queries
  if (complexityScore >= 4) {
    return "gpt-4o-mini"; // Complex query
  }

  return "chat-model"; // Simple query (Grok)
}

/**
 * Get the appropriate model name for AI SDK
 */
export function getModelForQuery(input: string): string {
  const selectedModel = selectModelByComplexity(input);

  // Map to actual gateway model names
  if (selectedModel === "gpt-4o-mini") {
    return "openai/gpt-4o-mini";
  }

  return "xai/grok-2-vision-1212"; // Default to Grok
}
