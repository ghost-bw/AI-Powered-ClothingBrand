import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaArrowLeft,
  FaLock,
  FaUndo,
  FaTimesCircle,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { id: orderId } = useParams();
  const token = localStorage.getItem("token");

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");

  const statusStyle = {
    Delivered: "bg-green-100 text-green-700",
    Shipped: "bg-blue-100 text-blue-700",
    Cancelled: "bg-red-100 text-red-600",
    Returned: "bg-orange-100 text-orange-600",
    Refunded: "bg-gray-200 text-gray-600",
    Processing: "bg-yellow-100 text-yellow-700",
  };

useEffect(() => {
  axios
    .get(`http://localhost:4000/api/user/dashboard/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setOrder(res.data.order || res.data);
      setStatus(res.data.status || res.data.order?.status);
    })
    .catch(console.error);
}, [orderId]);


  if (!order) return null;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-lg mx-auto space-y-5">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
          bg-white border shadow-sm text-sm font-semibold text-gray-700
          transition-all duration-300
          hover:bg-purple-500 hover:text-white hover:shadow-md group"
        >
          <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
          Back to Orders
        </button>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-5 border-b flex justify-between items-start">
            <div>
              <p className="text-base font-bold text-gray-900">
                Order #{order?._id?.slice(-6)}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                statusStyle[status]
              }`}
            >
              {status}
            </span>
          </div>

          {/* ITEMS */}
          <div className="p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-800">
              Item Details
            </h3>

             {order?.items?.map((item) => (

              <div key={item._id} className="flex gap-4">
                <img
                  src={item.image}
                  alt="product"
                  className="w-24 h-24 rounded-xl border object-cover"
                />

                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                  </p>

                  <p className="text-lg font-bold mt-2">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="px-5 py-4 border-t text-sm space-y-2 bg-gray-50">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>₹{order.shippingCost}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">GST</span>
              <span>₹{order.gst}</span>
            </div>

            <div className="flex justify-between font-semibold pt-2 border-t">
              <span>Total</span>
              <span>₹{order.total}</span>
            </div>
          </div>

          {/* Address */}
          <div className="p-5 border-t">
            <h3 className="text-sm font-semibold mb-2">Delivery Address</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {order?.shipping?.fullName}
              <br />
              {order?.shipping?.address}
              <br />
              {order?.shipping?.city}, {order?.shipping?.state} –{" "}
              {order?.shipping?.zip}
              <br />
              India
            </p>
          </div>

          {/* Payment */}
          <div className="p-5 border-t bg-gray-50">
            <div className="flex items-start gap-3">
              <FaLock className="text-gray-500 mt-1" />
              <div>
                <h3 className="text-sm font-semibold">Payment Method</h3>
                <p className="text-xs text-gray-600">
                  {order?.paymentMethod?.toUpperCase()}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Your order & payment information is securely encrypted.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-5 border-t space-y-3">
            {status === "Shipped" && (
              <button
                onClick={() => setStatus("Cancelled")}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                border border-red-500 text-red-600 font-semibold
                hover:bg-red-50 transition"
              >
                <FaTimesCircle /> Cancel Order
              </button>
            )}

            {status === "Delivered" && (
              <>
                <button
                  onClick={() => setStatus("Returned")}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                  border border-orange-500 text-orange-600 font-semibold
                  hover:bg-orange-50 transition"
                >
                  <FaUndo /> Return Order
                </button>

                <button
                  onClick={() => setStatus("Refunded")}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                  border border-gray-400 text-gray-700 font-semibold
                  hover:bg-gray-100 transition"
                >
                  <FaMoneyCheckAlt /> Request Refund
                </button>
              </>
            )}

            {(status === "Returned" || status === "Refunded") && (
              <button
                disabled
                className="w-full py-3 rounded-xl bg-gray-100 text-gray-400 font-semibold"
              >
                Action Completed
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
