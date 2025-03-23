import { Request, Response } from "express";
import Product from "../models/Product";

export const getAllProducts = async (_req: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ error: "Producto no encontrado" });
      return;
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar producto" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const newProduct = new Product(req.body);
  const saved = await newProduct.save();
  res.status(201).json(saved);
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const data = req.body;

  const updated = await Product.findByIdAndUpdate(id, data, { new: true });
  if (!updated) {
    res.status(404).json({ error: "Producto no encontrado" });
    return;
  }

  res.json(updated);
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) {
    res.status(404).json({ error: "Producto no encontrado" });
    return;
  }
  res.json({ message: "Producto eliminado" });
};
