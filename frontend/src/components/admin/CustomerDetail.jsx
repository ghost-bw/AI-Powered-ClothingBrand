import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function CustomerDetail({ customer }) {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (customer?._id) fetchOrders();
  }, [customer]);

  const fetchOrders = async () => {
    try {
      const res = await API.get(`/admin/dashboard/customer-orders/${customer._id}`);
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!customer) {
    return (
      <div className="bg-white border rounded-2xl p-6 text-center text-gray-400">
        Select a customer to view details
      </div>
    );
  }

  const avgOrder =
    customer.orders > 0
      ? Math.round(customer.spend / customer.orders)
      : 0;

  return (
    <div className="bg-white border rounded-2xl p-6">

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
          {customer.name?.[0]}
        </div>

        <div>
          <h2 className="text-xl font-bold">{customer.name}</h2>
          <p className="text-sm text-gray-500">{customer.email}</p>

          <span className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${
            customer.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}>
            {customer.status}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <MiniStat title="Total Spend" value={`₹${customer.spend}`} />
        <MiniStat title="Orders" value={customer.orders} />
        <MiniStat title="Avg Order" value={`₹${avgOrder}`} />
      </div>

      {/* Order History */}
      <h3 className="font-semibold mb-2">Order History</h3>

      <ul className="text-sm space-y-2">
        {orders.map(o => (
          <li key={o._id} className="flex justify-between">
            <span>#{o._id.slice(-6)}</span>
            <span className="text-gray-600">₹{Math.round(o.total)}</span>
          </li>
        ))}

        {!orders.length && (
          <p className="text-gray-400">No orders yet</p>
        )}
      </ul>

    </div>
  );
}

function MiniStat({ title, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 text-center">
      <p className="text-xs text-gray-500">{title}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
}
