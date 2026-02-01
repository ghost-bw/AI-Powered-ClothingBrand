import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ordersData = [
  {
    id: "#GR-2045",
    customer: "Akhil Verma",
    date: "12 Oct 2025",
    payment: "PAID",
    status: "Shipped",
    amount: "₹4,299",
  },
  {
    id: "#GR-2044",
    customer: "Ashiwad Kumar",
    date: "11 Oct 2025",
    payment: "COD",
    status: "Processing",
    amount: "₹1,850",
  },
  {
    id: "#GR-2043",
    customer: "Ronak Singh",
    date: "11 Oct 2025",
    payment: "PAID",
    status: "Delivered",
    amount: "₹6,400",
  },
  {
    id: "#GR-2042",
    customer: "Satyam Gupta",
    date: "10 Oct 2025",
    payment: "REFUNDED",
    status: "Cancelled",
    amount: "₹2,100",
  },
  {
    id: "#GR-2041",
    customer: "Akhil Singh",
    date: "9 Oct 2025",
    payment: "PAID",
    status: "Processing",
    amount: "₹3,500",
  },
];

export default function OrderTable() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredOrders = ordersData.filter(
    (order) =>
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border p-6"
    >
      {/* Search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Order ID, Customer Name..."
        className="w-full mb-4 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none"
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="text-gray-500 text-sm">
            <tr>
              <th className="pb-3">Order ID</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Payment</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Action</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {filteredOrders.map((order, index) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-t hover:bg-gray-50"
              >
                <td className="py-3 font-medium text-blue-600">
                  {order.id}
                </td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>
                  <PaymentBadge text={order.payment} />
                </td>
                <td>
                  <StatusBadge status={order.status} />
                </td>
                <td>{order.amount}</td>
                <td
                  onClick={() =>
                    navigate(
                      `/admin/orders/${order.id.replace("#", "")}`
                    )
                  }
                  className="text-blue-600 cursor-pointer hover:underline"
                >
                  View Order
                </td>
              </motion.tr>
            ))}

            {filteredOrders.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-400"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

/* Payment Badge */
function PaymentBadge({ text }) {
  const color =
    text === "PAID"
      ? "bg-green-100 text-green-700"
      : text === "COD"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`px-3 py-1 rounded-full text-xs ${color}`}>
      {text}
    </span>
  );
}

/* Status Badge */
function StatusBadge({ status }) {
  const colors = {
    Shipped: "bg-blue-100 text-blue-700",
    Delivered: "bg-green-100 text-green-700",
    Processing: "bg-yellow-100 text-yellow-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs ${colors[status]}`}
    >
      {status}
    </span>
  );
}
