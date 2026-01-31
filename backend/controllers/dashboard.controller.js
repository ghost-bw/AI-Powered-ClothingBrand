import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Category from "../models/category.model.js";

/* ================= DASHBOARD STATS ================= */

export const getDashboardStats = async (req, res) => {
  console.log("🔥 ADMIN DASHBOARD API HIT");

  try {
    const totalSales = await Order.aggregate([
      { $group: { _id: null, revenue: { $sum: "$totalAmount" } } },
    ]);

    const products = await Product.countDocuments({ isDeleted: false });
    const users = await User.countDocuments();
    const categories = await Category.countDocuments();
    const orders = await Order.countDocuments();

    const outOfStock = await Product.countDocuments({ stock: 0, isDeleted: false });
    const liveProducts = await Product.countDocuments({ isActive: true, isDeleted: false });

    res.json({
      success: true,
      revenue: totalSales[0]?.revenue || 0,
      products,
      users,
      categories,
      orders,
      outOfStock,
      liveProducts,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= MONTHLY REVENUE ================= */

export const getMonthlyRevenue = async (req, res) => {
  try {
    const data = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= CATEGORY SALES ================= */

export const getCategorySales = async (req, res) => {
  try {
    const data = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.category",
          sales: { $sum: "$items.price" },
        },
      },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
