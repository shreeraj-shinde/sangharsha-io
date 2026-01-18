"use server";

import { ChatOpenAI } from "@langchain/openai";

export const sendChat = async () => {
  const llm = new initChatModel({
    model: "openai/gpt-oss-120b:free",
    apiKey: process.env.OPENROUTER || process.env.OPENAI_API_KEY, // Fallback or specific env var
    configuration: {
      baseURL: "https://openrouter.ai/api/v1",
    },
  });

  const response = await llm.invoke("Hello, how are you?");
  console.log(response); // Log on server console
  return response.content; // Return content to client
};
