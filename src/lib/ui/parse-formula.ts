interface ParsedFormula {
  formula: string;
  explanation: string;
  language: string;
}

const formulaRegex = /```([a-zA-Z0-9_-]*)?\n([\s\S]*?)```/;

export function parseFormulaOutput(completion: string): ParsedFormula {
  const trimmed = completion.trim();
  const match = trimmed.match(formulaRegex);

  if (!match) {
    return {
      formula: trimmed,
      explanation: "",
      language: "excel",
    };
  }

  const [, language = "excel", rawFormula] = match;
  const explanation = trimmed.replace(match[0], "").trim();

  return {
    formula: rawFormula.trim(),
    explanation,
    language: language.length > 0 ? language : "excel",
  };
}
