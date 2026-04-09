import { MessageController } from "@/controllers/v1/message.controller";
import { Router } from "express";

export const messageRoutes = Router();

messageRoutes.get("/:id", MessageController.getMessagesByConversation);
messageRoutes.post("/:id", MessageController.createNewUserMessage);
messageRoutes.delete("/:id", MessageController.deleteMessageById);