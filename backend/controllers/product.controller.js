import slugify from "slugify";
import Product from "../models/product.model.js";




export const createProduct = async (req, res) => {
  try {
    const { name, description, price, discountPrice, category, sizes, colors, stock } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Images are required" });
    }

    const images = req.files.map(file => file.path);

    const product = await Product.create({
      name,
      slug: slugify(name),
      description,
      price,
      discountPrice,
      category,
      sizes,
      colors,
      stock,
      images
    });
console.log("REQ.BODY:", req.body);
console.log("REQ.FILES:", JSON.stringify(req.files, null, 2));

    res.status(201).json({ product, images });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



export const getProducts = async (req, res) => {
  try {
    const {
      keyword,
      category,
      minPrice,
      maxPrice,
      sort
    } = req.query;

    let filter = {};

    // 🔍 Search
    if (keyword) {
      filter.$text = { $search: keyword };
    }

    // 📦 Category
    if (category) {
      filter.category = category;
    }

    // 💰 Price
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let query = Product.find(filter).populate("category");

    // 🔃 Sorting
    if (sort === "price_low") query.sort({ price: 1 });
    if (sort === "price_high") query.sort({ price: -1 });
    if (sort === "newest") query.sort({ createdAt: -1 });

    const products = await query;
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
