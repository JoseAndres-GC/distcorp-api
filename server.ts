import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Cargar variables de entorno desde .env
dotenv.config();

const PORT = process.env.PORT || 4000; // ✅ usa el puerto que asigna Railway
const MONGODB_URI = process.env.MONGODB_URI;

async function startServer() {
  try {
    if (!MONGODB_URI) {
      throw new Error("❌ Falta la variable MONGODB_URI");
    }

    await mongoose.connect(MONGODB_URI);
    console.log("✅ Conectado a MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
}

startServer();
