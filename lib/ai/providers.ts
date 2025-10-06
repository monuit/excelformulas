import { gateway } from "@ai-sdk/gateway";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "chat-model-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
          "gpt-4o-mini": chatModel,
        },
      });
    })()
  : customProvider({
      languageModels: {
        // Grok for simple queries (default chat model)
        "chat-model": gateway.languageModel("xai/grok-2-vision-1212"),
        // GPT-5-nano as primary reasoning model
        "chat-model-reasoning": wrapLanguageModel({
          model: gateway.languageModel("openai/gpt-5-nano"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        // Grok as secondary reasoning model
        "chat-model-reasoning-grok": wrapLanguageModel({
          model: gateway.languageModel("xai/grok-3-mini"),
          middleware: extractReasoningMiddleware({ tagName: "think" }),
        }),
        "title-model": gateway.languageModel("xai/grok-2-1212"),
        "artifact-model": gateway.languageModel("xai/grok-2-1212"),
        // GPT-4o Mini for complex queries
        "gpt-4o-mini": gateway.languageModel("openai/gpt-4o-mini"),
        // GPT-5-nano as standalone model
        "gpt-5-nano": gateway.languageModel("openai/gpt-5-nano"),
      },
    });
