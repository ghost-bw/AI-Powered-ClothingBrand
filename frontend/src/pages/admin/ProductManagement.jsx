import { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import ProductTable from "../../components/admin/ProductTable";
import ProductMediaSection from "../../components/admin/ProductMediaSection";

import {
  IndianRupee,
  PackageX,
  Sparkles,
  CheckCircle2,
  Download,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

/* ===== Revenue Graph ===== */
const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 15000 },
  { month: "Apr", revenue: 22000 },
  { month: "May", revenue: 26000 },
  { month: "Jun", revenue: 30000 },
];

/* ===== Category-wise Sales ===== */
const categorySales = [
  { category: "Ethnic Wear", sales: 42000 },
  { category: "Shirts", sales: 28000 },
  { category: "Outerwear", sales: 19000 },
  { category: "Accessories", sales: 12000 },
];

export default function ProductManagement() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  /* ===== Dummy Product Data (Frontend Only) ===== */
  const products = [
    {
      name: "Classic Linen Shirt",
      category: "Shirts",
      price: 1899,
      stock: 45,
    },
    {
      name: "Indigo Denim Jacket",
      category: "Outerwear",
      price: 4999,
      stock: 30,
    },
    {
      name: "Embroidered Kurta",
      category: "Ethnic Wear",
      price: 2999,
      stock: 0,
    },
  ];

  /* ===== CSV Export ===== */
  const exportCSV = () => {
    const headers = ["Name", "Category", "Price", "Stock"];
    const rows = products.map((p) =>
      [p.name, p.category, p.price, p.stock].join(",")
    );

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows].join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "products.csv";
    link.click();
  };

  const cards = [
    {
      title: "TOTAL SALES",
      value: "₹1,24,000",
      icon: IndianRupee,
      filter: "ALL",
    },
    {
      title: "OUT OF STOCK",
      value: "12",
      icon: PackageX,
      filter: "OUT_OF_STOCK",
    },
    {
      title: "NEW ARRIVALS",
      value: "45",
      icon: Sparkles,
      filter: "NEW",
    },
    {
      title: "LIVE PRODUCTS",
      value: "98%",
      icon: CheckCircle2,
      filter: "LIVE",
    },
  ];

  return (
    <div className="flex bg-background-light min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black mb-2">
              Product Management
            </h1>
            <p className="text-gray-500">
              Manage your clothing brand products & inventory
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800"
          >
            <Download size={18} />
            Export CSV
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                onClick={() => setActiveFilter(card.filter)}
                className="cursor-pointer bg-white rounded-2xl p-5 border hover:-translate-y-1 hover:shadow-xl transition-all flex justify-between items-center"
              >
                <div>
                  <p className="text-sm text-gray-500">
                    {card.title}
                  </p>
                  <h2 className="text-3xl font-bold">
                    {card.value}
                  </h2>
                </div>
                <Icon size={30} />
              </div>
            );
          })}
        </div>

        {/* Revenue Graph */}
        <div className="bg-white rounded-2xl p-6 border shadow-sm mb-10">
          <h2 className="text-xl font-bold mb-4">
            Monthly Revenue
          </h2>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line dataKey="revenue" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category-wise Sales */}
        <div className="bg-white rounded-2xl p-6 border shadow-sm mb-10">
          <h2 className="text-xl font-bold mb-4">
            Category-wise Sales
          </h2>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categorySales}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Table */}
        <ProductTable filter={activeFilter} />

        {/* 🔥 Product Media Section (Figma-style cards) */}
        <div className="mt-12">
          <ProductMediaSection />
        </div>
      </main>
    </div>
  );
}
