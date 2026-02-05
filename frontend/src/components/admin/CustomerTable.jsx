import { useState, useMemo } from "react";

export default function CustomerTable({ data = [], onSelect }) {

  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    return data.filter(c =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  return (
    <div className="bg-white no-border rounded-2xl p-6">

      <input
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-4 py-3 no-border rounded-xl"
      />

      <table className="w-full text-sm">
        <thead className="text-gray-500">
          <tr>
            <th className="pb-3 text-left">Customer</th>
            <th>Email</th>
            <th>Orders</th>
            <th>Spend</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredCustomers.map((c, i) => (
            <tr
              key={i}
              onClick={() => onSelect(c)}
              className="border-t cursor-pointer hover:bg-gray-50"
            >
              <td className="py-3 font-semibold text-blue-600">
                {c.name}
              </td>

              <td>{c.email}</td>

              <td>{c.orders}</td>

              <td>₹{c.spend}</td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
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
  );
}
