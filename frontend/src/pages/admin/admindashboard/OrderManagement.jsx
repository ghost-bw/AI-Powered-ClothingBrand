import Sidebar from "../../../components/admin/Sidebar";

import { Download, Plus } from "lucide-react";
import OrderTable from "../../../components/admin/OrderTable";
import { motion } from "framer-motion";

export default function OrderManagement() {
  return (
    <div className="flex bg-background-light min-h-screen">
      <Sidebar />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 p-8 max-w-[1400px] mx-auto"
      >
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black mb-2">
              Order Management
            </h1>
            <p className="text-gray-500">
              Track & manage customer orders
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border px-5 py-3 rounded-xl hover:shadow transition">
              <Download size={18} />
              Export CSV
            </button>

            <button className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:opacity-90 transition">
              <Plus size={18} />
              Create Order
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Orders" value="1,284" />
          <StatCard title="Pending" value="42" />
          <StatCard title="Shipped" value="856" />
          <StatCard title="Returns" value="12" />
        </div>

        {/* Orders Table */}
        <OrderTable />
      </motion.main>
    </div>
  );
}

/* Stat Card */
function StatCard({ title, value }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl p-5 border transition"
    >
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </motion.div>
  );
}
