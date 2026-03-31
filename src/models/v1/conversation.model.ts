import { prisma } from "@/lib/prisma";

export class ConversationModel {
  static getAllConversations = async () => {
    return await prisma.conversation.findMany();
  }

  static getConversationsByUser = async (id: string) => {
    return await prisma.conversation.findMany({
      where: { userId: id }, 
    });
  }

  static getConversationById = async (id: string) => {
    return await prisma.conversation.findUnique({
      where: { id }, 
    });
  }

  static newConversation = async (id: string, title?: string) => {
    return await prisma.conversation.create({
      data: {
        userId: id,
        title,
      }
    });
  }

  static deleteConversationById = async (id: string) => {
    return await prisma.conversation.delete({
      where: { id },
    });
  }
}