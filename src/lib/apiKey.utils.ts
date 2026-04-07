import { envs } from "@/config/envs";
import crypto from "crypto";

const SECRET = envs.encryptionSecret;

export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(SECRET, "hex"), iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
};

export const decrypt = (cipherText: string): string => {
  const [iv, encrypted] = cipherText.split(":");
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(SECRET, "hex"), Buffer.from(iv, "hex"));
  const decrypted = Buffer.concat([decipher.update(Buffer.from(encrypted, "hex")), decipher.final()]);
  return decrypted.toString();
};