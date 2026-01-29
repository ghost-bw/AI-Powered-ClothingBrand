import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    categories: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await API.get("/admin/dashboard");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-3xl mt-2">{stats.products}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="text-3xl mt-2">{stats.orders}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-3xl mt-2">{stats.users}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Categories</h2>
          <p className="text-3xl mt-2">{stats.categories}</p>
        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap gap-4">

        <button
          onClick={() => navigate("/admin/products/add")}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          Add Product
        </button>

        <button
          onClick={() => navigate("/admin/categories/add")}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          Add Categories
        </button>

        <button
          onClick={() => navigate("/admin/products")}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          Manage Products
        </button>

      </div>

    </div>
  );
};

export default Dashboard;
