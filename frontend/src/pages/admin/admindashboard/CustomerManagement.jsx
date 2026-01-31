import { useState } from "react";
import Sidebar from "../../../components/admin/Sidebar";

import CustomerTable from "../../../components/admin/CustomerTable";
import CustomerDetail from "../../../components/admin/CustomerDetail";
import { Download, UserPlus } from "lucide-react";

export default function CustomerManagement() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  return (
    <div className="flex bg-background-light min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black mb-2">
              Customer Directory
            </h1>
            <p className="text-gray-500">
              Manage and analyze your customer base
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border px-5 py-3 rounded-xl">
              <Download size={18} />
              Export CSV
            </button>
            <button className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl">
              <UserPlus size={18} />
              Add Customer
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          <Stat title="Total Customers" value="12,480" />
          <Stat title="New This Month" value="840" />
          <Stat title="Repeat Customers" value="4,215" />
          <Stat title="Inactive" value="1,102" />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left */}
          <div className="xl:col-span-2">
            <CustomerTable onSelect={setSelectedCustomer} />
          </div>

          {/* Right */}
          <CustomerDetail customer={selectedCustomer} />
        </div>
      </main>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-2xl border">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
}
