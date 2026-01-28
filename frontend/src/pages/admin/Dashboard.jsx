import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-3xl mt-2">120</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="text-3xl mt-2">45</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-3xl mt-2">300</p>
        </div>

          <button
        onClick={() => navigate("/admin/products/add")}
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Add Product
      </button>

         <button
        onClick={() => navigate("/admin/categories/add")}
        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Add Categories
      </button>
      </div>
    </div>
  );
};

export default Dashboard;
