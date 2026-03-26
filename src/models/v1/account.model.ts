import { prisma } from "@/lib/prisma";

export class AccountModel {
  static getAllAccounts = async () => {
    return prisma.account.findMany({
      select: {
        id: true,
        userId: true,
        user: {
          select: {
            email: true,
            username: true,
          }
        },
        provider: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  }

  static findAccountsByUserId = async (id: string) => {
    return prisma.account.findUnique({
      select: {
        id: true,
        userId: true,
        user: {
          select: {
            email: true,
            username: true,
          }
        },
        provider: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { userId: id },
    });
  }
}