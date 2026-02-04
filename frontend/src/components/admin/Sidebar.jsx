import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo/logo.webp";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  BarChart2,
  Settings,
  LogOut,
  User,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      name: "Products", 
      icon: Package,
      path: "/admin/products",
    },
    {
      name: "Orders",
      icon: ShoppingBag,
      path: "/admin/orders",
    },
    {
      name: "Customers",
      icon: Users,
      path: "/admin/customers",
    },
    {
      name: "Analytics",
      icon: BarChart2,
      path: "/admin/analytics",
    },
  ];

  return (
    <aside className="w-72 h-screen sticky top-0 bg-white border-r flex flex-col px-6 py-6">
      {/* Logo */}
      <h1 className="text-xl font-black text-primary mb-10">
        <img src={logo} alt="logo" className="h-15 w-40"></img>
      </h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition
                ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="border-t my-4" />

      {/* Settings */}
      <NavLink
        to="/admin/settings"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition
          ${
            isActive
              ? "bg-primary text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`
        }
      >
        <Settings size={18} />
        Settings
      </NavLink>

      {/* Admin User */}
      <div className="relative mt-4">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center gap-3 bg-gray-50 p-3 rounded-xl hover:bg-gray-100 transition"
        >
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
            A
          </div>

       <div className="text-left">
  <h3 className="text-sm font-semibold">Admin</h3>
  <p className="text-xs text-gray-500">Product Admin</p>
</div>

        </button>

        {open && (
          <div className="absolute bottom-16 left-0 w-full bg-white border rounded-xl shadow-lg overflow-hidden">
            <button
              onClick={() => {
                setOpen(false);
                navigate("/admin/settings");
              }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 w-full text-sm"
            >
              <User size={16} />
              Profile / Settings
            </button>

            <button
              onClick={() => alert("Logout logic here")}
              className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 w-full text-sm"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
