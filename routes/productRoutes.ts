import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { seedProducts } from "../controllers/seedData";
import { authMiddleware } from "../middlewares/authMiddleware"; // ✅ named import

const router = express.Router();

router.get("/seed", async (_req, res) => {
  try {
    await seedProducts();
    res.json({ message: "Productos creados correctamente!" });
  } catch (error) {
    res.status(500).json({ error: "Error al cargar productos" });
  }
});

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", authMiddleware, createProduct);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
