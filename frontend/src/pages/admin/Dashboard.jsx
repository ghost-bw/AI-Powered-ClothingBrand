
  import Sidebar from "../../components/admin/Sidebar";
  import Header from "../../components/admin/Header";
  import { Download } from "lucide-react";
  import { motion } from "framer-motion";
  import StatsCard from "../../components/admin/StatsCard";
  // import LineChartBox from "../../components/charts/LineChartBox";
  import { exportToCSV } from "../../utils/exportCSV";
  import { useState, useEffect } from "react";
  import API from "../../api/axios";



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
    const [orders, setOrders] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const [revenueData, setRevenueData] = useState([]);
    const [range, setRange] = useState("monthly");
  const [activeFilter, setActiveFilter] = useState("Monthly");

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

    /* ================= FILTER LOGIC (UNCHANGED) ================= */
  const applyFilter = (type) => {
    const now = new Date();
    let filtered = [];

    /* ================= FILTER ORDERS ================= */

    if (type === "today") {
      filtered = allOrders.filter(
        (o) => new Date(o.Date).toDateString() === now.toDateString()
      );
    }

    if (type === "weekly") {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 6);
      filtered = allOrders.filter((o) => new Date(o.Date) >= weekAgo);
    }

    if (type === "monthly") {
      filtered = allOrders.filter(
        (o) =>
          new Date(o.Date).getMonth() === now.getMonth() &&
          new Date(o.Date).getFullYear() === now.getFullYear()
      );
    }

    if (type === "yearly") {
      filtered = allOrders.filter(
        (o) => new Date(o.Date).getFullYear() === now.getFullYear()
      );
    }

    /* ================= STATS ================= */

    const revenue = filtered.reduce(
      (a, b) => a + Number(b.Total || 0),
      0
    );

    setStats((s) => ({
      ...s,
      revenue,
      orders: filtered.length,
    }));

    /* ================= CHART DATA ================= */

    let chart = [];

    /* TODAY → Hourly */
    if (type === "today") {
      for (let h = 0; h < 24; h++) {
        const sum = filtered
          .filter((o) => new Date(o.Date).getHours() === h)
          .reduce((a, b) => a + Number(b.Total || 0), 0);

        chart.push({
          label: `${h}:00`,
          value: sum,
        });
      }
    }

    /* WEEKLY → Last 7 days */
    if (type === "weekly") {
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(now.getDate() - i);

        const sum = filtered
          .filter(
            (o) =>
              new Date(o.Date).toDateString() === d.toDateString()
          )
          .reduce((a, b) => a + Number(b.Total || 0), 0);

        chart.push({
          label: d.toLocaleDateString("en-IN", { weekday: "short" }),
          value: sum,
        });
      }
    }

    /* MONTHLY → Week 1–4 */
    if (type === "monthly") {
      chart = [1, 2, 3, 4].map((w) => ({
        label: `Week ${w}`,
        value: filtered
          .filter(
            (o) =>
              Math.ceil(new Date(o.Date).getDate() / 7) === w
          )
          .reduce((a, b) => a + Number(b.Total || 0), 0),
      }));
    }

    /* YEARLY → Jan–Dec */
    if (type === "yearly") {
      const months = [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
      ];

      chart = months.map((m, idx) => ({
        label: m,
        value: filtered
          .filter(
            (o) => new Date(o.Date).getMonth() === idx
          )
          .reduce((a, b) => a + Number(b.Total || 0), 0),
      }));
    }

    setRevenueData(chart);
  };

    /* ================= CSV ================= */

    const exportDashboardCSV = () => {
      if (!allOrders.length) return alert("Orders not loaded");
      const headers = Object.keys(allOrders[0]);
      const rows = allOrders.map((o) => headers.map((h) => `"${o[h]}"`));
      let csv = headers.join(",") + "\n";
      rows.forEach((r) => (csv += r.join(",") + "\n"));

      const blob = new Blob([csv], { type: "text/csv" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "all-orders.csv";
      link.click();
    };

    const cards = [
      { title: "TOTAL REVENUE", value: `₹${stats.revenue.toFixed(2)}`, badge: range },
      { title: "ORDERS", value: stats.orders, badge: range },
      { title: "CUSTOMERS", value: stats.users },
      { title: "PRODUCTS", value: stats.products },
    ];


    return (
      <div className="flex min-h-screen bg-background-light">
        {/* Simple Sidebar */}
        <Sidebar />

        <div className="flex-1 flex flex-col w-full">
          <Header />

          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 px-3 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-[1500px] mx-auto w-full"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black">
                Dashboard Overview
              </h1>

              <button
                onClick={() => exportToCSV(orders, "dashboard-orders.csv")}
                className="flex items-center justify-center gap-2 bg-black text-white
                px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl hover:bg-gray-900 transition
                w-full sm:w-auto text-sm sm:text-base"
              >
                <Download size={18} />
                Export CSV
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {["Today", "Weekly", "Monthly", "Yearly"].map((item) => (
                <button
                  key={item}
                  onClick={() => {setActiveFilter(item);
            setRange(item.toLowerCase());
                }}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                    activeFilter === item
                      ? "bg-black text-white"
                      : "bg-white border hover:bg-gray-100"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

              
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-10">
              {cards.map((c, i) => (
                <StatsCard key={i} {...c} />
              ))}
            </div>

            {/* CHART + REGIONS */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10">
              <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm p-4 sm:p-6">
                <h2 className="font-bold mb-4 text-sm sm:text-base">
                  Revenue Growth
                </h2>

                <div className="h-[220px] sm:h-[260px]">
                  <ResponsiveContainer>
                    <LineChart data={revenueData}>
                      <XAxis dataKey="label" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        dataKey="value"
                        stroke="#2563eb"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
                <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
  {/* 
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
              {stats[activeFilter].map((card, i) => (
                <StatsCard
                  key={i}
                  title={card.title}
                  value={card.value}
                  badge={card.badge}
                  accent={card.accent}
                />
              ))}
            </div> */}

            {/* <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10">
              <div className="xl:col-span-2">
                <LineChartBox
                  title="Revenue Growth"
                  data={revenueData}
                  xKey="week"
                  yKey="value"
                />
              </div> */}

              <div className="bg-white border rounded-2xl p-4 sm:p-6">
                <h2 className="font-bold mb-4 text-sm sm:text-base">
                  Regional Demand
                </h2>

                <div className="space-y-4 text-xs sm:text-sm">
                  {regions.map((r, i) => (
                <Region key={i} name={r.name} value={r.percent} />
                        ))}

                </div>
              </div>
            </div>

            <div className="bg-white border rounded-2xl p-4 sm:p-6 overflow-x-auto">
              <h2 className="font-bold mb-4 text-sm sm:text-base">
                Recent High-Value Orders
              </h2>


    <table className="w-full text-sm">
      <thead className="text-gray-500 border-b">
        <tr>
          <th className="text-left pb-3 font-semibold">Order ID</th>
          <th className="text-left pb-3 font-semibold">Customer</th>
          <th className="text-left pb-3 font-semibold">Product</th>
          <th className="text-center pb-3 font-semibold">Value</th>
          <th className="text-center pb-3 font-semibold">Status</th>
          <th className="text-center pb-3 font-semibold">Date</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((o, i) => (
          <tr
            key={i}
            className={`border-b last:border-none transition
            ${i % 2 === 0 ? "bg-slate-50" : "bg-white"}
            hover:bg-slate-100`}
          >
            <td className="py-4 text-blue-600 font-semibold text-left">
              {o._id}
            </td>
            <td className="py-4 text-left font-medium">{o.customer}</td>
            <td className="py-4 text-left text-gray-700 whitespace-nowrap">
              {o.product}
            </td>
            <td className="py-4 text-center font-semibold">
              ₹{o.amount}
            </td>
            <td className="py-4 text-center">{o.status}</td>
            <td className="py-4 text-center whitespace-nowrap text-gray-600">
              {new Date(o.createdAt).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

            </div>
          </motion.main>
        </div>
      </div>
                  );
  }


  function Region({ name, value }) {
    return (
      <div>
        <div className="flex justify-between mb-1 text-xs sm:text-sm">
          <span>{name}</span>
          <span>{value}%</span>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full"
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    );
  }
