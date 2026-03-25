import { Router } from "express";
import { healthRouter } from "@/routes/health.route";
import { pingRouter } from "@/routes/ping.route";

export const rootRouter = Router();

rootRouter.use('/health', healthRouter);
rootRouter.use('/ping', pingRouter);