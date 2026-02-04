import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import API, { logoutUser } from "../../api/axios";
import graphura from "../../assets/graphuralogo/graphura.webp";


import {
  FaBars,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
  FaUser,
  FaBox,
  FaTruck,
  FaMapMarkerAlt,
  FaFileInvoice,
  FaHome,
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

  /* ================= FETCH DASHBOARD DATA ================= */

  useEffect(() => {
 if (!token) return navigate("/user/login");

 API.get("/user/dashboard/me")
 .then(res => {
   console.log("DASHBOARD USER:", res.data);
   setUser(res.data.user);
 })
 .catch(err => console.log("ME ERROR:", err.response?.data || err));


 API.get("/user/dashboard/notifications")
  .then(res => setNotifications(res.data.notifications))
  .catch(() => setNotifications([]));

 API.get("/user/dashboard/orders/my")
 .then(res => {
   console.log("ORDERS:", res.data);
   setOrders(res.data);
 });

}, []);


const logout = async () => {
  await logoutUser();
  navigate("/user/login");
};


  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">

      {/* SIDEBAR */}
      <aside
        className={`fixed md:static z-40 w-64 h-full transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300
        bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200`}
      >
         <div className="p-6 flex flex-col h-full">
          <h2 className="text-xl font-bold text-gray-900 mb-8">My Account</h2>

          <nav className="space-y-2 text-sm flex-1">
            <SidebarLink icon={<FaUser />} to="/user/dashboard/me" title="My Profile" />
            <SidebarLink icon={<FaBox />} to="/user/dashboard/orders/my" title="Orders" />
            <SidebarLink icon={<FaTruck />} to="/user/dashboard/track-order" title="Track Order" />
            <SidebarLink icon={<FaMapMarkerAlt />} to="/user/dashboard/address" title="Addresses" />
            <SidebarLink icon={<FaFileInvoice />} to="/user/dashboard/invoices" title="Invoices" />
          </nav>

          <button onClick={logout} className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-100 transition font-medium">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

          {/* Navbar */}
        <header className="bg-white shadow-sm sticky top-0 z-30 px-4 md:px-6 py-3">
          <div className="flex justify-between items-center">
            {/* Left */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden text-xl p-2 rounded-lg hover:bg-gray-100"
              >
                <FaBars />
              </button>

              <div className="flex items-center justify-start">
                <a href="/">
                  <img
                    className="w-auto h-15"
                    src={graphura}
                    alt="Graphura Logo"
                  />
                </a>
              </div>

              <a
                href="/"
                className="
                  flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium
                  text-gray-700
                  bg-gray-100
                  transition-all duration-300
                  hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600
                  hover:text-white
                  hover:shadow-lg
                  hover:-translate-y-0.5
                "
              >
                <FaHome className="text-xs" />
                Home
              </a>
            </div>

            {/* Right */}
            <div className="flex items-center gap-5 relative">
              {/* Notification */}
              <div className="relative">
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  className="relative p-2 rounded-full hover:bg-gray-100 transition"
                >
                  <FaBell />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
                    2
                  </span>
                </button>

                {notifOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-xl overflow-hidden">
                    {notifications.length === 0 && (
                      <p className="p-3 text-sm">No notifications</p>
                    )}

                    {notifications.map((n, i) => (
                      <p key={i} className="p-3 text-sm text-gray-600 border-t">
                        {n}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* PROFILE */}
              <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-3 p-1 rounded-lg hover:bg-gray-100">
                  <span>Hello, <strong>{user?.name}</strong></span>

                  <div className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                    {user?.name?.[0]}
                  </div>
                </button>

                     {profileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl text-sm overflow-hidden">
                    <button className="w-full px-4 py-3 flex items-center gap-2 hover:bg-gray-100">
                      <FaUserCircle /> Profile
                    </button>
                    <button className="w-full px-4 py-3 flex items-center gap-2 hover:bg-gray-100">
                      <FaCog /> Settings
                    </button>
                    <button onClick={logout} className="w-full px-4 py-3 flex items-center gap-2 text-red-500 hover:bg-red-50">
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet context={{ user, orders }} />
        </main>

      </div>
    </div>
  );
};

/* Sidebar Link */
const SidebarLink = ({ to, title, close, icon }) => (
  <NavLink
    to={to}
    onClick={close}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
       ${
         isActive
           ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
           : "text-gray-700 hover:bg-gray-200 hover:translate-x-1"
       }`
    }
  >
    <span className="text-lg">{icon}</span>
    {title}
  </NavLink>
);


export default DashboardLayout;
