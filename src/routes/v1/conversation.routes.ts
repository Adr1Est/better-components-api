import { ConversationController } from "@/controllers/v1/conversation.controller";
import { Router } from "express";

export const conversationRoutes = Router();

conversationRoutes.get("/", ConversationController.getAllConversations);
conversationRoutes.get("/:id", ConversationController.getConversationsByUser);
conversationRoutes.get("/:id/messages", ConversationController.getConversationMessages);
conversationRoutes.post("/:id", ConversationController.createConversation);
conversationRoutes.put("/:id", ConversationController.changeTitle);
conversationRoutes.delete("/:id", ConversationController.deleteConversationById);