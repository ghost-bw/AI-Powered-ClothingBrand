import Product from "../models/product.model.js";
import mongoose from "mongoose";
import Collection from "../models/collection.model.js";
/* ================================
   ADD PRODUCT (ADMIN ONLY)
================================ */


import slugify from "slugify";




export const addProduct = async (req, res) => {
  try {

    const colorsMeta = JSON.parse(req.body.colors || "[]");

    const colors = colorsMeta.map((c, i) => {
      const imgs = (req.files || [])
        .filter(f => f.fieldname === `colorImages_${i}`)
        .map(f => f.path);

      return {
        name: c.name,
        hex: c.hex,
        images: imgs,
      };
    });

    const price = Number(req.body.price || 0);
    const percent = Number(req.body.discountPercent || 0);
    const discountPrice = Math.round(price - (price * percent) / 100);

    let collections = [];

    if (req.body.collections) {
      const parsed =
        typeof req.body.collections === "string"
          ? JSON.parse(req.body.collections)
          : req.body.collections;

      collections = parsed.map(id => new mongoose.Types.ObjectId(id));
    }

    const sizes = req.body.sizes ? JSON.parse(req.body.sizes) : [];

    const productData = {
      name: req.body.name,
      slug: req.body.name + "-" + Date.now(),
      category: req.body.category,
      description: req.body.description,

      price,
      discountPercent: percent,
      discountPrice,

      sku: req.body.sku,

      sizes,
      collections,

      details: req.body.details ? JSON.parse(req.body.details) : {},

      colors,

      isTrending: req.body.isTrending === "true",
      isBrandStory: req.body.isBrandStory === "true",

      createdBy: req.user?._id,
    };

    const product = await Product.create(productData);

    /* 🔥 AUTO CREATE INVENTORY VARIANTS */

    product.inventory = [];

    sizes.forEach(size => {
      colors.forEach(c => {
        product.inventory.push({
          size,
          color: c.name,
          stock: 0,
        });
      });
    });

    await product.save();

    res.json(product);

  } catch (err) {
    console.log("ADD PRODUCT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};



/* ================================
   UPDATE PRODUCT (ADMIN ONLY)
================================ */
export const updateProduct = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const images = req.files?.map(file => file.path);

    const updateData = { ...req.body };

    /* ================= PARSE JSON FIELDS ================= */

    if (updateData.colors) {
      updateData.colors = JSON.parse(updateData.colors);
    }

    if (updateData.details) {
      updateData.details = JSON.parse(updateData.details);
    }

    /* ================= FIX STRING NUMBERS ================= */

    if (updateData.price) updateData.price = Number(updateData.price);
    if (updateData.discountPrice) updateData.discountPrice = Number(updateData.discountPrice);
    if (updateData.stock) updateData.stock = Number(updateData.stock);

    /* ================= FIX BOOLEAN STRINGS ================= */

    ["isDeleted", "isActive", "isTrending", "isBrandStory"].forEach(key => {
      if (updateData[key] !== undefined) {
        updateData[key] = updateData[key] === "true";
      }
    });

    /* ================= FIX NULL STRINGS ================= */

    Object.keys(updateData).forEach(key => {
      if (updateData[key] === "null") delete updateData[key];
    });

    /* ================= IMAGES ================= */

   // Replace color images only if uploaded
if (images && images.length > 0 && updateData.colors?.length) {
  updateData.colors[0].images = images;
}


    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      success: true,
      product,
    });

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


/* ================================
   DELETE PRODUCT (SOFT DELETE)
================================ */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    console.log("DELETED PRODUCT:", product);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


/* ================================
   ADMIN PRODUCT TABLE
================================ */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({
      isDeleted: false,
    })
       
      .populate("category","name")
      .populate("collections","name") // 🔥 THIS LINE IS CRITICAL
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get sngleProduct
export const getSingleProduct = async (req,res)=>{

 try{

 const product = await Product.findById(req.params.id)
    .populate("category")
.populate("collections","name");


 if(!product) return res.status(404).json({message:"Product not found"});

 res.json(product);

 }catch(err){
  res.status(500).json({message:err.message});
 }

};


export const getProducts = async (req, res) => {
  try {
    let filter = { isDeleted: false };

    if (req.query.collection) {
      const collection = await Collection.findOne({
        slug: req.query.collection.toLowerCase()
      });

      console.log("FOUND COLLECTION:", collection);

      if (collection) {
        filter.collections = collection._id;
      }
    }

    console.log("FINAL FILTER:", filter);

    const products = await Product.find(filter)
      .populate("category", "name")
      .populate("collections", "name slug");

    res.json(products);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};



