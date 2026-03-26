import { Router } from "express";
import { authRoutes } from "@/routes/v1/auth.routes";
import { userRoutes } from "@/routes/v1/user.route";
import { accountRoutes } from "@/routes/v1/account.routes";
import { conversationRoutes } from "@/routes/v1/conversation.routes";
import { AuthMiddleware } from "@/middlewares/auth.middleware";

export const v1Router = Router();

v1Router.use("/auth", authRoutes);
v1Router.use("/user", userRoutes);
v1Router.use("/account", accountRoutes);
v1Router.use("/conversation", conversationRoutes);