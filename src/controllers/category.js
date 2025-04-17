import { Category } from "../modules/category.js";

export const categoryController = {
  create: async (req, res, next) => {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: "Category name is required" });
      }

      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(409).json({ message: "Category already exists" });
      }

      const newCategory = new Category({ name });
      const savedCategory = await newCategory.save();

      res.status(201).json(savedCategory);
    } catch (err) {
      next(err);
    }
  },

  findAll: async (req, res, next) => {
    try {
      const categories = await Category.find();

      if (categories.length === 0) {
        return res.status(404).json({ message: "No categories found" });
      }

      res.json(categories);
    } catch (err) {
      next(err);
    }
  },

  findOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Category ID is required" });
      }

      const category = await Category.findById(id);

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.json(category);
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Category ID is required" });
      }

      if (!name) {
        return res.status(400).json({ message: "Category name is required" });
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.json({ message: "Category successfully updated", updatedCategory });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Category ID is required" });
      }

      const deletedCategory = await Category.findByIdAndDelete(id);

      if (!deletedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.json({ message: "Category successfully deleted" });
    } catch (err) {
      next(err);
    }
  },
};
