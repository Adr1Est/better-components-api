import { HealthModel } from "@/models/health.model";
import { Request, Response } from "express";

export class HealthController {
  static healthCheck (req: Request, res: Response){
    res.status(200).json(HealthModel.msg());
  }
}