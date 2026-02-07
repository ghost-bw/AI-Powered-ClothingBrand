import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function CustomerDetail({ customer }) {

  const [orders, setOrders] = useState([]);

 useEffect(() => {
  if (customer?._id) fetchOrders();
}, [customer?._id]);


 const fetchOrders = async () => {
  try {
    const token = localStorage.getItem("admin_token");

    const res = await API.get(
      `/orders/admin/dashboard/customer-orders/${customer._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setOrders(res.data || []);
    console.log("CUSTOMER ORDERS:", res.data);

  } catch (err) {
    console.log("Customer orders fetch error:", err);
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
    <div className="bg-white no-border rounded-2xl p-6">

      {/* Header */}
     {/* Header */}
<div className="flex items-center gap-4 mb-6">

  <div className="w-14 h-14 rounded-full bg-black text-white
  flex items-center justify-center text-2xl font-semibold uppercase shadow">

    {customer.name?.charAt(0)}

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
   <div className="max-h-48 overflow-y-auto pr-2">
  <ul className="text-sm space-y-2">
    {orders && orders.length > 0 ? (
      orders.map(o => (
        <li
          key={o._id}
          className="flex justify-between items-center p-2 rounded-lg
          hover:bg-gray-50 transition"
        >
          <span className="font-medium text-blue-600">
            #{o._id.slice(-6)}
          </span>
          <span className="text-gray-600">
            ₹{Math.round(o.total)}
          </span>
        </li>
      ))
    ) : (
      <p className="text-gray-400 text-center py-4">
        No orders yet
      </p>
    )}
  </ul>
</div>
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
