import { Router } from "express";
import { healthRouter } from "@/routes/health.route";

export const rootRouter = Router();

rootRouter.use('/health', healthRouter);