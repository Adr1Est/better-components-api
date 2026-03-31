import { KeyController } from "@/controllers/v1/key.controller";
import { Router } from "express";

export const keyRouter = Router();

keyRouter.get("/:id", KeyController.getApiKeyByUser);
keyRouter.put("/:id", KeyController.saveApiKey);