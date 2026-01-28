import Product from "../models/product.model.js";

/* ================================
   ADD PRODUCT (ADMIN ONLY)
================================ */
// import Product from "../models/Product.model.js";

export const addProduct = async (req, res) => {
  try {
    const images = req.files?.map((file) => `/uploads/${file.filename}`) || [];

    const product = await Product.create({
      ...req.body,
      images,               // store uploaded images here
      createdBy: req.user._id, // admin id
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ================================
   UPDATE PRODUCT (ADMIN ONLY)
================================ */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================================
   DELETE PRODUCT (SOFT DELETE)
================================ */
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, {
      isDeleted: true,
    });

    res.json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ================================
   ADMIN PRODUCT TABLE
================================ */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isDeleted: false,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
