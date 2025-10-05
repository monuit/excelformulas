type FormulaMode = "excel" | "sheets";

interface ModelSelection {
  model: string;
  maxTokens: number;
}

const defaultOpenAiModel =
  process.env.FORMULA_MODEL_SIMPLE ?? "gpt-4o-mini";
const defaultAnthropicModel =
  process.env.FORMULA_MODEL_COMPLEX ?? "claude-3.5-sonnet";

function estimateComplexity(prompt: string, mode: FormulaMode): number {
  const lengthScore = Math.min(prompt.length / 200, 10);
  const keywordScore = (prompt.match(/\b(if|lambda|regex|array|dynamic|lookup|nested)\b/gi)?.length ?? 0) * 2;
  const modeScore = mode === "sheets" ? 0.5 : 0;
  return lengthScore + keywordScore + modeScore;
}

export function selectModel(input: {
  prompt: string;
  mode: FormulaMode;
}): ModelSelection {
  const complexity = estimateComplexity(input.prompt, input.mode);
  if (complexity >= 6) {
    return {
      model: defaultAnthropicModel,
      maxTokens: 800,
    };
  }

  return {
    model: defaultOpenAiModel,
    maxTokens: 600,
  };
}
