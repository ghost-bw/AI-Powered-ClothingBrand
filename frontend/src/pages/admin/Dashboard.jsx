import { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import API from "../../api/axios";

import { Download } from "lucide-react";
import { motion } from "framer-motion";

import StatsCard from "../../components/admin/StatsCard";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ================= CSV ================= */
// this for only recent high oder 
// const exportToCSV = (data, filename = "orders.csv") => {
//   if (!data.length) return;

//   const headers = Object.keys(data[0]);
//   const rows = data.map(o => headers.map(h => o[h]));

//   let csv = headers.join(",") + "\n";
//   rows.forEach(r => (csv += r.join(",") + "\n"));

//   const blob = new Blob([csv], { type: "text/csv" });
//   const link = document.createElement("a");
//   link.href = URL.createObjectURL(blob);
//   link.download = filename;
//   link.click();
// };




export default function Dashboard() {

  const token = localStorage.getItem("admin_token");

  const [stats, setStats] = useState({  revenue: 0,
  orders: 0,
  users: 0,
  products: 0,
  categories: 0});
  const [revenueData, setRevenueData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);


const exportDashboardCSV = () => {
  if (!allOrders || allOrders.length === 0) {
    alert("Orders not loaded yet");
    return;
  }

  const headers = Object.keys(allOrders[0]);

  const rows = allOrders.map(order =>
    headers.map(h => `"${order[h] ?? ""}"`)
  );

  let csv = headers.join(",") + "\n";
  rows.forEach(r => (csv += r.join(",") + "\n"));

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "all-orders.csv";
  link.click();
};



  useEffect(() => {
    loadStats();
    loadRevenue();
    loadRegions();
    loadOrders();
    loadAllOrders();
  }, []);

  /* ================= BACKEND ================= */

  const loadAllOrders = async () => {
  try {
    const token = localStorage.getItem("admin_token");

    const { data } = await API.get("/admin/dashboard/export-orders", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setAllOrders(data);

  } catch (err) {
    console.error("Export orders failed:", err);
  }
};


  const loadStats = async () => {
    const { data } = await API.get("/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStats(data);
  };

  const loadRevenue = async () => {
    const { data } = await API.get("/admin/dashboard/revenue", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const weeks = ["W1","W2","W3","W4"];

    setRevenueData(
      data.slice(0,4).map((r,i)=>({
        week: weeks[i],
        value: r.revenue,
      }))
    );
  };

  const loadRegions = async () => {
    const { data } = await API.get("/admin/dashboard/regions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setRegions(data);
  };

  const loadOrders = async () => {
    const { data } = await API.get("/admin/dashboard/recent-orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrders(data);
  };

  /* ================= UI ================= */

  const cards = [
    { title: "TOTAL REVENUE", value: `₹${stats.revenue || 0}`, badge: "+12%" },
    { title: "ORDERS", value: stats.orders || 0, badge: "+8%" },
    { title: "CUSTOMERS", value: stats.users || 0, badge: "+5%" },
    { title: "PRODUCTS", value: stats.products || 0, badge: "Live" },
  ];

  return (
    <div className="flex bg-background-light min-h-screen">

      <Sidebar />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 p-8 max-w-[1500px] mx-auto"
      >

        {/* HEADER */}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black">Dashboard Overview</h1>

          <button
                onClick={exportDashboardCSV}
                className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl"
              >
                <Download size={18} />
                Export CSV
           </button>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {cards.map((c,i)=>(
            <StatsCard key={i} title={c.title} value={c.value} badge={c.badge}/>
          ))}
        </div>

        {/* CHART + REGIONS */}

        <div className="grid xl:grid-cols-3 gap-8 mb-10">

          <div className="xl:col-span-2 bg-white border rounded-2xl p-6">

            <h2 className="font-bold mb-4">Revenue Growth</h2>

            <div className="h-[260px]">
              <ResponsiveContainer>
                <LineChart data={revenueData}>
                  <XAxis dataKey="week"/>
                  <YAxis/>
                  <Tooltip/>
                  <Line dataKey="value" stroke="#2563eb" strokeWidth={3}/>
                </LineChart>
              </ResponsiveContainer>
            </div>

          </div>

          <div className="bg-white border rounded-2xl p-6">

            <h2 className="font-bold mb-4">Regional Demand</h2>

            {regions.map((r,i)=>(
              <Region key={i} name={r.region} value={r.percent}/>
            ))}

          </div>

        </div>

        {/* ORDERS */}

        <div className="bg-white border rounded-2xl p-6">

          <h2 className="font-bold mb-4">Recent High-Value Orders</h2>

          <table className="w-full text-sm">

            <thead className="text-gray-500">
              <tr>
                <th className="text-left pb-3">Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Value</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {orders.map((o,i)=>(
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="py-3 text-blue-600 font-semibold">{o._id}</td>
                  <td>{o.customer}</td>
                  <td>{o.product}</td>
                  <td>₹{o.amount}</td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      o.status==="Delivered"
                        ?"bg-green-100 text-green-700"
                        :"bg-yellow-100 text-yellow-700"
                    }`}>
                      {o.status}
                    </span>
                  </td>
                  <td>{new Date(o.createdAt).toLocaleString()}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </motion.main>
    </div>
  );
}

/* ================= HELPERS ================= */

function Region({ name, value }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span>{name}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div className="bg-primary h-2 rounded-full" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
