import { useNavigate } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";

export default function OrderHistory() {
  const navigate = useNavigate();

  const orders = [
    {
      id: "ORD123",
      date: "28 Jan 2026",
      status: "Delivered",
      total: 2499,
    },
    {
      id: "ORD124",
      date: "25 Jan 2026",
      status: "Shipped",
      total: 1799,
    },
  ];

  const statusStyle = {
    Delivered: "bg-green-100 text-green-700",
    Shipped: "bg-blue-100 text-blue-700",
    Cancelled: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
          <FaBoxOpen />
        </div>
        <div>
          <h2 className="text-xl font-semibold">My Orders</h2>
          <p className="text-sm text-gray-500">
            Track, return or view order details
          </p>
        </div>
      </div>

      {/* ORDERS */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-xl p-4 hover:shadow-md transition bg-gray-50"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* LEFT */}
              <div>
                <p className="font-semibold text-gray-800">Order #{order.id}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>

              {/* RIGHT */}
              <div className="flex flex-wrap items-center gap-4">
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${statusStyle[order.status]}`}
                >
                  {order.status}
                </span>

                <span className="font-semibold text-gray-900">
                  ₹{order.total}
                </span>

                <button
                  onClick={() => navigate(`/dashboard/orders/${order.id}`)}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  View Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE (future use) */}
      {orders.length === 0 && (
        <div className="text-center py-10 text-gray-500">No orders found</div>
      )}
    </div>
  );
}
