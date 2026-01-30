import { useEffect, useState } from "react";
import axios from "axios";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    const res = await axios.get(
      "http://localhost:4000/api/user/dashboard/invoices",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setInvoices(res.data.invoices);
  };

  const handleDownload = async (id) => {
    window.open(
      `http://localhost:4000/api/user/dashboard/invoices/${id}/download`,
      "_blank"
    );
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-xl font-semibold">Invoices</h2>
        <p className="text-sm text-gray-500">
          Download your GST invoices for completed orders
        </p>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left">
              <th className="p-4">Invoice ID</th>
              <th className="p-4">Order ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Amount</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((inv) => (
              <tr key={inv._id} className="border-b last:border-none">
                <td className="p-4 font-medium">
                  INV-{inv._id.slice(-5)}
                </td>

                <td className="p-4">{inv.orderId}</td>

                <td className="p-4">
                  {new Date(inv.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4 font-semibold">₹{inv.amount}</td>

                <td className="p-4 text-right">
                  <button
                    onClick={() => handleDownload(inv._id)}
                    className="bg-black text-white px-4 py-2 rounded-lg text-xs"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}

            {invoices.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-400">
                  No invoices found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {invoices.map((inv) => (
          <div
            key={inv._id}
            className="bg-white border rounded-xl p-4 space-y-3"
          >
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Invoice ID</span>
              <span className="font-medium">INV-{inv._id.slice(-5)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Order ID</span>
              <span>{inv.orderId}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Date</span>
              <span>
                {new Date(inv.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-xs text-gray-500">Amount</span>
              <span className="font-semibold">₹{inv.amount}</span>
            </div>

            <button
              onClick={() => handleDownload(inv._id)}
              className="w-full bg-black text-white py-2 rounded-lg text-sm"
            >
              Download Invoice
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
