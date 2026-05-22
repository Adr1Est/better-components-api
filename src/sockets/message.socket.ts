import { GeminiAgent } from "@/lib/agent";
import { MessageModel } from "@/models/v1/message.model";
import { UserModel } from "@/models/v1/user.model";
import { Server, Socket } from "socket.io";

export const registerMessageSocket = (io: Server, socket: Socket) => {
  socket.emit("connected", {
    message: "WebSocket conectado",
  });

  socket.on("conversation:join", ({ conversationId }: { conversationId: string }) => {
    socket.join(conversationId);
  });

  socket.on("message:send", async (data: {
    conversationId: string;
    content: string;
    model: string;
    userId: string;
  }) => {
    const { conversationId, content, model, userId } = data;

    try {
      socket.emit("stream:start");

      // Cargar historial y API Key del usuario
      const user = await UserModel.findUserById(userId);
      const apiKey = user?.apiKey;

      const messages = await MessageModel.getMessagesByConversation(conversationId);
      const previousMessages = messages.slice(0, -1);
      const chatHistory = previousMessages.map((msg) => ({
        role: msg.role,
        parts: [{ text: `
          Mensaje: ${msg.content}

          Componente: ${msg.componentCode ?? ""}

          Dependencias: ${msg.dependencies ?? ""}
        ` }],
      }));

      // Crear agente con historial
      const agent = new GeminiAgent(chatHistory, apiKey!, model);

      // Hacer stream del mensaje del LLM
      const fullText = await agent.stream(content, (chunk) => {
        socket.emit("stream:chunk", { text: chunk });
      });

      // Guardar en DB y notificar
      const saved = await MessageModel.newLLMMessage(conversationId, "model", fullText);

      socket.emit("stream:end", {
        messageId: saved.id,
        componentCode: saved.componentCode ?? null,
        dependencies: saved.dependencies ?? null,
      });
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Error generando respuesta";
      socket.emit("stream:error", { message: msg });
    }
  });
}