import React, { useState } from "react";
import {
  User,
  Package,
  MapPin,
  FileText,
  LogOut,
  CheckCircle,
  Clock,
  Truck,
} from "lucide-react";

// Mock Data simulating Backend Response
const MOCK_USER = {
  name: "Ashirwad Kumar",
  email: "ashirwadgraphura@gmail.com",
  phone: "+91 7378021327",
};

const MOCK_ORDERS = [
  {
    id: "ORD-1111",
    date: "2026-01-26",
    total: "₹2,499",
    status: "Delivered",
    items: ["Cotton Oversized T-Shirt", "Slim Fit Denim Jeans"],
    trackingStep: 4, // 1: Placed, 2: Processed, 3: Shipped, 4: Delivered
  },
  {
    id: "ORD-1122",
    date: "2026-01-27",
    total: "₹1,199",
    status: "Shipped",
    items: ["Floral Summer Dress"],
    trackingStep: 3,
  },
];

const MOCK_ADDRESSES = [
  {
    id: 1,
    type: "Home",
    address: "DDA-Flat-12, Faridabad, Haryana - 121101",
  },
  {
    id: 2,
    type: "Work",
    address: "Graphura India Private Limited, Gurgaon, Haryana - 122001",
  },
];

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");

  // Sidebar Navigation Component
  const Sidebar = () => (
    <div className="w-full md:w-64 bg-white shadow-sm rounded-lg h-fit">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">My Account</h2>
        <p className="text-sm text-gray-500">Welcome, {MOCK_USER.name}</p>
      </div>
      <nav className="p-4 space-y-2">
        <button
          onClick={() => setActiveTab("orders")}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "orders" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
        >
          <Package size={20} />
          <span>My Orders</span>
        </button>
        <button
          onClick={() => setActiveTab("tracking")}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "tracking" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
        >
          <Truck size={20} />
          <span>Track Order</span>
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "profile" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
        >
          <User size={20} />
          <span>Profile Details</span>
        </button>
        <button
          onClick={() => setActiveTab("addresses")}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === "addresses" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
        >
          <MapPin size={20} />
          <span>Addresses</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors mt-4">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );

  // Content Components
  const OrdersView = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800">Order History</h3>
      {MOCK_ORDERS.map((order) => (
        <div
          key={order.id}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-semibold text-lg text-blue-600">{order.id}</p>
              <p className="text-sm text-gray-500">Placed on {order.date}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800">{order.total}</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
              >
                {order.status}
              </span>
            </div>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-2">Items:</p>
            <ul className="list-disc list-inside text-gray-700 text-sm mb-4">
              {order.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <button className="flex items-center text-sm text-blue-600 hover:underline">
              <FileText size={16} className="mr-1" /> Download Invoice
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const TrackingView = () => {
    // Simulating tracking for the first order
    const activeOrder = MOCK_ORDERS[1];
    const steps = ["Order Placed", "Processing", "Shipped", "Delivered"];

    return (
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Live Tracking</h3>
        <div className="mb-8 p-4 bg-blue-50 rounded-md border border-blue-100">
          <p className="font-semibold text-blue-800">
            Tracking ID: {activeOrder.id}
          </p>
          <p className="text-sm text-blue-600">
            Expected Delivery: Feb 05, 2026
          </p>
        </div>

        {/* Visual Tracking Stepper */}
        <div className="relative flex justify-between w-full max-w-2xl mx-auto">
          {/* Progress Bar Background */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-0 transform -translate-y-1/2"></div>
          {/* Active Progress Bar */}
          <div
            className="absolute top-1/2 left-0 h-1 bg-blue-600 -z-0 transform -translate-y-1/2 transition-all duration-500"
            style={{
              width: `${((activeOrder.trackingStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          ></div>

          {steps.map((step, index) => {
            const isCompleted = index + 1 <= activeOrder.trackingStep;
            const isCurrent = index + 1 === activeOrder.trackingStep;

            return (
              <div
                key={step}
                className="relative z-10 flex flex-col items-center"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    isCompleted
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-gray-300 text-gray-300"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle size={16} />
                  ) : (
                    <Clock size={16} />
                  )}
                </div>
                <p
                  className={`mt-2 text-xs font-medium ${isCurrent ? "text-blue-600" : "text-gray-500"}`}
                >
                  {step}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const ProfileView = () => (
    <div className="bg-white p-8 rounded-lg shadow-sm">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Profile Details</h3>
      <form className="space-y-4 max-w-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            defaultValue={MOCK_USER.name}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            defaultValue={MOCK_USER.email}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            defaultValue={MOCK_USER.phone}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="pt-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="rounded text-blue-600"
            />
            <span className="text-sm text-gray-600">
              Receive order updates via WhatsApp
            </span>
          </label>
        </div>
        <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors">
          Save Changes
        </button>
      </form>
    </div>
  );

  const AddressesView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">Saved Addresses</h3>
        <button className="text-sm bg-blue-50 text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-100">
          + Add New Address
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_ADDRESSES.map((addr) => (
          <div
            key={addr.id}
            className="border p-4 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between mb-2">
              <span className="font-bold text-gray-700">{addr.type}</span>
              <div className="space-x-2 text-sm text-gray-500">
                <button className="hover:text-blue-600">Edit</button>
                <button className="hover:text-red-600">Delete</button>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {addr.address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  // Main Render
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Dashboard</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Area */}
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1">
            {activeTab === "orders" && <OrdersView />}
            {activeTab === "tracking" && <TrackingView />}
            {activeTab === "profile" && <ProfileView />}
            {activeTab === "addresses" && <AddressesView />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
