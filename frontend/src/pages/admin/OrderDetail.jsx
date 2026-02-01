import Sidebar from "../../components/admin/Sidebar";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import OrderTimeline from "../../components/admin/OrderTimeline";
import { generateInvoice } from "../../utils/generateInvoice";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    const res = await API.get(`/orders/${id}`);
    setOrder(res.data.order);
    setStatus(res.data.order.status);
  };

  const updateStatus = async () => {
    await API.put(`/orders/${id}`, { status });
    fetchOrder();
  };

  if (!order) return null;

  return (
    <div className="flex min-h-screen bg-background-light">
      <Sidebar />

      <motion.main className="flex-1 p-8 max-w-[1400px] mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-4xl font-black">Order #{order._id}</h1>

          <button
            onClick={() => generateInvoice(order)}
            className="bg-black text-white px-5 py-3 rounded-xl flex gap-2"
          >
            <Download size={18} /> Invoice
          </button>
        </div>

        {/* Status Update */}
        <div className="mb-6 flex gap-4">
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="border p-3 rounded-xl"
          >
            <option>Pending</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Returned</option>
          </select>

          <button
            onClick={updateStatus}
            className="bg-green-600 text-white px-5 rounded-xl"
          >
            Update Status
          </button>
        </div>

        {/* Customer */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <Card title="Customer">
            <Info label="Name" value={order.user.name} />
            <Info label="Email" value={order.user.email} />
          </Card>

          <Card title="Summary">
            <Info label="Total" value={`₹${order.totalAmount}`} bold />
            <Info label="Payment" value={order.paymentStatus} />
          </Card>

          <Card title="Refund">
            <button className="bg-red-500 text-white px-4 py-2 rounded">
              Initiate Refund
            </button>
          </Card>
        </div>

        {/* Items */}
        <div className="bg-white p-6 rounded-xl border mb-6">
          {order.items.map((i, idx) => (
            <div key={idx} className="flex justify-between border-b py-2">
              <span>{i.product.name}</span>
              <span>{i.quantity}</span>
              <span>₹{i.price}</span>
            </div>
          ))}
        </div>

        <OrderTimeline status={order.status} />
      </motion.main>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-xl border">
      <h3 className="font-bold mb-2">{title}</h3>
      {children}
    </div>
  );
}

function Info({ label, value, bold }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className={bold ? "font-bold" : ""}>{value}</span>
    </div>
  );
}
