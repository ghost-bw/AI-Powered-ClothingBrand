import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/axios";

import {
  FaCheckCircle,
  FaBox,
  FaTruck,
  FaMapMarkerAlt,
  FaHome,
  FaPhoneAlt,
} from "react-icons/fa";

export default function TrackOrder() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (orderId) fetchSingleOrder();
    else fetchAllOrders();
  }, [orderId]);

 const fetchAllOrders = async () => {
  try {
    const res = await API.get("/user/dashboard/orders/my");

    console.log("RAW RESPONSE:", res.data);

    // Support every possible backend structure
    const ordersArray =
      res.data.orders ||
      res.data.data ||
      res.data.result ||
      res.data;

    console.log("PARSED ORDERS:", ordersArray);

    setOrders(Array.isArray(ordersArray) ? ordersArray : []);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};



  const fetchSingleOrder = async () => {
    try {
      const res = await API.get(`/user/dashboard/orders/${orderId}`);
      setOrder(res.data.order || null);
    } catch (err) {
      console.error(err);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  /* ================= SHOW ALL ORDERS ================= */

  if (!orderId) {
    return (
      <div className="space-y-6">

        <h2 className="text-xl font-semibold">Track Your Orders</h2>

        {orders.length === 0 && <p>No orders found.</p>}

        {orders.map(o => (
          <div
            key={o._id}
            className="bg-white border rounded-xl p-5 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">Order #{o._id.slice(-6)}</p>
              <p className="text-sm text-gray-500">
                {new Date(o.createdAt).toLocaleDateString()}
              </p>
              <p className="font-semibold mt-1">₹{o.total}</p>
            </div>

            <button
              onClick={() => navigate(`/user/dashboard/track-order/${o._id}`)}
              className="bg-black text-white px-4 py-2 rounded-lg text-sm"
            >
              Track
            </button>
          </div>
        ))}
      </div>
    );
  }

  /* ================= SINGLE ORDER TRACK ================= */

 {if (orderId && !order) return <p>Order not found.</p>;



  const steps = [
    { label: "Order Confirmed", done: true, icon: <FaCheckCircle /> },
    { label: "Packed", done: order?.status !== "Pending", icon: <FaBox /> },
    {
      label: "Shipped",
      done: ["Shipped", "OutForDelivery", "Delivered"].includes(order?.status),
      icon: <FaTruck />,
    },
    {
      label: "Out for Delivery",
      current: order?.status === "OutForDelivery",
      icon: <FaMapMarkerAlt />,
    },
    {
      label: "Delivered",
      done: order?.status === "Delivered",
      icon: <FaHome />,
    },
  ];

  return (
    <div className="space-y-6">

      <button
        onClick={() => navigate("/user/dashboard/track-order")}
        className="text-sm text-blue-600"
      >
        ← Back to Orders
      </button>

      <div className="bg-white rounded-xl border p-5">
        <h2 className="text-xl font-semibold">Tracking Order</h2>
        <p className="text-sm text-gray-600 mt-1">Order ID: {order._id}</p>
      </div>

      <div className="bg-white rounded-xl border p-6">
        <h3 className="font-semibold mb-6">Order Status</h3>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gray-200"></div>

          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4">

                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full
                  ${
                    step.done
                      ? "bg-green-500 text-white"
                      : step.current
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step.icon}
                </div>

                <p className="font-medium">{step.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-5">
        <h4 className="font-semibold mb-2">Delivery Address</h4>
        <p className="text-sm text-gray-600">
          {order.shipping?.address}, {order.shipping?.city}
        </p>
      </div>
    </div>
  );
}}
