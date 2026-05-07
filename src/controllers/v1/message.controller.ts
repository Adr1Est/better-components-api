import { GeminiAgent } from "@/lib/agent";
import { ConversationModel } from "@/models/v1/conversation.model";
import { MessageModel } from "@/models/v1/message.model";
import { UserModel } from "@/models/v1/user.model";
import { Request, Response } from "express";

export class MessageController {
  static getMessagesByConversation = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    try {
      const conversation = await ConversationModel.getConversationById(id);
      if(!conversation){
        return res.status(404).json({ msg: "Conversación no encontrada" });
      }

      const messages = await MessageModel.getMessagesByConversation(id);
      return res.status(200).json({ messages });
    } catch (error) {
      console.error("Get messages by conversation failed: ", error);
      return res.status(500).json({ msg: "Error al obtener los mensajes" });
    }
  }

  static createNewUserMessage = async (req: Request, res: Response) => {
    const conversationId = req.params.id as string;
    const { content, model } = req.body;

    if (!content || !model) {
      return res.status(400).json({ msg: "El contenido del mensaje es obligatorio" });
    }

    try {
      // Validar conversación
      const conversation = await ConversationModel.getConversationById(conversationId);
      if(!conversation){
        return res.status(404).json({ msg: "Conversación no encontrada" });
      }

      // Recuperar API KEY
      const userId = (req as any).userId;
      const user = await UserModel.findUserById(userId);
      if(!user){
        return res.status(404).json({ msg: "El usuario no existe" });
      }

      const apiKey = user.apiKey;

      // Guardar mensaje del usuario en BD
      const userMessage = await MessageModel.newMessage(conversationId, "user", content);

      // Obtener y dar formato al historial del chat para usarlo en el agente
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

      // Crear agente
      const agent = new GeminiAgent(chatHistory, apiKey!, model);

      // Llamar a Gemini
      const responseText = await agent.send(content);

      // Guardar respuesta del llm
      const modelMessage = await MessageModel.newLLMMessage(conversationId, "model", responseText!);

      // Respuesta del servidor
      return res.status(201).json({
        userMessage,
        modelMessage,
      });

    } catch (error) {
      console.error("Create message with AI failed: ", error);

      const status = error?.status ?? 500;

      const messages: Record<number, string> = {
        503: "El LLM está experimentando alta demanda. Inténtalo de nuevo más tarde.",
        429: "Has superado el límite de peticiones. Espera un momento.",
        401: "API Key inválida o sin permisos.",
      };

      const msg = messages[status] ?? "Error al procesar el mensaje";

      return res.status(status).json({ msg });
    }
  }

  static deleteMessageById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    
    try {
      const exists = await MessageModel.getMessageById(id);
      if(!exists){
        return res.status(404).json({ msg: "El mensaje no existe" });
      }

      const message = await MessageModel.deleteMessageById(id);

      return res.status(200).json({
        id: message.id,
        msg: "Mensaje borrado con éxito",
      });
    } catch (error) {
      console.error("Error deleting message: ", error);
      return res.status(500).json({ msg: "Error interno del servidor" });
    }
  }
}