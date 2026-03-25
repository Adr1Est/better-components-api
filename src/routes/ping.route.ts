import { PingController } from "@/controllers/ping.controller";
import { Router } from "express";

export const pingRouter = Router();

pingRouter.get('/', PingController.pong);