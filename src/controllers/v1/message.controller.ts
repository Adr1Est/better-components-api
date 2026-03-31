import { ConversationModel } from "@/models/v1/conversation.model";
import { MessageModel } from "@/models/v1/message.model";
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
    const id = req.params.id as string;
    const role = "user";
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ msg: "El contenido del mensaje es obligatorio" });
    }

    try {
      const conversation = await ConversationModel.getConversationById(id);
      if(!conversation){
        return res.status(404).json({ msg: "Conversación no encontrada" });
      }

      const message = await MessageModel.newMessage(id, role, content);
      return res.status(201).json({ message });
    } catch (error) {
      console.error("Create user message failed: ", error);
      return res.status(500).json({ msg: "Error al crear el mensaje" });
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