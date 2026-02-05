import Order from "../models/order.model.js";
import Invoice from "../models/invoices.model.js";
import Product from "../models/product.model.js";
import Inventory from "../models/inventory.model.js";

export const placeOrder = async (req, res) => {
  try {
    const user = req.user;

    if (!user.cart || user.cart.length === 0)
      return res.status(400).json({ message: "Cart empty" });

    /* ===== UPDATE VARIANT INVENTORY ===== */

    for (const item of user.cart) {

      // IMPORTANT: cart item must contain productId, size, color, quantity

      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      const variant = product.inventory.find(
        v => v.size === item.size && v.color === item.color
      );

      if (!variant || variant.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} (${item.color}/${item.size}) out of stock`
        });
      }

      // Deduct stock
      variant.stock -= item.quantity;

      // Increase sold count
      product.totalSold += item.quantity;

      await product.save();

      // Inventory history log
      await Inventory.create({
        product: product._id,
        size: item.size,
        color: item.color,
        change: -item.quantity,
        updatedBy: "Customer Order",
      });
    }

    /* ===== CREATE ORDER ===== */

    const order = await Order.create({
      user: user._id,
      items: user.cart,
      shipping: req.body.shipping,
      paymentMethod: req.body.payment,
      subtotal: req.body.subtotal,
      shippingCost: req.body.shippingCost,
      gst: req.body.gst,
      discount: req.body.discount,
      total: req.body.total
    });

    /* ===== CLEAR CART ===== */

    user.cart = [];
    await user.save();

    /* ===== CREATE INVOICE ===== */

    await Invoice.create({
      user: req.user._id,
      orderId: order._id,
      amount: order.total,
    });

    res.json({ success: true, order });

  } catch (err) {
    console.log("ORDER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


/* ================= MY ORDERS ================= */

export const getMyOrders = async (req, res) => {
 try {

  const orders = await Order.find({
   user: req.user._id
  }).sort({ createdAt: -1 });

  res.json(orders);

 } catch (err) {
  res.status(500).json({ message: err.message });
 }
};

export const getAllOrders = async (req, res) => {
 try {
  const orders = await Order.find()
   .populate("user", "name email")
   .sort({ createdAt: -1 });

  res.json(orders);

 } catch (err) {
  res.status(500).json({ message: err.message });
 }
};

export const updateOrderStatus = async (req, res) => {
  try {
    console.log("STATUS BODY:", req.body);
    console.log("ORDER ID:", req.params.id);

    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      console.log("ORDER NOT FOUND");
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;

    await order.save();

    res.json({
      success: true,
      status: order.status,
    });

  } catch (error) {

    console.error("UPDATE STATUS ERROR FULL:", error); // 🔥 full error

    res.status(500).json({
      message: error.message,
      stack: error.stack,      // 🔥 important
    });
  }
};
