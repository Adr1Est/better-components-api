import { MessageController } from "@/controllers/v1/message.controller";
import { Router } from "express";

export const messageRouter = Router();

messageRouter.get("/:id", MessageController.getMessagesByConversation);
messageRouter.post("/:id", MessageController.createNewUserMessage);
messageRouter.delete("/:id", MessageController.deleteMessageById);