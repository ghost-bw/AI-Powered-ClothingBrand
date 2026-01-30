import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaBars,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [orders, setOrders] = useState([]);


  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /* FETCH LOGGED USER */

 useEffect(() => {
  if (!token) return navigate("/login");

  axios
    .get("http://localhost:4000/api/user/dashboard/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setUser(res.data.user);
    })
    .catch(() => {
      localStorage.clear();
      navigate("/login");
    });

  axios
    .get("http://localhost:4000/api/user/dashboard/notifications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => setNotifications(res.data.notifications))
    .catch(() => setNotifications([]));

    /* MY ORDERS */

  axios
    .get("http://localhost:4000/api/user/dashboard/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => setOrders(res.data.orders));
}, []);


  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">

      {/* SIDEBAR */}
      <aside
        className={`fixed md:static z-40 w-64 bg-white border-r h-full transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition`}
      >
        <div className="p-6 space-y-6">
          <h2 className="text-xl font-semibold">My Account</h2>

          <nav className="space-y-2 text-sm">
            <SidebarLink to="me" title="My Profile" close={() => setSidebarOpen(false)} />
            <SidebarLink to="orders" title="Orders" close={() => setSidebarOpen(false)} />
            <SidebarLink to="track-order" title="Track Order" close={() => setSidebarOpen(false)} />
            <SidebarLink to="address" title="Addresses" close={() => setSidebarOpen(false)} />
            <SidebarLink to="invoices" title="Invoices" close={() => setSidebarOpen(false)} />
          </nav>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        <header className="bg-white border-b sticky top-0 z-30 px-4 py-3">
          <div className="flex justify-between items-center">

            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-xl">
                <FaBars />
              </button>
              <h1 className="font-semibold text-lg">Dashboard</h1>
            </div>

            <div className="flex items-center gap-5 relative">

              {/* Notifications */}
              <div className="relative">
                <button onClick={() => setNotifOpen(!notifOpen)} className="text-xl">
                  <FaBell />
                </button>

                {notifOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white border rounded shadow">
                    {notifications.map((n, i) => (
                      <p key={i} className="p-3 text-sm">
                        {n}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex gap-2 items-center">
                  <span>Hello, <strong>{user?.name}</strong></span>

                  <div className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center">
                    {user?.name?.[0]}
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border rounded shadow text-sm">
                    <button className="w-full px-4 py-2 flex gap-2 hover:bg-gray-100">
                      <FaUserCircle /> Profile
                    </button>

                    <button className="w-full px-4 py-2 flex gap-2 hover:bg-gray-100">
                      <FaCog /> Settings
                    </button>

                    <button
                      onClick={logout}
                      className="w-full px-4 py-2 flex gap-2 text-red-500 hover:bg-gray-100"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
        <Outlet context={{ user }} />

        </main>

      </div>
    </div>
  );
};

const SidebarLink = ({ to, title, close }) => (
  <NavLink
    to={to}
    onClick={close}
    className={({ isActive }) =>
      `block px-4 py-2 rounded transition font-medium ${
        isActive ? "bg-black text-white" : "hover:bg-gray-100"
      }`
    }
  >
    {title}
  </NavLink>
);

export default DashboardLayout;
