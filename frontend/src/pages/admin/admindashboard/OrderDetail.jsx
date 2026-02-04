import Sidebar from "../../../components/admin/Sidebar";
import { Download } from "lucide-react";
import OrderTable from "../../../components/admin/OrderTable";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../../../api/axios";
import Papa from "papaparse";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);

  const limit = 8;

  useEffect(() => {
    fetchOrders();
  }, [status, page]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/admin/orders", {
        params: { status, page, limit },
      });

      setOrders(res.data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  /* CSV EXPORT */
  const exportCSV = () => {
    const csv = Papa.unparse(orders);
    const blob = new Blob([csv]);
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
  };

  const filtered = orders.filter(o =>
    o._id.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "Pending").length,
    shipped: orders.filter(o => o.status === "Shipped").length,
    returned: orders.filter(o => o.status === "Returned").length,
  };

  return (
    <div className="flex bg-background-light min-h-screen">
      <Sidebar />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 p-8 max-w-[1400px] mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-4xl font-black">Order Management</h1>
            <p className="text-gray-500">Live admin orders</p>
          </div>

          <button
            onClick={exportCSV}
            className="bg-black text-white px-5 py-3 rounded-xl flex gap-2"
          >
            <Download size={18} /> Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <input
            placeholder="Search Order ID"
            className="border p-3 rounded-xl"
            onChange={e => setSearch(e.target.value)}
          />

          <select
            className="border p-3 rounded-xl"
            onChange={e => setStatus(e.target.value)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Returned</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Stat title="Total" value={stats.total} />
          <Stat title="Pending" value={stats.pending} />
          <Stat title="Shipped" value={stats.shipped} />
          <Stat title="Returned" value={stats.returned} />
        </div>

        <OrderTable orders={filtered} />

        {/* Pagination */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
          <button onClick={() => setPage(p => p + 1)}>Next</button>
        </div>
      </motion.main>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl border">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}
