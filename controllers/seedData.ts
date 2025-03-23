import Product from "../models/Product";

export const seedProducts = async () => {
  await Product.deleteMany(); // borra los existentes
  await Product.insertMany([
    {
      name: "Lavavajillas Hogar",
      description: "Detergente potente y natural.",
      priceUnitario: 19.99,
      priceCaja: 109.99,
      image: "/images/1.jpg",
      category: "Limpieza",
    },
    {
      name: "Cepillos",
      description: "Cepillos suaves para uso diario.",
      priceUnitario: 5.99,
      priceCaja: 49.99,
      image: "/images/2.jpg",
      category: "Higiene",
    },
  ]);
};
