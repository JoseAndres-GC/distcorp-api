import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import orderRoutes from "./routes/orderRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de Distcorp 🧼");
});

app.use("/api/products", productRoutes);
app.use("/api/pedidos", orderRoutes);

export default app;
