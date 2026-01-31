import { useState } from "react";
import Sidebar from "../../../components/admin/Sidebar";

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

/* ================= DATA ================= */

const revenueData = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 68000 },
  { month: "Mar", revenue: 45000 },
  { month: "Apr", revenue: 22000 },
  { month: "May", revenue: 61000 },
  { month: "Jun", revenue: 68000 },
  { month: "Jul", revenue: 72000 },
  { month: "Aug", revenue: 38000 },
  { month: "Sep", revenue: 85000 },
  { month: "Oct", revenue: 40000 },
  { month: "Nov", revenue: 95000 },
  { month: "Dec", revenue: 110000 },
];

const categoryOrders = [
  { name: "Ethnic Wear", orders: 320 },
  { name: "Western Wear", orders: 280 },
  { name: "Outerwear", orders: 190 },
  { name: "Bottom Wear", orders: 140 },
];

const trafficData = [
  { name: "Website", value: 55 },
  { name: "Instagram", value: 25 },
  { name: "Facebook", value: 12 },
  { name: "Others", value: 8 },
];

const COLORS = ["#2563eb", "#22c55e", "#f97316", "#a855f7"];

/* ================= HELPERS ================= */

const exportCSV = () => {
  const rows = [
    ["Metric", "Value"],
    ["Revenue", "₹3,64,000"],
    ["Orders", "1,284"],
    ["Customers", "12,480"],
    ["Conversion Rate", "3.6%"],
  ];
  const csv = rows.map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "analytics-report.csv";
  a.click();
};

const downloadReport = () => {
  const text = `
ANALYTICS REPORT

Revenue: ₹3,64,000
Orders: 1,284
Customers: 12,480
Conversion Rate: 3.6%

Top Product: Silk Saree
`;
  const blob = new Blob([text], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "analytics-summary.txt";
  a.click();
};

/* ================= PAGE ================= */

export default function Analytics() {
  const [showAllStats, setShowAllStats] = useState(false);

  const statsCards = [
    { title: "Total Revenue", value: "₹3,64,000", badge: "+12.5%" },
    { title: "Total Orders", value: "1,284", badge: "+8%" },
    { title: "Customers", value: "12,480", badge: "+5.4%" },
    { title: "Cancel Rate", value: "3.6%", badge: "-1.2%" },
    { title: "Average Order Value", value: "₹284", badge: "AOV" },
    { title: "New Customers", value: "72%", badge: "This Month" },
    { title: "Returning Customers", value: "28%", badge: "Repeat" },
    { title: "Revenue Growth", value: "+12.5%", badge: "MoM" },
  ];

  return (
    <div className="flex min-h-screen bg-background-light">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">
        {/* HEADER */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
          Analytics Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Business performance & operational insights
        </p>

        {/* OVERVIEW */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold">Overview</h2>
            <button
              onClick={() => setShowAllStats(!showAllStats)}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              {showAllStats ? "Hide" : "View All"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {(showAllStats ? statsCards : statsCards.slice(0, 4)).map(
              (s, i) => (
                <StatsCard key={i} {...s} />
              )
            )}
          </div>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-12">
          <ChartCard title="Revenue Trend">
            <LineChart data={revenueData}>
              <XAxis
                dataKey="month"
                interval={0}
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
              />
              <YAxis />
              <Tooltip />
              <Line dataKey="revenue" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
          </ChartCard>

          <ChartCard title="Orders by Category">
            <BarChart
              data={categoryOrders}
              margin={{ left: 10, right: 10, bottom: 40 }}
            >
              <XAxis
                dataKey="name"
                angle={-20}
                textAnchor="end"
                interval={0}
                tick={{ fontSize: 12 }}
                tickLine={false}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#22c55e" />
            </BarChart>
          </ChartCard>
        </div>

        {/* TRAFFIC SOURCES */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 lg:p-8 mb-12">
          <h2 className="font-bold mb-6">Traffic Sources</h2>

          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="h-[240px] sm:h-[260px] w-full lg:w-1/2">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={trafficData}
                    dataKey="value"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={6}
                  >
                    {trafficData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid gap-4 w-full lg:w-1/2">
              {trafficData.map((t, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ background: COLORS[i] }}
                    />
                    <span className="font-medium">{t.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    {t.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONVERSION FUNNEL */}
        <div className="bg-white border rounded-2xl p-4 sm:p-6 mb-12">
          <h2 className="font-bold mb-6">Conversion Funnel</h2>
          {[
            ["Visitors", "12,000"],
            ["Product Views", "6,200"],
            ["Add to Cart", "2,400"],
            ["Checkout", "1,560"],
            ["Orders", "1,284"],
          ].map(([l, v], i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>{l}</span>
                <b>{v}</b>
              </div>
              <div
                className="h-2 sm:h-2.5 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transition-all duration-500"
                style={{ width: `${100 - i * 15}%` }}
              />
            </div>
          ))}
        </div>

        {/* TOP PRODUCTS */}
        <div className="bg-white border rounded-2xl p-4 sm:p-6 mb-12">
          <h2 className="font-bold mb-6">Top Products</h2>
          <div className="space-y-4">
            <ProductRow name="Silk Saree" orders={420} stock={12} best />
            <ProductRow name="Denim Jacket" orders={310} stock={64} />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={exportCSV}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
          >
            Export CSV
          </button>

          <button
            onClick={downloadReport}
            className="px-6 py-2.5 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm font-medium"
          >
            Download Report
          </button>
        </div>
      </main>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatsCard({ title, value, badge }) {
  const neg = badge?.startsWith("-");

  return (
    <div className="relative bg-white p-5 sm:p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
      <span
        className={`absolute top-4 right-4 text-xs font-medium px-2.5 py-1 rounded-full ${
          neg ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
        }`}
      >
        {badge}
      </span>

      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className="text-2xl sm:text-3xl font-semibold text-gray-900">
        {value}
      </p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 h-[280px] sm:h-[320px]">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">
        {title}
      </h2>
      <ResponsiveContainer>{children}</ResponsiveContainer>
    </div>
  );
}

function ProductRow({ name, orders, stock, best }) {
  return (
    <div className="flex justify-between items-center px-4 sm:px-5 py-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
      <div>
        <p className="font-medium text-gray-900">
          {name} {best && "⭐"}
        </p>
        <p className="text-xs text-gray-500">{orders} orders</p>
      </div>

      <span
        className={`text-sm font-semibold ${
          stock < 20 ? "text-red-600" : "text-gray-700"
        }`}
      >
        {stock} in stock
      </span>
    </div>
  );
}
