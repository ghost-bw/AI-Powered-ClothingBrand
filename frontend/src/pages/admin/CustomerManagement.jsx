import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import CustomerTable from "../../components/admin/CustomerTable";
import CustomerDetail from "../../components/admin/CustomerDetail";
import StatsCard from "../../components/admin/StatsCard";
import { exportToCSV } from "../../utils/exportCSV";
import Header from "../../components/admin/Header";
import API from "../../api/axios";

import {
  Download,
  UserPlus,
  Users,
  UserCheck,
  Repeat,
  UserX,
} from "lucide-react";

export default function CustomerManagement() {

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customersData, setCustomersData] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/admin/dashboard/customers", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // console.log("CUSTOMERS:", res.data);
      setCustomersData(res.data);

    } catch (err) {
      console.log("CUSTOMER ERROR:", err.response?.data || err.message);
    }
  };

  const totalCustomers = customersData.length;
  const repeatCustomers = customersData.filter(c => c.orders > 1).length;
  const inactiveCustomers = customersData.filter(c => c.orders === 0).length;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 px-10 py-8 max-w-[1600px] mx-auto">

          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <h1 className="text-4xl font-extrabold text-gray-900">
                Customer Directory
              </h1>
              <p className="text-gray-500 mt-1">
                Manage and analyze your customer base
              </p>
            </div>

            <div className="flex gap-3">

              <button
                onClick={() => exportToCSV(customersData, "customers.csv")}
                className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-xl hover:shadow-sm transition"
              >
                <Download size={18} />
                Export CSV
              </button>

              {/* <button
                onClick={() => navigate("/admin/customers/create")}
                className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:opacity-90 transition"
              >
                <UserPlus size={18} />
                Add Customer
              </button> */}

            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

            <StatsCard
              title="Total Customers"
              value={totalCustomers}
              icon={<Users size={16} />}
            />

            <StatsCard
              title="New This Month"
              value={totalCustomers}
              icon={<UserCheck size={16} />}
            />

            <StatsCard
              title="Repeat Customers"
              value={repeatCustomers}
              icon={<Repeat size={16} />}
            />

            <StatsCard
              title="Inactive"
              value={inactiveCustomers}
              icon={<UserX size={16} />}
            />

          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

            <div className="xl:col-span-2">
              <CustomerTable data={customersData} onSelect={setSelectedCustomer} />
            </div>

            <CustomerDetail customer={selectedCustomer} />

          </div>

        </main>
      </div>
    </div>
  );
}
