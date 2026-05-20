import express from "express";
import cookieParser from "cookie-parser";
import { corsMiddleware } from "@/middlewares/cors.middleware";
import { envs } from "@/config/envs";
import { rootRouter } from "@/routes";
import { v1Router } from "@/routes/v1";
import  { expressAnalytics } from "node-api-analytics";

const PORT: number = envs.port;
const app = express();

// MIDDLEWARES
app.use(expressAnalytics(envs.apiAnalyticsKey));
app.use(express.json());
app.use(cookieParser());
app.use(corsMiddleware());

// ROUTES
app.use("/", rootRouter)
app.use("/v1", v1Router);

export default app;