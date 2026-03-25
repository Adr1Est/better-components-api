import "dotenv/config";

interface Envs {
  port: number,
  databaseUrl: string,
}

export const envs: Envs = {
  port: parseInt(process.env.PORT!) || 3000,
  databaseUrl: process.env.DATABASE_URL!,
}