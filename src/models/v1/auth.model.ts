import { prisma } from "@/lib/prisma"

export class AuthModel {
  static findUserByEmail = async (email: string) =>{
    return prisma.user.findUnique({
      where: { email }
    });
  }

  static findUserAccountById = async (id: string) => {
    return prisma.account.findUnique({
      where: { userId: id },
    });
  }
  
  static updateRefreshToken = async (id: string, newToken: string) => {
    return prisma.user.update({
      where: { id },
      data: { refreshToken: newToken },
    });
  }
}