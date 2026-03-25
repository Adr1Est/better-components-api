import { AuthController } from "@/controllers/v1/auth.controller";
import { Router } from "express";

export const authRoutes = Router();

authRoutes.post("/login", AuthController.login);
authRoutes.post("/register", AuthController.register);