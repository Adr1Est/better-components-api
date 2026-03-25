import { envs } from "@/config/envs";
import jwt, { SignOptions } from 'jsonwebtoken';

const generateAccessToken = (userId: string) => {
  return jwt.sign(
    { userId: userId },
    envs.jwtSecret!,
    { expiresIn: envs.jwtAccessExpiration as SignOptions['expiresIn'] } 
  )
}

const generateRefreshToken = (userId: string) => {
  return jwt.sign(
    { userId: userId },
    envs.jwtSecret!,
    { expiresIn: envs.jwtRefreshExpiration as SignOptions['expiresIn'] } 
  )
}

export {
  generateAccessToken,
  generateRefreshToken,
}