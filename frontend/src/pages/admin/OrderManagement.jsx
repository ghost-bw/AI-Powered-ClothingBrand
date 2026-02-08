import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import { Download, Plus, Package, Clock, Truck, CheckCircle } from "lucide-react";
import OrderTable from "../../components/admin/OrderTable";
import StatsCard from "../../components/admin/StatsCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= FETCH ================= */

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/admin/all");
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("ORDER ERROR:", err);
      setOrders([]);
    }
  };

  /* ================= CSV ================= */

  const safeOrders = Array.isArray(orders) ? orders.filter(Boolean) : [];

  const exportCSV = () => {
    const csv = Papa.unparse(safeOrders);
    const blob = new Blob([csv]);
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
  };

  /* ================= FILTER ================= */

 const filteredOrders = safeOrders.filter(o => {
  const matchesSearch =
    o._id?.toString().toLowerCase().includes(search.toLowerCase()) ||
    o.user?.name?.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    status === "All" || o.status === status;

  return matchesSearch && matchesStatus;
});


const today = new Date().toDateString();
  /* ================= STATS ================= */
const stats = {
    newOrders: safeOrders.filter(o =>
    new Date(o.createdAt).toDateString() === today
  ).length,

  awaiting: safeOrders.filter(o => o?.status === "Processing").length,

  shipped: safeOrders.filter(o => o?.status === "Shipped").length,

  delivered: safeOrders.filter(o => o?.status === "Delivered").length,
};


  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 px-10 py-8 max-w-[1400px] mx-auto"
        >
          {/* HEADER */}
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-black mb-2">Order Management</h1>
              <p className="text-gray-500">Track & manage customer orders</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={exportCSV}
                className="flex items-center gap-2 bg-black text-amber-100 border px-5 py-3 rounded-xl hover:shadow transition"
              >
                <Download size={18} />
                Export CSV
              </button>

              {/* <button
                onClick={() => navigate("/admin/orders/create")}
                className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:opacity-90 transition"
              >
                <Plus size={18} />
                Create Order
              </button> */}
            </div>
          </div>

          {/* SEARCH + FILTER */}
          <div className="flex gap-4 mb-8">
            <input
              placeholder="Search Order ID"
              className="bg-white p-3 rounded-xl shadow-sm transition-all duration-200
  hover:shadow-xl hover:-translate-y-0.5
  focus:outline-none focus:ring-2 focus:ring-black"
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
             className="bg-black text-white p-3 rounded-xl shadow-sm transition-all duration-200
  hover:shadow-xl hover:-translate-y-0.5 focus:outline-none"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>All</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Returned</option>
               <option>Cancelled</option>
            </select>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
            <StatsCard
              title="New orders"
              value={stats.newOrders}
              accent="blue"
              icon={<Package size={16} />}
            />

            <StatsCard
              title="Await accepting"
              value={stats.awaiting}
              accent="orange"
              icon={<Clock size={16} />}
            />

            <StatsCard
              title="On way"
              value={stats.shipped}
              accent="yellow"
              icon={<Truck size={16} />}
            />

            <StatsCard
              title="Delivered"
              value={stats.delivered}
              accent="green"
              icon={<CheckCircle size={16} />}
            />
          </div>

          {/* TABLE */}
          <OrderTable orders={filteredOrders} />
        </motion.main>
      </div>
    </div>
  );
}
