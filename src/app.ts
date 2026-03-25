import express from "express";
import cookieParser from "cookie-parser";
import { envs } from "@/config/envs";

const PORT: number = envs.port;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/v1", );

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});