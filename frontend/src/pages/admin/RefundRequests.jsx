import { useEffect, useState } from "react";
import API from "../../api/axios";
import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";

const RefundRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRefundRequests();
  }, []);

  const fetchRefundRequests = async () => {
    try {
      const res = await API.get("/admin/refunds");
      setRequests(res.data);
    } catch (error) {
      console.error("Error fetching refund requests:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-500">Loading refund requests...</p>;
  }

  return (
  <div className="flex bg-gray-50 min-h-screen">
    {/* Sidebar */}
    <Sidebar />

    {/* Main */}
    <div className="flex-1">
      <Header />

      <main className="p-8 max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold">
              Refund / Return Requests
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Review and process customer refund or return requests
            </p>
          </div>

          <span className="text-sm text-gray-500">
            {requests.length} total requests
          </span>
        </div>

        {/* Empty State */}
        {requests.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <div className="text-5xl mb-3">💸</div>
            <p className="font-semibold">No refund requests</p>
            <p className="text-sm">All good for now</p>
          </div>
        )}

        {/* Requests List */}
        <div className="space-y-6">
          {requests.map((r) => (
            <div
              key={r._id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              {/* Top Row */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-gray-900">
                    Order #{r.order?._id?.slice(-6)}
                  </p>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        r.type === "refund"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                  >
                    {r.type.toUpperCase()}
                  </span>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      r.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : r.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {r.status}
                </span>
              </div>

              {/* User Info */}
              <div className="text-sm text-gray-700 space-y-1">
                {/* <p>
                  <span className="font-medium">User:</span>{" "}
                  {r.user?.name}{" "}
                  <span className="text-gray-500">
                    ({r.user?.email})
                  </span>
                </p> */}
              </div>

              {/* Bank Details */}
              <div className="mt-4 p-4 bg-gray-50 rounded-xl text-sm text-gray-700 space-y-1">
                <p className="font-semibold text-gray-800 mb-1">
                  Refund Details
                </p>
                <p>
                  <b>Bank:</b> {r.bankDetails?.bankName}
                </p>
                <p>
                  <b>Account Holder:</b>{" "}
                  {r.bankDetails?.accountHolder}
                </p>
                <p>
                  <b>Account Number:</b>{" "}
                  {r.bankDetails?.accountNumber}
                </p>
                <p>
                  <b>IFSC:</b> {r.bankDetails?.ifsc}
                </p>
                {r.bankDetails?.upi && (
                  <p>
                    <b>UPI:</b> {r.bankDetails.upi}
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
                <span>
                  Requested on{" "}
                  {new Date(r.createdAt).toLocaleString()}
                </span>

                {/* Future action buttons */}
                {/* 
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-lg bg-green-600 text-white text-xs">
                    Approve
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-red-600 text-white text-xs">
                    Reject
                  </button>
                </div>
                */}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  </div>
);

};

export default RefundRequests;
