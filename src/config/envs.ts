import "dotenv/config";

interface Envs {
  nodeEnv: string;
  port: number;
  databaseUrl: string;
  origin: string;
  jwtSecret: string;
  jwtAccessExpiration?: string;
  jwtRefreshExpiration?: string;
  saltRounds: number;
  encryptionSecret: string;
}

export const envs: Envs = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT!) || 3000,
  databaseUrl: process.env.DATABASE_URL!,
  origin: process.env.ORIGIN || "http://localhost:5173",
  jwtSecret: process.env.JWT_SECRET!,
  jwtAccessExpiration: process.env.JWT_ACCESS_EXPIRATION,
  jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
  saltRounds: parseInt(process.env.SALT_ROUNDS!) || 10,
  encryptionSecret: process.env.ENCRYPTION_SECRET!,
}