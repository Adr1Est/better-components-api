import { Router } from "express";
import { healthRouter } from "@/routes/v1/health.route";

export const v1Router = Router();

v1Router.use('/health', healthRouter);