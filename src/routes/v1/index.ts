import { Router } from "express";
import { authRoutes } from "@/routes/v1/auth.routes";
import { userRoutes } from "@/routes/v1/user.route";
import { accountRoutes } from "@/routes/v1/account.routes";
import { conversationRoutes } from "@/routes/v1/conversation.routes";
import { keyRouter } from "@/routes/v1/key.routes";
import { AuthMiddleware } from "@/middlewares/auth.middleware";

export const v1Router = Router();

v1Router.use("/auth", authRoutes);
v1Router.use("/user", AuthMiddleware.authenticateUser, userRoutes);
v1Router.use("/account", AuthMiddleware.authenticateUser, accountRoutes);
v1Router.use("/conversation", AuthMiddleware.authenticateUser, conversationRoutes);
v1Router.use("/key", AuthMiddleware.authenticateUser, keyRouter)