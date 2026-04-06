import { ConversationModel } from "@/models/v1/conversation.model";
import { UserModel } from "@/models/v1/user.model";
import { Request, Response } from "express";

export class ConversationController {
  static getAllConversations = async (req: Request, res: Response) => {
    try {
      const conversations = await ConversationModel.getAllConversations();
      return res.status(200).json({ conversations }); 
    } catch (error) {
      console.error("Get all conversations failed: ", error);
      return res.status(500).json({ msg: "Error al obtener las conversaciones" });
    }
  }

  static getConversationsByUser = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    try {
      const user = await UserModel.findUserById(id);
      if(!user){
        return res.status(404).json({ msg: "Usuario no encontrado" });
      }

      const userConversations = await ConversationModel.getConversationsByUser(id);
      return res.status(200).json({ conversations: userConversations });
    } catch (error) {
      console.error("Get user conversations failed: ", error);
      return res.status(500).json({ msg: "Error al obtener las conversaciones del usuario" });
    }
  }

  static createConversation = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const { title } = req.body;
    try {
      const user = await UserModel.findUserById(id);
      if(!user){
        return res.status(404).json({ msg: "Usuario no encontrado" });
      }

      const conversation = await ConversationModel.newConversation(id, title);
      return res.status(201).json({ msg: "Nuevo chat creado", conversation });
    } catch (error) {
      console.error("Create conversation failed: ", error);
      return res.status(500).json({ msg: "Error al crear la conversación" });
    }
  }

  static deleteConversationById = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    try {
      const exists = await ConversationModel.getConversationById(id);
      if (!exists) {
        return res.status(404).json({ msg: "El chat no existe" });
      }

      const conversation = await ConversationModel.deleteConversationById(id);

      return res.status(200).json({ 
        msg: "Chat borrado con éxito", 
        title: conversation.title 
      });
    } catch (error) {
      console.error("Error deleting chat: ", error);
      return res.status(500).json({ msg: "Error interno del servidor" });
    }
  }

  static changeTitle = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const { title: newTitle }= req.body;

    if(!newTitle){
      return res.status(400).json({ msg: "Faltan datos obligatorios" });
    }

    try {
      const exist = await ConversationModel.getConversationById(id);
      if(!exist){
        return res.status(404).json({ msg: "El chat no existe" });
      }

      const chat = await ConversationModel.changeTitle(id, newTitle);
      return res.status(200).json({ chat });
    } catch (error) {
      console.error("Error changing chat title: ", error);
      return res.status(500).json({ msg: "Error interno del servidor" });
    }
  }
}