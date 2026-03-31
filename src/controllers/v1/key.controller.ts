import { Prisma } from "@/generated/prisma/client";
import { KeyModel } from "@/models/v1/key.model";
import { UserModel } from "@/models/v1/user.model";
import { Request, Response } from "express";

export class KeyController {
  static getApiKeyByUser = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    try {
      const user = await UserModel.findUserById(id);
      if(!user){
        return res.status(404).json({ msg: "El usuario no existe" });
      }

      return res.status(200).json({ user });
    } catch (error) {
      console.error("Error getting api key: ", error);
      return res.status(500).json({ msg: "Error interno del servidor" });
    }
  }

  static saveApiKey = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const { apiKey } = req.body;
    if(apiKey === undefined){
      return res.status(400).json({ msg: "Falta la Api Key"});
    }

    try {
      const user = await KeyModel.updateApiKey(id, apiKey);
      if(!user){
        return res.status(404).json({ msg: "El usuario no existe" });
      }

      return res.status(200).json({ user });
    } catch (error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025"){
        return res.status(404).json({ msg: "El usuario no existe" });
      }

      console.error("Error saving api key: ", error);
      return res.status(500).json({ msg: "Error interno del servidor" });
    }
  }
}