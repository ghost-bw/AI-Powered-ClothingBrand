import { useEffect, useState } from "react";
// import API from "axios";
import API from "../../api/axios";


export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const token = localStorage.getItem("token");

  const fetchInvoices = async () => {
    try {
      const res = await API.get(
        "http://localhost:4000/api/user/dashboard/invoices",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("INVOICES:", res.data);

      setInvoices(res.data.invoices || []);
    } catch (err) {
      console.error("INVOICE ERROR:", err.response?.data || err);
      setInvoices([]);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

 const handleDownload = async (id) => {
  try {
    const res = await API.get(
      `/user/dashboard/invoices/${id}/download`,
      {
        responseType: "blob",
      }
    );

    const blob = new Blob([res.data], { type: "application/pdf" }); // 🔥 FORCE PDF

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice-${id}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error(err);
    alert("Invoice download failed");
  }
};

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-xl font-semibold">Invoices</h2>
        <p className="text-sm text-gray-500">
          Download your GST invoices for completed orders
        </p>
      </div>

      <div className="hidden md:block bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-left">Invoice ID</th>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((inv) => (
              <tr key={inv._id} className="border-b last:border-none">
                <td className="p-4 font-medium">INV-{inv._id.slice(-5)}</td>
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

      <div className="md:hidden space-y-4">
        {invoices.map((inv) => (
          <div key={inv._id} className="bg-white border rounded-xl p-4 space-y-3">
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
              <span>{new Date(inv.createdAt).toLocaleDateString()}</span>
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
