import { prisma } from "@/lib/prisma"

export class AuthModel {
  static findUserByEmail = async (email: string) =>{
    return await prisma.user.findUnique({
      where: { email }
    });
  }

  static findUserAccountById = async (id: string) => {
    return await prisma.account.findUnique({
      where: { userId: id },
    });
  }

  static createUser = async(email: string, username: string) => {
    return await prisma.user.create({
      data: {
        email,
        username,
      }
    });
  }

  static createCredentialsUserAccount = async (userId: string, passwordHash: string) => {
    return await prisma.account.create({
      data: {
        userId,
        provider: "credentials",
        passwordHash,
      }
    })
  }
  
  static updateRefreshToken = async (id: string, newToken: string) => {
    return await prisma.user.update({
      where: { id },
      data: { refreshToken: newToken },
    });
  }
}