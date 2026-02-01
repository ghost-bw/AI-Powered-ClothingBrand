import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../../api/axios";

export default function OrderTable({ orders }) {
  // console.log("TABLE ORDERS:", orders);

  const updateStatus = async (id, status) => {
  try {
    await API.put(`/orders/admin/${id}/status`, { status });

    orders.find(o => o._id === id).status = status;
    window.location.reload(); // simple refresh
  } catch (err) {
    alert("Failed to update status");
  }
};


  if (!orders || !orders.length) {
    return (
      <div className="bg-white p-6 rounded-xl border text-center">
        No orders found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border p-6">
      <table className="w-full text-left">
        <thead className="text-gray-500 text-sm">
          <tr>
            <th className="pb-3">Order ID</th>
            <th className="pb-3">Customer</th>
            <th className="pb-3">Status</th>
            <th className="pb-3">Amount</th>
            <th className="pb-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order, i) => (
            <motion.tr
              key={order._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border-t"
            >
              <td className="py-3 font-medium">
                #{order._id.slice(-6)}
              </td>

              <td>
                {order.user?.name || "Guest"}
              </td>

              <td>
  <select
    value={order.status}
    onChange={e => updateStatus(order._id, e.target.value)}
    className="border rounded px-2 py-1"
  >
    <option>Processing</option>
    <option>Shipped</option>
    <option>Delivered</option>
    <option>Returned</option>
  </select>
</td>


              <td>
                ₹{order.total}
              </td>

              <td>
                <Link
                  to={`/admin/orders/${order._id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
