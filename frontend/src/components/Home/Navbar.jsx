import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.webp";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/user/login");
  };

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-2 py-2 flex items-center justify-between">

        {/* Logo */}
        <div
          className="text-lg font-bold tracking-wide flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" className="h-15 w-40" />
        </div>

        {/* Left Links */}
        <ul className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          <li onClick={() => navigate("/")} className="hover:text-black cursor-pointer">
            Home
          </li>
          <li className="hover:text-black cursor-pointer">Shop</li>
          <li onClick={() => navigate("/collections")} className="hover:text-black cursor-pointer">
            Collections
          </li>
          <li className="hover:text-black cursor-pointer">About</li>
        </ul>

        {/* Right Icons (Desktop) */}
        <div className="hidden md:flex items-center gap-5">
          <Search className="w-5 h-5 cursor-pointer" />

          {token ? (
            <button
              onClick={handleLogout}
              className="text-sm font-medium hover:text-red-600"
            >
              Logout
            </button>
          ) : (
            <User
              className="w-5 h-5 cursor-pointer"
              onClick={() => navigate("/user/login")}
            />
          )}

          <ShoppingBag
            className="w-5 h-5 cursor-pointer"
            onClick={() => navigate("/cart")}
          />
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-4 text-sm font-medium text-gray-700">
          <p onClick={() => navigate("/")}>Home</p>
          <p>Shop</p>
          <p onClick={() => navigate("/collections")}>Collections</p>
          <p>About</p>

          <div className="flex gap-4 pt-2">
            <Search />

            {token ? (
              <p
                className="text-red-600 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </p>
            ) : (
              <p
                className="cursor-pointer"
                onClick={() => navigate("/user/login")}
              >
                Login
              </p>
            )}

            <ShoppingBag onClick={() => navigate("/cart")} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
