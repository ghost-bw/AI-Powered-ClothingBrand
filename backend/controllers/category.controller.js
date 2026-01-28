import Category from "../models/category.model.js";
import slugify from "slugify";

/* CREATE CATEGORY (ADMIN) */
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const normalizedName = name.trim();

    const exists = await Category.findOne({
      name: new RegExp(`^${normalizedName}$`, "i")
    });

    if (exists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({
      name: normalizedName,
      slug: slugify(normalizedName, { lower: true, strict: true })
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET ALL CATEGORIES */
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* DELETE CATEGORY (SOFT DELETE) */
export const deleteCategory = async (req, res) => {
  await Category.findByIdAndUpdate(req.params.id, { isActive: false });
  res.json({ message: "Category deleted" });
};