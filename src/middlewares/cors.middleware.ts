import cors from "cors";
import { envs } from "@/config/envs";

const ACCEPTED_ORIGINS = envs.nodeEnv === 'production'
  ? [envs.origin]
  : ['http://localhost:3000', envs.origin];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
  return cors ({
    origin: (origin, callback) => {
      if(!origin){
        return callback(null, true);
      }

      if(acceptedOrigins.includes(origin)){
        return callback(null, true);
      }

      return callback(new Error("Origen no permitido"));
    },
    credentials: true,
  });
}