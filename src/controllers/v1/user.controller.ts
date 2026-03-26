import { UserModel } from "@/models/v1/user.model";
import { Request, Response } from "express";

export class UserController {
  static getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await UserModel.allUsers();
      res.status(200).json({ users });
    } catch (error) {
      console.error("Get all users failed: ", error);
      return res.status(500).json({ msg: "Error al obtener los usuarios" });
    }
  }

  static getUserById = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    
    try {
      const user = await UserModel.findUserById(id);

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