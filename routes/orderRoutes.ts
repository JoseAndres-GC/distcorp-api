import express from "express";
import {
  crearPedido,
  obtenerPedidos,
  exportarPedidosExcel,
} from "../controllers/orderController";

const router = express.Router();

router.post("/", crearPedido);
router.get("/", obtenerPedidos);
router.get("/excel", exportarPedidosExcel);

export default router;
