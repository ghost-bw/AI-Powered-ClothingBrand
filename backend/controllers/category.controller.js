import Category from "../models/category.model.js";
import slugify from "slugify";

export const createCategory = async (req, res) => {
  const { name } = req.body;

  const exists = await Category.findOne({ name });
  if (exists) {
    return res.status(400).json({ message: "Category already exists" });
  }

  const category = await Category.create({
    name,
    slug: slugify(name)
  });

  res.status(201).json(category);
};

export const getAllCategories = async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json(categories);
};
