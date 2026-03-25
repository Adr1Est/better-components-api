import { Request, Response } from "express";

export class PingController{
  static pong(req: Request, res: Response){
    return res.status(200).send("pong");
  }
}