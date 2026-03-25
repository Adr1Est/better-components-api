import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { envs } from "@/config/envs";

interface DecodedToken {
  userId: string;
}

export class AuthMiddleware {
  static authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if(!token){
      return res.status(401).json({ msg: "Operación no autorizada" });
    }

    try {
      const decodedToken = jwt.verify(token, envs.jwtSecret) as DecodedToken;
      (req as any).userId = decodedToken.userId;
      next();
    } catch (error) {
      console.error("Authetication failed: ", error);
      return res.status(401).json({ msg: "Operación no autorizada" });
    }
  }

  static refreshTokenValidation = (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies["bettercomps_rt"];
    if(!refreshToken){
      return res.status(401).json({ msg: "Operación no autorizada" });
    }

    try {
      const decodedToken = jwt.verify(refreshToken, envs.jwtSecret) as DecodedToken;
      (req as any).userId = decodedToken.userId;
      next();
    } catch (error) {
      console.error("Refresh Token authenticacion failed: ", error);
      return res.status(401).json({ msg: "Operación no autorizada" });
    }
  }
}