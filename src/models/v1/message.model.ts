import { Role } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

export class MessageModel {
  static getMessagesByConversation = async (id: string) => {
    return await prisma.message.findMany({
      where: { conversationId: id },
      orderBy: { createdAt: "asc" },
    });
  }

  static newMessage = async (id: string, role: Role, content: string) => {
    return prisma.message.create({
      data: {
        conversationId: id,
        role,
        content,
      }
    });
  }
}