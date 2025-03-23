import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "391Ctr";
const SECRET = process.env.JWT_SECRET || "mi_secreto_super_seguro";

export const loginAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, SECRET, { expiresIn: "1d" });
    res.json({ token });
    return;
  }

  res.status(401).json({ error: "Credenciales incorrectas" });
  console.log("🔐 Login recibido:", req.body);
  console.log("Esperado:", ADMIN_USERNAME, ADMIN_PASSWORD);
};
