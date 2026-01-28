// src/controllers/dashboard.controller.js
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

/* TOP STATS */
export const getDashboardStats = async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, revenue: { $sum: "$totalAmount" } } },
  ]);

  const outOfStock = await Product.countDocuments({ stock: 0 });
  const liveProducts = await Product.countDocuments({ isActive: true });

  res.json({
    totalSales: totalSales[0]?.revenue || 0,
    outOfStock,
    liveProducts,
  });
};

/* MONTHLY REVENUE */
export const getMonthlyRevenue = async (req, res) => {
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
};

/* CATEGORY SALES */
export const getCategorySales = async (req, res) => {
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
};
