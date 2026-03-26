import { prisma } from "@/lib/prisma";
import { Request, Response } from "express";

export class UserController {
  static getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          username: true,
          createdAt: true,
          updatedAt: true,
        }
      });
      res.status(200).json({ users });
    } catch (error) {
      console.error("Get all users failed: ", error);
      return res.status(500).json({ msg: "Error al obtener los usuarios" });
    }
  }

  static getUserById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          username: true,
          createdAt: true,
          updatedAt: true,
        }
      });

      if(!user){
        return res.status(404).json({ msg: "Usuario no encontrado" });
      }

      return res.status(200).json({ user });
    } catch (error) {
      console.error("Get user by id failed: ", error);
      return res.status(500).json({ msg: "Error al obtener el usuario" });
    }
  }
}