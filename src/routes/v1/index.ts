import { Router } from "express";
import { authRoutes } from "./auth.routes";

export const v1Router = Router();

v1Router.use("/auth", authRoutes);