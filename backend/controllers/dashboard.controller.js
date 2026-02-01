import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Category from "../models/category.model.js";

/* ================= DASHBOARD STATS ================= */

export const getDashboardStats = async (req, res) => {
  try {
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          revenue: { $sum: "$total" }
        }
      }
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
      liveProducts
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
          revenue: { $sum: "$total" }
        }
      },
      { $sort: { _id: 1 } }
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
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "product",
        },
      },

      { $unwind: "$product" },

      {
        $lookup: {
          from: "categories",
          localField: "product.category",
          foreignField: "_id",
          as: "category",
        },
      },

      { $unwind: "$category" },

      {
        $group: {
          _id: "$category.name",
          sales: {
            $sum: {
              $multiply: ["$items.price", "$items.quantity"],
            },
          },
        },
      },

      { $sort: { sales: -1 } },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= REGIONAL DEMAND ================= */

export const getRegionalDemand = async (req, res) => {
  try {
    const regions = await Order.aggregate([
      {
        $group: {
          _id: "$shipping.city",
          count: { $sum: 1 }
        }
      }
    ]);

    const total = regions.reduce((a, b) => a + b.count, 0);

    res.json(
      regions.map(r => ({
        region: r._id || "Unknown",
        percent: Math.round((r.count / total) * 100),
      }))
    );

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




/* ================= RECENT HIGH VALUE ORDERS ================= */

export const getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ total: -1 })        // FIXED
      .limit(5)
      .populate("user", "name")
      .select("total status createdAt");   // FIXED

    res.json(
      orders.map(o => ({
        _id: o._id,
        customer: o.user?.name || "Guest",
        product: "Multiple Items",
        amount: o.total,          // FIXED
        status: o.status,
        createdAt: o.createdAt,
      }))
    );

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const exportAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .select("shipping total status createdAt");

    res.json(
      orders.map(o => ({
        OrderID: o._id,
        Customer: o.shipping?.fullName || "Guest",
        City: o.shipping?.city || "Unknown",
        Total: o.total,
        Status: o.status,
        Date: o.createdAt,
      }))
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTopProducts = async (req, res) => {
  try {
    const data = await Order.aggregate([
      { $unwind: "$items" },

      {
        $group: {
          _id: "$items.product",
          totalSold: { $sum: "$items.quantity" },
        },
      },

      { $sort: { totalSold: -1 } },
      { $limit: 5 },

      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },

      { $unwind: "$product" },

      {
        $project: {
          name: "$product.name",
          stock: "$product.stock",
          orders: "$totalSold",
        },
      },
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
