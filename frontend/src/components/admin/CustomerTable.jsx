import { useState, useMemo } from "react";

export default function CustomerTable({ data = [], onSelect }) {
  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    return data.filter(
      (c) =>
        c.name?.toLowerCase().includes(search.toLowerCase()) ||
        c.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  return (
    <div
      className="bg-white rounded-2xl border border-gray-200
      p-4 sm:p-6 shadow-md transition-all hover:shadow-xl"
    >
      {/* SEARCH */}
      <input
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl
        transition focus:outline-none focus:ring-2 focus:ring-black hover:border-black text-sm"
      />

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="pb-3 text-left">Customer</th>
              <th className="pb-3 text-left">Email</th>
              <th className="pb-3 text-left">Orders</th>
              <th className="pb-3 text-left">Spend</th>
              <th className="pb-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.map((c, i) => (
              <tr
                key={i}
                onClick={() => onSelect(c)}
                className="cursor-pointer transition hover:bg-gray-50 border-b last:border-b-0"
              >
                <td className="py-3 font-semibold text-blue-600">
                  {c.name}
                </td>
                <td>{c.email}</td>
                <td>{c.orders}</td>
                <td>₹{c.spend}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      c.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-3">
        {filteredCustomers.map((c, i) => (
          <div
            key={i}
            onClick={() => onSelect(c)}
            className="border rounded-xl p-4 cursor-pointer
            transition hover:bg-gray-50"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-blue-600 text-sm">
                  {c.name}
                </p>
                <p className="text-xs text-gray-500">
                  {c.email}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  c.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {c.status}
              </span>
            </div>

            <div className="flex justify-between text-xs text-gray-600 mt-3">
              <span>
                Orders: <b className="text-gray-900">{c.orders}</b>
              </span>
              <span>
                Spend: <b className="text-gray-900">₹{c.spend}</b>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
