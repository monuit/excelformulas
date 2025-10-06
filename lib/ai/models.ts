export const DEFAULT_CHAT_MODEL: string = "chat-model";

export type ChatModel = {
  id: string;
  name: string;
  description: string;
};

export const chatModels: ChatModel[] = [
  {
    id: "chat-model",
    name: "Grok Vision",
    description: "Advanced multimodal model with vision and text capabilities",
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    description: "Fast and efficient ChatGPT model for Excel formulas",
  },
  {
    id: "chat-model-reasoning",
    name: "GPT-5 Nano (Reasoning)",
    description: "Advanced reasoning model for complex Excel problems",
  },
  {
    id: "chat-model-reasoning-grok",
    name: "Grok Reasoning",
    description: "Uses chain-of-thought reasoning for complex problems",
  },
];
