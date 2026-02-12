import { useState, useRef, useEffect } from "react";
import {
  Bell,
  MessageCircle,
  ChevronDown,
  LogOut,
  User,
  CheckCircle,
  AlertTriangle,
  Package,
  ShoppingCart,
  Users,
  TicketPercent,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

export default function Header({ onMenuClick }) {
  const navigate = useNavigate();

  const [adminOpen, setAdminOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [admin, setAdmin] = useState({});

  const adminRef = useRef(null);
  const notifRef = useRef(null);

  /* LOAD ADMIN PROFILE */
  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      const res = await API.get("/admin/profile");
      setAdmin(res.data);
    } catch (err) {
      console.log("Admin fetch error", err);
    }
  };

  /* CLOSE DROPDOWNS */
  useEffect(() => {
    const handler = (e) => {
      if (adminRef.current && !adminRef.current.contains(e.target))
        setAdminOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target))
        setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* NOTIFICATIONS */
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Payment Successful",
      message: "Order #1245 payment completed",
      time: "2 min ago",
      unread: true,
      route: "/admin/orders/1245",
      icon: <CheckCircle size={16} className="text-green-600" />,
    },
    {
      id: 2,
      title: "Low Stock Alert",
      message: "Onyx / M stock is low",
      time: "1 hour ago",
      unread: true,
      route: "/admin/inventory",
      icon: <AlertTriangle size={16} className="text-orange-500" />,
    },
    {
      id: 3,
      title: "New Customer",
      message: "Ayesha Khan registered",
      time: "Yesterday",
      unread: false,
      route: "/admin/customers",
      icon: <Users size={16} className="text-blue-600" />,
    },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleNotificationClick = (id, route) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, unread: false } : n))
    );
    setNotifOpen(false);
    navigate(route);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm">
      <div className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          {/* 🍔 MOBILE MENU */}
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={22} />
          </button>

          <h1 className="hidden sm:block font-bold text-lg text-gray-800">
            Admin Panel
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 sm:gap-4">

          <button
            onClick={() => navigate("/admin/coupons")}
            className="p-2 rounded-xl hover:bg-blue-50 text-blue-600"
          >
            <TicketPercent size={20} />
          </button>

          <button
            onClick={() => navigate("/admin/whatsapp")}
            className="p-2 rounded-xl hover:bg-green-50 text-green-600"
          >
            <MessageCircle size={20} />
          </button>

          {/* NOTIFICATIONS */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-xl hover:bg-gray-100"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-3 w-80 bg-white border rounded-xl shadow-xl">
                <div className="flex justify-between items-center px-4 py-3 border-b">
                  <span className="font-semibold">Notifications</span>
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Mark all as read
                  </button>
                </div>

                {notifications.map(n => (
                  <div
                    key={n.id}
                    onClick={() => handleNotificationClick(n.id, n.route)}
                    className={`flex gap-3 px-4 py-3 text-sm cursor-pointer
                    hover:bg-gray-100 ${n.unread ? "bg-gray-50" : ""}`}
                  >
                    {n.icon}
                    <div>
                      <p className="font-medium">{n.title}</p>
                      <p className="text-xs text-gray-500">{n.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                    </div>
                  </div>
                ))}

                <div
                  onClick={() => navigate("/admin/notifications")}
                  className="px-4 py-3 text-sm text-center font-semibold
                             text-blue-600 hover:bg-blue-50 cursor-pointer border-t"
                >
                  View all notifications
                </div>
              </div>
            )}
          </div>

          {/* ADMIN */}
          <div ref={adminRef} className="relative">
            <button
              onClick={() => setAdminOpen(!adminOpen)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100"
            >
              {admin.avatar ? (
                <img
                  src={admin.avatar}
                  className="w-9 h-9 rounded-full object-cover border"
                  alt="admin"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                  {admin.email?.[0]?.toUpperCase()}
                </div>
              )}
              <ChevronDown size={16} />
            </button>

            {adminOpen && (
              <div className="absolute right-0 top-12 w-64 bg-white border rounded-xl shadow-xl">
                <div className="p-4 border-b">
                  <p className="font-semibold">{admin.email}</p>
                  <p className="text-sm text-gray-500">{admin.role}</p>
                </div>

                <div className="p-2 text-sm">
                  <div
                    onClick={() => navigate("/admin/settings")}
                    className="flex gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    <User size={16} /> Profile / Settings
                  </div>

                  <div
                    onClick={handleLogout}
                    className="flex gap-2 p-2 hover:bg-red-50 text-red-600 rounded cursor-pointer"
                  >
                    <LogOut size={16} /> Logout
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
