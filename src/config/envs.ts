import "dotenv/config";

interface Envs {
  nodeEnv: string;
  port: number;
  databaseUrl: string;
  origin: string;
}

export const envs: Envs = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT!) || 3000,
  databaseUrl: process.env.DATABASE_URL!,
  origin: process.env.ORIGIN || "http://localhost:5173",
}