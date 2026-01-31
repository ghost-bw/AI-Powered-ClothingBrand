import Sidebar from "../../../components/admin/Sidebar";

import { Download } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

/* ===== Dummy Data ===== */

const revenueData = [
  { week: "Week 1", value: 22000 },
  { week: "Week 2", value: 18000 },
  { week: "Week 3", value: 26000 },
  { week: "Week 4", value: 30000 },
];

const orders = [
  {
    id: "#GR-9842",
    customer: "Isha Singhania",
    product: "Chanderi Silk Saree Set",
    value: "₹14,200",
    status: "Delivered",
    date: "Today, 14:20",
  },
  {
    id: "#GR-9841",
    customer: "Kabir Malhotra",
    product: "Hand-Embroidered Kurta",
    value: "₹8,500",
    status: "Processing",
    date: "Today, 11:45",
  },
];

export default function Dashboard() {
  return (
    <div className="flex bg-background-light min-h-screen">
      <Sidebar />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 p-8 max-w-[1500px] mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black">
            Dashboard Overview
          </h1>

          <button className="flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-xl hover:bg-primary/90 transition">
            <Download size={18} />
            Export Report
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <Stat title="Total Revenue" value="₹12,40,000" growth="+12.5%" />
          <Stat title="Total Orders" value="1,840" growth="+8.2%" />
          <Stat title="Conversion Rate" value="3.24%" growth="+0.5%" />
          <Stat title="Avg. Order Value" value="₹6,739" growth="-2.1%" negative />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
          {/* Revenue Growth */}
          <div className="xl:col-span-2 bg-white border rounded-2xl p-6">
            <h2 className="font-bold mb-4">
              Revenue Growth
            </h2>

            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line dataKey="value" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Regional Demand */}
          <div className="bg-white border rounded-2xl p-6">
            <h2 className="font-bold mb-4">
              Regional Demand
            </h2>

            <div className="space-y-4 text-sm">
              <Region name="Bengaluru" value={32} />
              <Region name="Mumbai" value={28} />
              <Region name="Delhi" value={21} />
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white border rounded-2xl p-6">
          <h2 className="font-bold mb-4">
            Recent High-Value Orders
          </h2>

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
              {orders.map((o, i) => (
                <tr
                  key={i}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-3 text-blue-600 font-semibold">
                    {o.id}
                  </td>
                  <td>{o.customer}</td>
                  <td>{o.product}</td>
                  <td>{o.value}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        o.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td>{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.main>
    </div>
  );
}

/* ===== Components ===== */

function Stat({ title, value, growth, negative }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white p-5 rounded-2xl border"
    >
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
      <span
        className={`text-sm font-semibold ${
          negative ? "text-red-500" : "text-green-600"
        }`}
      >
        {growth}
      </span>
    </motion.div>
  );
}

function Region({ name, value }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
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