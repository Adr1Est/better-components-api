import { prisma } from "@/lib/prisma";

export class UserModel {
  static allUsers = async () => {
    return await prisma.user.findMany({
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

  static findUserById = async (id: string) => {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  }
}