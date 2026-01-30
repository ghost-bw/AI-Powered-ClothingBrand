import logo from "../../assets/logo/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { Heart, User, ShoppingBag, LogIn, LogOut,Search,Menu } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
useEffect(() => {
 setIsLoggedIn(!!localStorage.getItem("token"));
}, []);
const handleLogout = () => {
 localStorage.removeItem("token");
 window.location.href = "/";
};


  


  return (
    <nav className="w-full border-b bg-white/60 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 py-2 flex items-center justify-between">
        {/* Logo */}
        <a href="/">
          <div className="text-lg font-bold tracking-wide flex items-center gap-2">
            <img src={logo} alt="logo" className="h-15 w-40"></img>
          </div>
        </a>

        {/* Left Links */}
        <ul className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          <li><a href="/men" className="hover:text-black cursor-pointer">Men</a></li>
          <li><a href="/" className="hover:text-black cursor-pointer">Women</a></li>
          <li><a href="/" className="hover:text-black cursor-pointer">Kid's</a></li>
          <li><a href="/collections" className="hover:text-black cursor-pointer">Collections</a></li>
        </ul>

        {/* Right Icons */}
        <div className="hidden md:flex items-center gap-5">
          
          <Search size={16} className="text-slate-500" />
                        <input
                          type="text"
                          placeholder="Search products..."
                          className="
                      ml-2 text-sm outline-none
                      bg-transparent w-40
                      placeholder:text-slate-400
                    "
                        />
          <Link to="/favorites">
        <Heart className="w-5 h-5 cursor-pointer" />
      </Link>

      <Link to="/cart">
        <ShoppingBag className="w-5 h-5 cursor-pointer" />
      </Link>

      {/* LOGIN / LOGOUT */}

     {isLoggedIn ? (
  <button
    onClick={handleLogout}
    className="text-sm font-medium text-red-600 hover:text-red-800"
  >
    Logout
  </button>
) : (
  <Link
    to="/user/login"
    className="text-sm font-medium text-gray-700 hover:text-black"
  >
    Login
  </Link>
)}

        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-4 text-sm font-medium text-gray-700">
          <p>Home</p>
          <p>Shop</p>
          <p>Collections</p>
          <p>About</p>

          <div className="flex gap-4 pt-2">
            <Search />
            <User />
            <ShoppingBag />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
