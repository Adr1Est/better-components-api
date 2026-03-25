import express from "express";
import cookieParser from "cookie-parser";
import { corsMiddleware } from "@/middlewares/cors.middleware";
import { envs } from "@/config/envs";
import { rootRouter } from "@/routes";
import { v1Router } from "@/routes/v1";

const PORT: number = envs.port;
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(corsMiddleware());

// ROUTES
app.use("/", rootRouter)
app.use("/v1", v1Router);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});