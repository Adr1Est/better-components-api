import { AuthController } from "@/controllers/v1/auth.controller";
import { AuthMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";

export const authRoutes = Router();

authRoutes.post("/login", AuthController.login);
authRoutes.post("/register", AuthController.register);
authRoutes.post("/logout", AuthMiddleware.authenticateUser, AuthController.logout);
authRoutes.post("/refresh", AuthMiddleware.refreshTokenValidation, AuthController.refreshAccessToken);