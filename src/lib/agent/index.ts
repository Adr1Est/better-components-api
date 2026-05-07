import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "@/lib/agent/systemPrompt";

interface ChatMessage {
  role: string;
  parts: { text: string }[];
}

export class GeminiAgent {
  private chat;

  constructor(chatHistory: ChatMessage[], apiKey: string, aiModel: string) {
    const ai = new GoogleGenAI({ apiKey });

    this.chat = ai.chats.create({
      model: aiModel,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
      history: chatHistory,
    });
  }

  async send(message: string) {
    const res = await this.chat.sendMessage({ message });
    return res.text;
  }

  async stream(message: string, onChunk: (t: string) => void) {
    const stream = await this.chat.sendMessageStream({ message });

    let full = "";
    for await (const chunk of stream) {
      if (chunk.text) {
        full += chunk.text;
        onChunk(chunk.text);
      }
    }
    return full;
  }
}