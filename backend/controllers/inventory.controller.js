import Product from "../models/product.model.js";
import Inventory from "../models/inventory.model.js";

/* GET FULL INVENTORY */

export const getAllInventory = async (req, res) => {
  const products = await Product.find({ isDeleted: false })
  .populate("collections", "name")
  .select("name sku inventory sizes colors gender collections");

  res.json(products);
};

/* UPDATE VARIANT STOCK */

export const updateInventory = async (req, res) => {
  const { productId, size, color, quantity } = req.body;

  const product = await Product.findById(productId);

  let variant = product.inventory.find(
    v => v.size === size && v.color === color
  );

  if (!variant) {
    product.inventory.push({ size, color, stock: quantity });
  } else {
    variant.stock += Number(quantity);
  }

  await product.save();

console.log("LOGGING HISTORY:", size, color, quantity);

 await Inventory.create({
  product: productId,
  size,
  color,
  change: Number(quantity),
  updatedBy: req.user?.name || "Admin",
});


  res.json({ success: true });
};

/* HISTORY */

export const getInventoryHistory = async (req, res) => {
  const history = await Inventory.find()
    .populate("product", "name")
    .sort({ createdAt: -1 })
    .limit(100);

  res.json(history);
};

export const undoLastInventory = async (req, res) => {
  try {
    const { productId, size, color } = req.body;

    const last = await Inventory.findOne({
      product: productId,
      size,
      color,
    }).sort({ createdAt: -1 });

    if (!last) {
      return res.status(404).json({ message: "No history found" });
    }

    const product = await Product.findById(productId);

    const variant = product.inventory.find(
      v => v.size === size && v.color === color
    );

    if (!variant) {
      return res.status(404).json({ message: "Variant not found" });
    }

    // Reverse stock
    variant.stock -= last.change;

    await product.save();

    // Log undo
    await Inventory.create({
      product: productId,
      size,
      color,
      change: -last.change,
      updatedBy: "Undo",
    });

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
