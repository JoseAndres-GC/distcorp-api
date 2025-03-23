import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const loginAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, password } = req.body;

  const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  const SECRET = process.env.JWT_SECRET;

  if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !SECRET) {
    console.error("❌ Faltan variables de entorno");
    res.status(500).json({ error: "Error de configuración del servidor" });
    return;
  }

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: "admin" }, SECRET, { expiresIn: "1d" });
    res.json({ token });
    return;
  }

  res.status(401).json({ error: "Credenciales incorrectas" });
};
