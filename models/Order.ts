import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    vendedor: { type: String, required: true },
    productos: [
      {
        nombre: String,
        cantidad: Number,
        precioUnitario: Number,
        precioPorCaja: Number,
        tipoPrecio: String, // "unidad" o "caja"
      },
    ],
    total: { type: Number, required: true }, // ✅ nuevo campo agregado
    fecha: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
