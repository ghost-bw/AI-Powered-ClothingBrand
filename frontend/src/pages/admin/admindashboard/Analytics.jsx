import { useState, useEffect } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import StatsCard from "../../../components/admin/StatsCard";
import LineChartBox from "../../../components/charts/LineChartBox";
import BarChartBox from "../../../components/charts/BarChartBox";
import Header from "../../../components/admin/Header";

import API from "../../../api/axios";

import {
  IndianRupee,
  ShoppingBag,
  Users,
  Percent,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#2563eb", "#22c55e", "#f97316", "#a855f7"];
const weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function Analytics() {

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  /* ================= STATES ================= */

  const [stats, setStats] = useState({});
  const [revenueData, setRevenueData] = useState([]);
  const [categoryOrders, setCategoryOrders] = useState([]);
  const [trafficData, setTrafficData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchAnalytics();
  }, []);

 const token = localStorage.getItem("admin_token");



const fetchAnalytics = async () => {
  try {
    const statsRes = await API.get("/admin/dashboard/stats", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const revenueRes = await API.get("/admin/dashboard/revenue", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const categoryRes = await API.get("/admin/dashboard/category-sales", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const productsRes = await API.get("/admin/dashboard/top-products", {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log("RAW TOP PRODUCTS:", productsRes.data);


    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    /* ===== STATS ===== */
const revenue = statsRes.data.revenue || 0;
const orders = statsRes.data.orders || 0;
const users = statsRes.data.users || 0;

setStats({
  revenue,
  orders,
  customers: users,
  avgOrderValue: orders > 0 ? Math.round(revenue / orders) : 0,
  todayOrders: statsRes.data.todayOrders || 0,
});

  

    /* ===== REVENUE ===== */

    setRevenueData(
      revenueRes.data.map(m => ({
        month: months[m._id - 1],
        revenue: m.revenue,
      }))
    );

    /* ===== CATEGORY ===== */

    setCategoryOrders(
      categoryRes.data.map(c => ({
        name: c._id || "Other",
        orders: Math.round(c.sales),
      }))
    );

    /* ===== TOP PRODUCTS ===== */

    setTopProducts(
      productsRes.data.map(p => ({
        name: p.name,
        orders: p.orders || p.totalOrders || 0,
        stock: p.stock || p.quantity || 0,
        best: false,
      }))
    );

    /* ===== TRAFFIC (STATIC) ===== */

    setTrafficData([
      { name: "Website", value: 55 },
      { name: "Instagram", value: 25 },
      { name: "Facebook", value: 12 },
      { name: "Others", value: 8 },
    ]);

  } catch (err) {
    console.log("ANALYTICS ERROR:", err.response?.data || err.message);
  }
};



  const exportCSV = () => alert("CSV Exported (demo)");
  const downloadReport = () => alert("Report Downloaded (demo)");

  return (
  <div className="flex bg-gray-50 min-h-screen">
    {/* Sidebar stays as-is (assumed responsive internally) */}
    <Sidebar />

    <div className="flex-1 flex flex-col min-w-0">
      <Header />

      <main className="flex-1 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-[1400px] mx-auto w-full">

        {/* PAGE TITLE */}
        <div className="mb-6 sm:mb-8">
         <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">
            Analytics
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Track performance & business insights
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-6 sm:mb-10">
          <StatsCard title="Total Revenue" value={`₹${stats.revenue || 0}`} badge={stats.revenueGrowth} icon={<IndianRupee size={16} />} />
          <StatsCard title="Total Orders" value={stats.orders || 0} badge={stats.ordersGrowth} icon={<ShoppingBag size={16} />} />
          <StatsCard title="Customers" value={stats.customers || 0} badge={stats.customerGrowth} icon={<Users size={16} />} />
          <StatsCard title="Avg Order Value" value={`₹${stats.avgOrderValue || 0}`} icon={<Percent size={16} />} />
        </div>

        {/* CHARTS */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 mb-8 sm:mb-10">
          <LineChartBox title="Revenue Trend" data={revenueData} xKey="month" yKey="revenue" height={260} />
          <BarChartBox title="Orders by Category" data={categoryOrders} xKey="name" yKey="orders" height={260} />
        </div>

        {/* PIE + CALENDAR */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 mb-10">

          {/* PIE */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 transition-all hover:shadow-lg">
            <h2 className="font-bold mb-4 text-sm sm:text-base">Traffic Sources</h2>

            <div className="h-[220px] sm:h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={trafficData} dataKey="value" innerRadius={50} outerRadius={90}>
                    {trafficData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CALENDAR */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 transition-all hover:shadow-lg">
            <h2 className="font-bold mb-4 text-sm sm:text-base">Calendar Snapshot</h2>

            <div className="border rounded-xl p-3 sm:p-4">

              <div className="flex justify-between items-center mb-4 text-sm">
                <ChevronLeft onClick={prevMonth} className="cursor-pointer" />
                <span className="font-semibold text-center">
                  {currentDate.toLocaleString("default", { month: "long" })} {year}
                </span>
                <ChevronRight onClick={nextMonth} className="cursor-pointer" />
              </div>

              <div className="grid grid-cols-7 text-[10px] sm:text-xs text-gray-500 mb-2">
                {weekDays.map(d => (
                  <div key={d} className="text-center">{d}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 sm:gap-2 text-xs sm:text-sm">
                {[...Array(firstDay)].map((_, i) => <div key={i} />)}

                {[...Array(daysInMonth)].map((_, i) => {
                  const day = i + 1;
                  const isToday =
                    day === today.getDate() &&
                    month === today.getMonth() &&
                    year === today.getFullYear();

                  return (
                    <div
                      key={day}
                       className={`h-7 sm:h-9 flex items-center justify-center rounded-md sm:rounded-lg
                      ${isToday ? "bg-blue-600 text-white font-bold" : "hover:bg-gray-100"}`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between text-xs text-gray-500 mt-4 sm:mt-5">
                <span>Total Orders Today</span>
                <span className="font-semibold text-gray-900">
                  {stats.todayOrders || 0}
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* TOP PRODUCTS */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 mb-10 transition-all hover:shadow-lg">
          <h2 className="font-bold mb-4 sm:mb-6 text-sm sm:text-base">
            Top Products
          </h2>

          <div className="space-y-2 sm:space-y-4">
            {topProducts.map((p, i) => (
              <ProductRow key={i} {...p} />
            ))}
          </div>
        </div>

      </main>
    </div>
  </div>
);

}

/* ================= PRODUCT ROW ================= */

function ProductRow({ name, orders, stock, best }) {
  return (
    <div className="flex justify-between items-center px-5 py-4 border rounded-lg hover:bg-gray-50">
      <div>
        <p className="font-medium">{name} {best && "⭐"}</p>
        <p className="text-xs text-gray-500">{orders} orders</p>
      </div>

      <span className={`text-sm font-semibold ${stock < 20 ? "text-red-600" : "text-gray-700"}`}>
        {stock} in stock
      </span>
    </div>
  );
}
