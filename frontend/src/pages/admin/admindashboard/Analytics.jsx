import { useState, useEffect } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import API from "../../../api/axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* ================= COLORS ================= */

const COLORS = ["#2563eb", "#22c55e", "#f97316", "#a855f7"];

export default function Analytics() {

  const token = localStorage.getItem("admin_token");

  const [showAllStats, setShowAllStats] = useState(false);

  const [stats, setStats] = useState({});
  const [revenueData, setRevenueData] = useState([]);
  const [categoryOrders, setCategoryOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  const trafficData = [
    { name: "Website", value: 55 },
    { name: "Instagram", value: 25 },
    { name: "Facebook", value: 12 },
    { name: "Others", value: 8 },
  ];

  useEffect(() => {
    fetchStats();
    fetchRevenue();
    fetchCategorySales();
    fetchTopProducts();
  }, []);

  /* ===== BACKEND ===== */

  const fetchStats = async () => {
    const { data } = await API.get("/admin/dashboard/stats", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStats(data);
  };

  const fetchRevenue = async () => {
    const { data } = await API.get("/admin/dashboard/revenue", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    setRevenueData(data.map(m => ({
      month: months[m._id - 1],
      revenue: m.revenue,
    })));
  };

  const fetchCategorySales = async () => {
    const { data } = await API.get("/admin/dashboard/category-sales", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setCategoryOrders(data.map(c => ({
      name: c._id || "Other",
      orders: Math.round(c.sales),
    })));
  };

  const fetchTopProducts = async () => {
    const { data } = await API.get("/admin/dashboard/top-products", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setTopProducts(data);
  };

  /* ===== CARDS ===== */

  const statsCards = [
    { title: "Revenue", value: `₹${stats.revenue || 0}` },
    { title: "Orders", value: stats.orders || 0 },
    { title: "Customers", value: stats.users || 0 },
    { title: "Products", value: stats.products || 0 },
    { title: "Categories", value: stats.categories || 0 },
    { title: "Out of Stock", value: stats.outOfStock || 0 },
    { title: "Live Products", value: stats.liveProducts || 0 },
  ];

  return (
    <div className="flex min-h-screen bg-background-light">
      <Sidebar />

      <main className="flex-1 p-6 max-w-[1400px] mx-auto">

        <h1 className="text-3xl font-semibold mb-1">Analytics Dashboard</h1>
        <p className="text-gray-500 mb-8">Business performance overview</p>

        {/* OVERVIEW */}

        <div className="mb-12">

          <div className="flex justify-between mb-4">
            <h2 className="font-bold">Overview</h2>
            <button onClick={()=>setShowAllStats(!showAllStats)} className="text-blue-600 text-sm">
              {showAllStats ? "Hide" : "View All"}
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(showAllStats ? statsCards : statsCards.slice(0,4)).map((s,i)=>(
              <StatsCard key={i} {...s}/>
            ))}
          </div>

        </div>

        {/* CHARTS */}

        <div className="grid xl:grid-cols-2 gap-8 mb-12">

          <ChartCard title="Revenue Trend">
            <LineChart data={revenueData}>
              <XAxis dataKey="month"/>
              <YAxis/>
              <Tooltip/>
              <Line dataKey="revenue" stroke="#2563eb" strokeWidth={3}/>
            </LineChart>
          </ChartCard>

          <ChartCard title="Orders by Category">
            <BarChart data={categoryOrders}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Bar dataKey="orders" fill="#22c55e"/>
            </BarChart>
          </ChartCard>

        </div>

        {/* TRAFFIC */}

        <div className="bg-white border rounded-xl p-6 mb-12">

          <h2 className="font-bold mb-6">Traffic Sources</h2>

          <div className="flex gap-10">

            <div className="h-[260px] w-1/2">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={trafficData} dataKey="value" innerRadius={70} outerRadius={110}>
                    {trafficData.map((_,i)=>(
                      <Cell key={i} fill={COLORS[i]}/>
                    ))}
                  </Pie>
                  <Tooltip/>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid gap-4 w-1/2">
              {trafficData.map((t,i)=>(
                <div key={i} className="flex justify-between">
                  <span>{t.name}</span>
                  <b>{t.value}%</b>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* CONVERSION FUNNEL */}

        <div className="bg-white border rounded-xl p-6 mb-12">

          <h2 className="font-bold mb-4">Conversion Funnel</h2>

          {[
            ["Visitors", stats.visitors || 12000],
            ["Views", stats.views || 6200],
            ["Cart", stats.cart || 2400],
            ["Checkout", stats.checkout || 1560],
            ["Orders", stats.orders || 0],
          ].map(([l,v],i)=>(
            <div key={i} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>{l}</span>
                <b>{v}</b>
              </div>
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full" style={{width:`${100-i*15}%`}}/>
            </div>
          ))}

        </div>

        {/* TOP PRODUCTS */}

        <div className="bg-white border rounded-xl p-6">

          <h2 className="font-bold mb-4">Top Products</h2>

          <div className="space-y-4">
            {topProducts.map((p,i)=>(
              <div key={i} className="flex justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.orders} orders</p>
                </div>
                <span className={p.stock<20?"text-red-600":"text-gray-700"}>
                  {p.stock} in stock
                </span>
              </div>
            ))}
          </div>

        </div>

      </main>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatsCard({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl border hover:shadow-md transition">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white border rounded-xl p-6 h-[320px]">
      <h2 className="font-semibold mb-4">{title}</h2>
      <ResponsiveContainer>{children}</ResponsiveContainer>
    </div>
  );
}
