import { AccountController } from "@/controllers/v1/account.controller";
import { Router } from "express";

export const accountRoutes = Router();

accountRoutes.get("/", AccountController.getAllAccounts);
accountRoutes.get("/:id", AccountController.getAccountById);