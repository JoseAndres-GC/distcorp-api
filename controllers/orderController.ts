import Order from "../models/Order";
import { Request, Response } from "express";
import * as XLSX from "xlsx";

export const crearPedido = async (req: Request, res: Response) => {
  try {
    const { productos, vendedor } = req.body;

    const total = productos.reduce((acc: number, prod: any) => {
      const precio =
        prod.tipoPrecio === "unidad" ? prod.precioUnitario : prod.precioPorCaja;
      return acc + prod.cantidad * precio;
    }, 0);

    const nuevoPedido = new Order({
      vendedor,
      productos,
      total,
    });

    await nuevoPedido.save();
    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(500).json({ message: "Error al guardar el pedido", error });
  }
};

export const obtenerPedidos = async (_req: Request, res: Response) => {
  try {
    const pedidos = await Order.find().sort({ createdAt: -1 });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los pedidos", error });
  }
};

export const exportarPedidosExcel = async (_req: Request, res: Response) => {
  try {
    const pedidos = await Order.find().sort({ createdAt: -1 });

    const rows: any[] = [];

    pedidos.forEach((pedido: any) => {
      pedido.productos.forEach((prod: any) => {
        const precio =
          prod.tipoPrecio === "unidad"
            ? prod.precioUnitario
            : prod.precioPorCaja;
        const totalProducto = prod.cantidad * precio;

        rows.push({
          Vendedor: pedido.vendedor,
          Fecha: new Date(pedido.createdAt).toLocaleString(),
          Producto: prod.nombre,
          Cantidad: prod.cantidad,
          "Tipo Precio": prod.tipoPrecio,
          "Precio Unitario": prod.precioUnitario,
          "Precio por Caja": prod.precioPorCaja,
          "Total Producto": totalProducto,
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pedidos");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader("Content-Disposition", "attachment; filename=pedidos.xlsx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ message: "Error al exportar Excel", error });
  }
};
