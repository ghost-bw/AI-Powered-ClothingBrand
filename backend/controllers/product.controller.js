import Product from "../models/product.model.js";

/* ================================
   ADD PRODUCT (ADMIN ONLY)
================================ */
// import Product from "../models/Product.model.js";

import slugify from "slugify";




export const addProduct = async (req,res)=>{

 try{

//  console.log("============== DEBUG START ==============");
//  console.log("RAW BODY:",req.body);
//  console.log("RAW FILES:",req.files);

 const colorsMeta = JSON.parse(req.body.colors || "[]");

//  console.log("COLORS META:",colorsMeta);

 const colors = colorsMeta.map((c,i)=>{

  const imgs = (req.files || [])
   .filter(f=>f.fieldname===`colorImages_${i}`)
   .map(f=>f.path);

  // console.log(`IMAGES FOR COLOR ${i}:`,imgs);

  return {
   name:c.name,
   hex:c.hex,
   images:imgs
  };
 });

//  console.log("FINAL COLORS OBJECT:",colors);

 const price = Number(req.body.price||0);
 const percent = Number(req.body.discountPercent||0);
 const discountPrice = Math.round(price-(price*percent/100));

 const productData = {

  name:req.body.name,
  slug:req.body.name+"-"+Date.now(),
  category:req.body.category,
  description:req.body.description,

  price,
  discountPercent:percent,
  discountPrice,

  stock:req.body.stock,
  sku:req.body.sku,

  sizes:req.body.sizes?JSON.parse(req.body.sizes):[],
  collections:req.body.collections?JSON.parse(req.body.collections):[],
  details:req.body.details?JSON.parse(req.body.details):{},

  colors,

  isTrending:req.body.isTrending==="true",
  isBrandStory:req.body.isBrandStory==="true",

  createdBy:req.user?._id
 };

//  console.log("FINAL PRODUCT DATA BEFORE SAVE:",productData);

 const product = await Product.create(productData);

//  console.log("SAVED PRODUCT:",product);

//  console.log("============== DEBUG END ==============");

 res.json(product);

 }catch(err){

  console.log("ADD PRODUCT ERROR:",err);
  res.status(500).json({message:err.message});

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

    // FIX "null" strings
    if (updateData.discountPrice === "null") delete updateData.discountPrice;
    if (updateData.stock === "null") delete updateData.stock;

    // Replace images only if uploaded
    if (images && images.length > 0) {
      updateData.images = images;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
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
      .populate("category","name")   // 🔥 THIS LINE IS CRITICAL
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
  .populate("category");

 if(!product) return res.status(404).json({message:"Product not found"});

 res.json(product);

 }catch(err){
  res.status(500).json({message:err.message});
 }

};
