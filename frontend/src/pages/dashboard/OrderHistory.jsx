import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBoxOpen } from "react-icons/fa";

export default function OrderHistory() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!token) return navigate("/user/login");

    axios
      .get("http://localhost:4000/api/user/dashboard/orders/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrders(res.data || []);
      })
      .catch((err) => {
        console.error("ORDERS ERROR:", err.response?.data || err);
        setOrders([]);
      });
  }, []);

  const statusStyle = {
    Delivered: "bg-green-50 text-green-700 border border-green-200",
    Shipped: "bg-blue-50 text-blue-700 border border-blue-200",
    Cancelled: "bg-red-50 text-red-600 border border-red-200",
    Processing: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-md">
          <FaBoxOpen />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
          <p className="text-sm text-gray-500">
            Track, return or view your order history
          </p>
        </div>
      </div>

      {/* Orders */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-gray-50 rounded-2xl p-6 border border-gray-200
            transition-all duration-300 hover:shadow-lg hover:bg-white"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              {/* Left */}
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  Order #{order._id.slice(-6)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Middle */}
              <div className="text-sm text-gray-600 space-y-1">

                <p>
                  <span className="font-medium text-gray-800">Product name:</span>{" "}
                  {order.items?.map((item, i) => (
                        <p key={i}>{item.name}</p>
                      ))}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Items:</span>{" "}
                  {order.items?.length || 0}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Payment:</span>{" "}
                  {order.paymentMethod || "Online"}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Deliver to:</span>{" "}
                 {order.shipping?.city || order.shipping?.address || "—"}
                </p>
              </div>

              {/* Right */}
              <div className="flex flex-wrap lg:justify-end items-center gap-4">
                <span
                  className={`px-4 py-1.5 text-xs font-semibold rounded-full ${
                    statusStyle[order.status] ||
                    "bg-gray-100 text-gray-600 border"
                  }`}
                >
                  {order.status}
                </span>

                <span className="text-xl font-bold text-gray-900">
                  ₹{order.total}
                </span>

                <button
                  onClick={() =>
                    navigate(`/user/dashboard/orders/${order._id}`)
                  }
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white
                  bg-black transition-all duration-300
                  hover:bg-gray-800 hover:shadow-md"
                >
                  View Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY */}
      {orders.length === 0 && (
        <div className="text-center py-16 text-gray-500">No orders found</div>
      )}
    </div>
  );
}
