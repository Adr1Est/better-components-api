import { UserController } from "@/controllers/v1/user.controller";
import { Router } from "express";

export const userRoutes = Router();

userRoutes.get("/", UserController.getAllUsers);
userRoutes.get("/:id", UserController.getUserById);