import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaBox, FaTruck, FaMapMarkerAlt, FaHome } from "react-icons/fa";

const OrderDetails = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/user/dashboard/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrder(res.data.order));
  }, []);

  if (!order) return null;

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">

      {/* ORDER HEADER */}
      <div className="bg-white border rounded-2xl p-6 mb-6">
        <h1 className="text-xl font-semibold">Order #{order._id.slice(-6)}</h1>

        <p className="text-sm text-gray-500 mt-1">
          Placed on {new Date(order.createdAt).toDateString()} • Total ₹{order.total}
        </p>

        <span className="inline-block mt-3 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
          {order.status}
        </span>
      </div>

      {/* TRACKING TIMELINE */}
      <div className="bg-white border rounded-2xl p-6 mb-6">
        <h2 className="font-semibold mb-4">Order Status</h2>

        <div className="space-y-6">
          <TimelineItem icon={<FaBox />} title="Packed" active />
          <TimelineItem icon={<FaTruck />} title="Shipped" active />
          <TimelineItem icon={<FaMapMarkerAlt />} title={order.status} current />
          <TimelineItem icon={<FaHome />} title="Delivered" />
        </div>
      </div>

      {/* INFO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <InfoCard
          title="Delivery Address"
          value={`${order?.shipping?.fullName}, ${order?.shipping?.address}, ${order?.shipping?.city}, ${order?.shipping?.state}`}
        />

        <InfoCard
          title="Courier Partner"
          value={
            <>
              FastExpress
              <br />
              <span className="text-xs text-gray-500">
                Tracking ID: {order.trackingId || "N/A"}
              </span>
            </>
          }
        />

        <div className="bg-green-600 text-white rounded-2xl p-6 flex flex-col justify-between">
          <h3 className="text-lg font-semibold">Need Help?</h3>
          <button className="mt-4 bg-white text-green-700 py-2 rounded-lg">
            Contact Support
          </button>
        </div>

      </div>

      {/* ITEMS */}
      <div className="bg-white border rounded-2xl p-6">
        <h2 className="font-semibold mb-4">Ordered Items</h2>

        {order.items.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between gap-4 border rounded-xl p-4 mb-3"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div>
                <h3 className="font-medium">{item.product?.name || item.name}</h3>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>
            </div>

            <p className="font-semibold">₹{item.price}</p>
          </div>
        ))}

        {/* PRICE SUMMARY */}
        <div className="border-t mt-6 pt-4 space-y-2 text-sm">

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{order.subtotal}</span>
          </div>

          <div className="flex justify-between">
            <span>GST</span>
            <span>₹{order.gst}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600">
              ₹{order.shippingCost || 0}
            </span>
          </div>

          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>

        </div>

      </div>
    </div>
  );
};

/* COMPONENTS */

const TimelineItem = ({ icon, title, active, current }) => (
  <div className="flex items-start gap-4">
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-full ${
        current
          ? "bg-blue-600 text-white"
          : active
          ? "bg-green-500 text-white"
          : "bg-gray-200 text-gray-500"
      }`}
    >
      {icon}
    </div>

    <p className={`font-medium ${current ? "text-blue-600" : ""}`}>{title}</p>
  </div>
);

const InfoCard = ({ title, value }) => (
  <div className="bg-white border rounded-2xl p-6">
    <h3 className="font-semibold mb-1">{title}</h3>
    <p className="text-sm text-gray-600">{value}</p>
  </div>
);

export default OrderDetails;
