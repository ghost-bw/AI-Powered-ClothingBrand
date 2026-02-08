import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { logoutUser } from "../../api/axios";
import API from "../../api/axios";
import logo from "../../assets/logo/logo.webp";

export default function Sidebar() {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [admin,setAdmin]=useState({});

  /* LOAD ADMIN PROFILE */

  useEffect(()=>{
    fetchAdmin();
  },[]);

  const fetchAdmin = async()=>{
    try{
      const res = await API.get("/admin/profile");
      setAdmin(res.data);
    }catch(err){
      console.log("Admin fetch error",err);
    }
  };

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Products", icon: Package, path: "/admin/products" },
    { name: "Orders", icon: ShoppingBag, path: "/admin/orders" },
    { name: "Customers", icon: Users, path: "/admin/customers" },
    { name: "Analytics", icon: BarChart2, path: "/admin/analytics" },
    { name: "Inventory", icon: Package, path: "/admin/inventory" },
     { name: "Payments", icon: ShoppingBag, path: "/admin/payments" },
  ];

  return (

<aside className="w-72 h-screen sticky top-0 bg-white shadow-sm flex flex-col px-6 py-6">

{/* LOGO */}
<div className="flex justify-center mb-6">
<img src={logo} alt="Graphura" className="h-14 w-auto"/>
</div>

{/* NAVIGATION */}
<nav className="flex flex-col gap-2 flex-1">

{menu.map(item=>{
 const Icon=item.icon;

 return(

<NavLink key={item.name} to={item.path}
className={({isActive})=>
`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition
${isActive?"bg-black text-white shadow-md":"text-gray-600 hover:bg-gray-100"}`
}>

<Icon size={18}/>
{item.name}

</NavLink>

);
})}

</nav>

<div className="border-t my-4"/>

{/* SETTINGS */}
<NavLink to="/admin/settings"
className={({isActive})=>
`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition
${isActive?"bg-black text-white":"text-gray-600 hover:bg-gray-100"}`
}>
<Settings size={18}/>
Settings
</NavLink>

{/* ADMIN USER */}
<div className="relative mt-4">

<button onClick={()=>setOpen(!open)}
className="w-full flex items-center gap-3 bg-gray-50 p-3 rounded-xl hover:bg-gray-100 transition">

{admin.avatar ? (
<img src={admin.avatar} className="w-10 h-10 rounded-full object-cover shadow border"/>
) : (
<div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
{admin.email?.[0]?.toUpperCase()}
</div>
)}

<div className="text-left">
<p className="text-sm font-semibold">{admin.email || "Admin"}</p>
<p className="text-xs text-gray-500">{admin.role || "Admin"}</p>
</div>

</button>

{open && (

<div className="absolute bottom-16 left-0 w-full bg-white border rounded-xl shadow-lg overflow-hidden">

<button onClick={()=>{setOpen(false);navigate("/admin/settings");}}
className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 w-full text-sm">

<User size={16}/>
Profile / Settings

</button>

<button onClick={logoutUser}
className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 w-full text-sm">

<LogOut size={16}/>
Logout

</button>

</div>

)}

</div>

</aside>

);
}
