import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  priceUnitario: { type: Number, required: true },
  priceCaja: { type: Number, required: true },
  image: String,
  category: String,
});

export default mongoose.model("Product", productSchema);
