import { Product } from "../modules/product.js";

export const productController = {
  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ message: "ID is required" });

      const product = await Product.findById(id);

      if (!product)
        return res.status(404).json({ message: "Product not found" });

      res.json(product);
    } catch (err) {
      next(err);
    }
  },
  findAll: async (req, res, next) => {
    try {
      const allProducts = await Product.find().populate("category_id");

      if (allProducts.length === 0)
        return res.status(404).json({ message: "Products not found" });

      res.json(allProducts);
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      
      const { name, price, description, stock, category_id } = req.body;

      if (!name || !price || !description || !stock || !category_id)
        return res.status(400).json({ message: "All data is required" });

      const newProduct = new Product({
        name,
        price,
        description,
        stock,
        category_id,
      });

      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ message: "ID is required" });

      const { name, price, description, stock, category_id } = req.body;

      if (!name && !price && !description && !stock && !category_id)
        return res
          .status(400)
          .json({ message: "At least one data is required" });

      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          name,
          price,
          description,
          stock,
          category_id,
        },
        { new: true }
      );

      if (!updatedProduct)
        return res.status(404).json({ message: "Product not found" });

      res.json({ message: "Product successfully updated" });
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ message: "ID is required" });

      const product = await Product.findByIdAndDelete(id);

      if (!product)
        return res.status(404).json({ message: "Product not found" });

      res.json({ message: "Product successfully deleted" });
    } catch (err) {
      next(err);
    }
  },
};
