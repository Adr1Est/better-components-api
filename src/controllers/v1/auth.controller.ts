import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt.utils";
import { envs } from "@/config/envs";
import { AuthModel } from "@/models/v1/auth.model";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class AuthController {
  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if(!email || !password){
      return res.status(400).json({ msg: "Faltan datos obligatorios" });
    }

    if(!EMAIL_REGEX.test(email)){
      return res.status(400).json({ msg: "El email no es válido" });
    }

    try {
      const user = await AuthModel.findUserByEmail(email);
      if(!user){
        return res.status(404).json({ msg: "El usuario no existe" });
      }

      const userAccount = await AuthModel.findCredentialsAccountById(user.id);
      if(!userAccount){
        return res.status(400).json({ msg: "El usuario inició sesión con un servicio de terceros" });
      }

      const isPasswordValid = await bcrypt.compare(password, userAccount?.passwordHash!);
      if(!isPasswordValid){
        return res.status(401).json({ msg: "Credenciales inválidas" });
      }

      const accessToken = generateAccessToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      await AuthModel.updateRefreshToken(user.id, refreshToken);

      res.cookie("bettercomps-rt", refreshToken, {
        httpOnly: true,
        secure: envs.nodeEnv === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });

      return res.status(200).json({
        msg: "Inicio de sesión correcto",
        email: user.email,
        accessToken,
      });

    } catch (error) {
      console.error("Login Failed: ", error);
      return res.status(500).json({ msg: "Error al iniciar sesión" });
    }
  };

  static register = async (req: Request, res: Response) => {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ msg: "Faltan datos obligatorios" });
    }
    if(!EMAIL_REGEX.test(email)){
      return res.status(400).json({ msg: "El email no es válido" });
    }
    if (username.trim().length < 3) {
      return res.status(400).json({ msg: "El username debe tener al menos 3 caracteres" });
    }
    if (password.length < 6) {
      return res.status(400).json({ msg: "La contraseña debe tener al menos 6 caracteres" });
    }

    try {

      const existingUser = await AuthModel.findUserByEmail(email);
      if(existingUser){
        return res.status(409).json({ msg: "El email ya está registrado" });
      }

      const hashedPassword = await bcrypt.hash(password, envs.saltRounds!);

      const newUser = await AuthModel.createUser(email, username);
      await AuthModel.createCredentialsUserAccount(newUser.id, hashedPassword);

      return res.status(201).json({
        msg: "Usuario registrado con formulario",
        email: newUser.email,
      });

    } catch (error) {
      console.error("Registration Failed: ", error);
      return res.status(500).json({ msg: "Registro fallido" });
    }
  }
}