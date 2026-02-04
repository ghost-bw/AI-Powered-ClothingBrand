import express from "express";
import { adminLogin } from "../controllers/admin.controller.js";
import  protect  from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

// router.post("/signup", adminSignup);
router.post("/login", adminLogin);



// Example protected admin route
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";

router.get("/dashboard", protect, isAdmin, async (req, res) => {
 try {

  const orders = await Order.find();
  const revenue = orders.reduce((a, o) => a + (o.total || 0), 0);

  const users = await User.countDocuments();
  const products = await Product.countDocuments();
  const categories = await Category.countDocuments();

  res.json({
   revenue,
   orders: orders.length,
   users,
   products,
   categories
  });

 } catch (err) {
  console.log("ADMIN DASHBOARD ERROR:", err.message);
  res.status(500).json({ message: err.message });
 }
});




export default router;
