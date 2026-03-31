import { prisma } from "@/lib/prisma";

export class KeyModel {
  static updateApiKey = async (id: string, apiKey: string | null) => {
    return await prisma.user.update({
      where: { id },
      data: { apiKey },
      select: {
        id: true,
        email: true,
        username: true,
        apiKey: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  }
}