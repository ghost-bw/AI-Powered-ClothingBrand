import { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import API from "../../api/axios";
import Header from "../../components/admin/Header";
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

export default function Dashboard() {
  const token = localStorage.getItem("admin_token");

  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    users: 0,
    products: 0,
  });

  const [regions, setRegions] = useState([]);
  const [orders, setOrders] = useState([]);        // recent high orders
  const [allOrders, setAllOrders] = useState([]); // full orders for analytics
  const [revenueData, setRevenueData] = useState([]);

  const [range, setRange] = useState("monthly");

  /* ================= INIT ================= */

  useEffect(() => {
    loadStats();
    loadRegions();
    loadOrders();
    loadAllOrders();
  }, []);

  useEffect(() => {
    if (allOrders.length) applyFilter(range);
  }, [range, allOrders]);

  /* ================= BACKEND ================= */

  const loadStats = async () => {
    const { data } = await API.get("/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setStats(data);
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

  const loadAllOrders = async () => {
    const { data } = await API.get("/admin/dashboard/export-orders", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setAllOrders(data);
  };

  /* ================= FILTER LOGIC ================= */

 const applyFilter = type => {
  const now = new Date();
  let filtered = [];

  /* ================= RANGE FILTER ================= */

  if (type === "today") {
    filtered = allOrders.filter(
      o => new Date(o.Date).toDateString() === now.toDateString()
    );
  }

  if (type === "weekly") {
    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);
    filtered = allOrders.filter(o => new Date(o.Date) >= weekAgo);
  }

  if (type === "monthly") {
    filtered = allOrders.filter(
      o => new Date(o.Date).getMonth() === now.getMonth()
    );
  }

  if (type === "yearly") {
    filtered = allOrders.filter(
      o => new Date(o.Date).getFullYear() === now.getFullYear()
    );
  }

  /* ================= CARDS ================= */

  const revenue = filtered.reduce((a, b) => a + Number(b.Total || 0), 0);

  setStats(s => ({
    ...s,
    revenue,
    orders: filtered.length,
  }));

  /* ================= CHART ================= */

  let chart = [];

  /* TODAY → from first hour to last hour */

  if (type === "today") {
    if (!filtered.length) {
      setRevenueData([]);
      return;
    }

    const hours = filtered.map(o => new Date(o.Date).getHours());
    const start = Math.min(...hours);
    const end = Math.max(...hours);

    for (let h = start; h <= end; h++) {
      const sum = filtered
        .filter(o => new Date(o.Date).getHours() === h)
        .reduce((a, b) => a + Number(b.Total || 0), 0);

      chart.push({
        label: `${h}:00`,
        value: sum,
      });
    }
  }

  /* WEEKLY → last 7 days */

  if (type === "weekly") {
    const days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(now.getDate() - (6 - i));
      return d;
    });

    chart = days.map(d => {
      const sum = filtered
        .filter(o => new Date(o.Date).toDateString() === d.toDateString())
        .reduce((a, b) => a + Number(b.Total || 0), 0);

      return {
        label: d.toLocaleDateString("en-IN", { weekday: "short" }),
        value: sum,
      };
    });
  }

  /* MONTHLY → Week 1–4 */

  if (type === "monthly") {
    chart = [1, 2, 3, 4].map(w => {
      const sum = filtered
        .filter(o => Math.ceil(new Date(o.Date).getDate() / 7) === w)
        .reduce((a, b) => a + Number(b.Total || 0), 0);

      return {
        label: `Week ${w}`,
        value: sum,
      };
    });
  }

  /* YEARLY → Jan → Dec */

  if (type === "yearly") {
    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    chart = months.map((m, idx) => {
      const sum = filtered
        .filter(o => new Date(o.Date).getMonth() === idx)
        .reduce((a, b) => a + Number(b.Total || 0), 0);

      return { label: m, value: sum };
    });
  }

  setRevenueData(chart);
};


  /* ================= CSV ================= */

  const exportDashboardCSV = () => {
    if (!allOrders.length) return alert("Orders not loaded");

    const headers = Object.keys(allOrders[0]);
    const rows = allOrders.map(o => headers.map(h => `"${o[h]}"`));

    let csv = headers.join(",") + "\n";
    rows.forEach(r => (csv += r.join(",") + "\n"));

    const blob = new Blob([csv], { type: "text/csv" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "all-orders.csv";
    link.click();
  };

  /* ================= UI ================= */

  const cards = [
    { title: "TOTAL REVENUE", value: `₹${stats.revenue.toFixed(2)}`, badge: range },
    { title: "ORDERS", value: stats.orders, badge: range },
    { title: "CUSTOMERS", value: stats.users },
    { title: "PRODUCTS", value: stats.products },
  ];

  return (
    <div className="flex bg-background-light min-h-screen">
      <Sidebar />
  
   <div className="flex-1 flex flex-col">
          <Header />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 p-8 max-w-[1500px] mx-auto"
      >
        {/* HEADER */}

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-black">Dashboard Overview</h1>

          <button
            onClick={exportDashboardCSV}
            className="flex gap-2 bg-black text-white px-5 py-3 rounded-xl"
          >
            <Download size={18} /> Export CSV
          </button>
        </div>

        {/* FILTERS */}

        <div className="flex gap-3 mb-6">
          {["today", "weekly", "monthly", "yearly"].map(f => (
            <button
              key={f}
              onClick={() => setRange(f)}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                range === f ? "bg-black text-white" : "bg-gray-100"
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {cards.map((c, i) => (
            <StatsCard key={i} {...c} />
          ))}
        </div>

        {/* CHART + REGIONS */}

        <div className="grid xl:grid-cols-3 gap-8 mb-10">
          <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-bold mb-4">Revenue Growth</h2>

            <div className="h-[260px]">
              <ResponsiveContainer>
                <LineChart data={revenueData}>
                  <XAxis dataKey="label" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="value" stroke="#2563eb" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-bold mb-4">Regional Demand</h2>

            {regions.map((r, i) => (
              <Region key={i} name={r.region} value={r.percent} />
            ))}
          </div>
        </div>

        {/* RECENT ORDERS (RESTORED UI) */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6
transition-all hover:-translate-y-1 hover:shadow-xl">

  <h2 className="font-bold mb-4">Recent High-Value Orders</h2>

  <table className="w-full text-sm">

    <thead className="text-gray-500 border-b">
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

      {orders.map((o, i) => (

        <tr
          key={i}
          className="transition hover:bg-gray-50 cursor-pointer"
        >

          <td className="py-3 font-semibold text-blue-600">
            {o._id}
          </td>

          <td>{o.customer}</td>

          <td>{o.product}</td>

          <td className="font-medium">
            ₹{o.amount}
          </td>

          <td>{o.status}</td>

          <td>
            {new Date(o.createdAt).toLocaleString()}
          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

      </motion.main>
    </div>
    </div>
  );
}

/* ================= REGION ================= */

function Region({ name, value }) {
  return (
    <div className="mb-4">

      <div className="flex justify-between mb-1 text-sm">
        <span>{name}</span>
        <span>{value}%</span>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">

        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${value}%` }}
        />

      </div>

    </div>
  );
}

