import { decrypt } from "@/lib/apiKey.utils";
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
    const user =  await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        apiKey: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    if(user?.apiKey){
      user.apiKey = decrypt(user.apiKey);
    }

    return user;
  }

  static deleteUserById = async (id: string) => {
    return await prisma.user.delete({
      where: { id }
    });
  }
}