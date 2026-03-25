import "dotenv/config";

interface Envs {
  nodeEnv: string;
  port: number;
  databaseUrl: string;
  origin: string;
  jwtSecret: string;
  jwtAccessExpiration?: string;
  jwtRefreshExpiration?: string;
}

export const envs: Envs = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT!) || 3000,
  databaseUrl: process.env.DATABASE_URL!,
  origin: process.env.ORIGIN || "http://localhost:5173",
  jwtSecret: process.env.JWT_SECRET!,
  jwtAccessExpiration: process.env.JWT_ACCESS_EXPIRATION,
  jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
}