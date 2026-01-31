import Sidebar from "../../../components/admin/Sidebar";

import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import OrderTimeline from "../../../components/admin/OrderTimeline";
import { generateInvoice } from "../../utils/generateInvoice";

export default function OrderDetails() {
  const { id } = useParams();

  // Dummy Order Data
  const order = {
    id: `#${id}`,
    date: "12 Oct 2025",
    status: "Delivered",
    payment: "PAID",
    customer: {
      name: "Akhil Verma",
      email: "akhil@gmail.com",
      phone: "+91 98765 43210",
      address: "Mumbai, India",
    },
    items: [
      { name: "Floral Kurta", qty: 1, price: 2499 },
      { name: "Printed Dupatta", qty: 1, price: 1800 },
    ],
    summary: {
      subtotal: 4299,
      shipping: 0,
      total: 4299,
    },
  };

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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black mb-1">
              Order Details
            </h1>
            <p className="text-gray-500">
              Order ID: {order.id}
            </p>
          </div>

          {/* Invoice Button */}
          <button
            onClick={() => generateInvoice(order)}
            className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:opacity-90 transition"
          >
            <Download size={18} />
            Download Invoice
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <Card title="Order Info">
            <Info label="Date" value={order.date} />
            <Info label="Status" value={order.status} />
            <Info label="Payment" value={order.payment} />
          </Card>

          <Card title="Customer">
            <Info label="Name" value={order.customer.name} />
            <Info label="Email" value={order.customer.email} />
            <Info label="Phone" value={order.customer.phone} />
            <Info label="Address" value={order.customer.address} />
          </Card>

          <Card title="Summary">
            <Info label="Subtotal" value={`₹${order.summary.subtotal}`} />
            <Info label="Shipping" value="Free" />
            <hr className="my-2" />
            <Info
              label="Total"
              value={`₹${order.summary.total}`}
              bold
            />
          </Card>
        </div>

        {/* Ordered Items */}
        <div className="bg-white rounded-2xl border p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">
            Ordered Items
          </h2>

          <table className="w-full text-left">
            <thead className="text-gray-500 text-sm">
              <tr>
                <th className="pb-3">Product</th>
                <th className="pb-3">Quantity</th>
                <th className="pb-3">Price</th>
              </tr>
            </thead>

            <tbody>
              {order.items.map((item, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border-t"
                >
                  <td className="py-3 font-medium">
                    {item.name}
                  </td>
                  <td>{item.qty}</td>
                  <td>₹{item.price}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Timeline */}
        <div className="bg-white rounded-2xl border p-6">
          <h2 className="text-xl font-bold mb-4">
            Order Timeline
          </h2>
          <OrderTimeline status={order.status} />
        </div>
      </motion.main>
    </div>
  );
}

/* Reusable Components */
function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border p-6">
      <h3 className="font-bold mb-4">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Info({ label, value, bold }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className={bold ? "font-bold" : ""}>{value}</span>
    </div>
  );
}
