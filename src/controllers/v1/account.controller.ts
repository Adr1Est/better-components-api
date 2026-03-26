import { AccountModel } from "@/models/v1/account.model";
import { Request, Response } from "express";

export class AccountController {
  static getAllAccounts = async (req: Request, res: Response) => {
    try {
      const accounts = await AccountModel.getAllAccounts();
      return res.status(200).json({ accounts });
    } catch (error) {
      console.error("Get all accounts failed: ", error);
      return res.status(500).json({ msg: "Error al obtener las cuentas" });
    } 
  }

  static getAccountsByUserId = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    try {
      const account = await AccountModel.findAccountsByUserId(id);
      if(!account){
        return res.status(404).json({ msg: "Registro no encontrado" });
      }
      return res.status(200).json({ account });
    } catch (error) {
      console.error("Get account by id failed: ", error);
      return res.status(500).json({ msg: "Error al obtener la cuenta" });
    } 
  }
}