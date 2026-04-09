import { Role } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

export class MessageModel {
  static getMessagesByConversation = async (id: string) => {
    return await prisma.message.findMany({
      where: { conversationId: id },
      orderBy: { createdAt: "asc" },
    });
  }

  static newMessage = async (
    id: string, 
    role: Role, 
    content: string,
    componentCode?: string,
    dependencies?: object,
  ) => {
    return prisma.message.create({
      data: {
        conversationId: id,
        role,
        content,
        componentCode,
        dependencies,
      }
    });
  }

  static newLLMMessage = async (
    id: string, 
    role: Role, 
    content: string,
  ) => {
    const json = JSON.parse(content);
    return prisma.message.create({
      data: {
        conversationId: id,
        role,
        content: json.content,
        componentCode: json.componentCode,
        dependencies: json.dependencies,
      }
    });
  }

  static getMessageById = async (id: string) => {
    return await prisma.message.findUnique({
      where: { id },
    });
  }

  static deleteMessageById = async (id: string) => {
    return await prisma.message.delete({
      where: { id },
    });
  }
}