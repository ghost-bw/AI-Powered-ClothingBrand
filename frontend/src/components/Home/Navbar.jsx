import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  Heart,
  LogIn,
  LogOut,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logoWhite from "../../assets/logo/logoWhite.webp";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  /* LOGIN STATE */
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setOpen(false);
    navigate("/login");
  };

  const navBtn = (path) => `
    px-4 lg:px-5 py-2 rounded-full text-sm font-semibold
    transition-all duration-300 ease-in-out
    whitespace-nowrap
    hover:scale-105 hover:shadow-md
    ${
      location.pathname === path
        ? "bg-white/20 text-white"
        : "text-white hover:bg-white/10"
    }
  `;

  return (
    <>
      {/* NAVBAR */}
      <nav
        className="fixed top-0 left-0 w-full z-50
        bg-[#5a3e2b] text-white
        shadow-md"
      >
        <div className="w-full px-3 sm:px-4 md:px-6 h-16 sm:h-18 md:h-24 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition flex-shrink-0"
            >
              <Menu size={24} />
            </button>

            {/* LOGO FIXED */}
            <Link
              to="/"
              className="flex items-center ml-2 sm:ml-4 md:ml-8 flex-shrink-0"
            >
              <img
                src={logoWhite}
                alt="logo"
                className="h-8 sm:h-9 md:h-11 lg:h-12 w-auto object-contain flex-shrink-0"
              />
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <div
            className="hidden md:flex items-center gap-1 lg:gap-2 px-2 py-1 rounded-full border
            border-white/10 bg-white/5 backdrop-blur-md flex-shrink-0"
          >
            <Link to="/" className={navBtn("/")}>
              Home
            </Link>
            <Link to="/men" className={navBtn("/men")}>
              Men's
            </Link>
            <Link to="/women" className={navBtn("/women")}>
              Women's
            </Link>
            <Link to="/kids" className={navBtn("/kids")}>
              Kid's
            </Link>
            <Link to="/collections" className={navBtn("/collections")}>
              Collections
            </Link>
            <Link to="/about" className={navBtn("/about")}>
              About
            </Link>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
            {/* SEARCH DESKTOP FIX */}
            <div
              onClick={() => inputRef.current?.focus()}
              className="hidden md:flex items-center px-3 py-2 rounded-full border
              border-white/10 bg-white/5
              w-9 focus-within:w-44 hover:w-44
              overflow-hidden
              flex-shrink-0
              transition-all duration-300 cursor-text"
            >
              <Search size={15} className="shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                className="ml-2 text-sm outline-none bg-transparent w-full text-white placeholder-white/60"
              />
            </div>

            {/* MOBILE SEARCH FIX */}
            <div
              onClick={() => inputRef.current?.focus()}
              className="flex md:hidden items-center px-2 py-1.5 rounded-full border
              border-white/10 bg-white/5
              w-9 focus-within:w-28
              overflow-hidden
              flex-shrink-0
              transition-all duration-300"
            >
              <Search size={16} className="shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search"
                className="ml-2 text-sm outline-none bg-transparent w-full text-white"
              />
            </div>

            {/* ICONS DESKTOP */}
            <div className="hidden md:flex items-center gap-4 lg:gap-5 flex-shrink-0">
              <Link to="/favorites">
                <Heart className="w-5 h-5 lg:w-6 lg:h-6 hover:text-red-500 transition" />
              </Link>

              <Link to="/dashboard/profile">
                <User className="w-5 h-5 lg:w-6 lg:h-6 hover:text-blue-400 transition" />
              </Link>

              <Link to="/cart">
                <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6 hover:text-green-400 transition" />
              </Link>

              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-red-400 hover:text-red-500 text-sm"
                >
                  <LogOut size={18} />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-1 hover:text-blue-400 text-sm"
                >
                  <LogIn size={18} />
                  <span className="hidden lg:inline">Login</span>
                </Link>
              )}
            </div>

            {/* MOBILE CART */}
            <Link to="/cart" className="md:hidden flex-shrink-0">
              <ShoppingBag size={22} />
            </Link>
          </div>
        </div>
      </nav>

      {/* SPACER FIX */}
      <div className="h-10 sm:h-14 md:h-12"></div>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/40 z-[998]
        transition-all duration-300
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setOpen(false)}
      />

      {/* MOBILE SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] max-w-sm z-[999]
        bg-[#5a3e2b] text-white shadow-xl
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <img src={logoWhite} className="h-9 w-auto flex-shrink-0" />
          <button onClick={() => setOpen(false)}>
            <X size={26} />
          </button>
        </div>

        <div className="flex flex-col p-6 gap-5 text-lg font-medium">
          <Link onClick={() => setOpen(false)} to="/">
            Home
          </Link>
          <Link onClick={() => setOpen(false)} to="/men">
            Men's
          </Link>
          <Link onClick={() => setOpen(false)} to="/women">
            Women's
          </Link>
          <Link onClick={() => setOpen(false)} to="/kids">
            Kid's
          </Link>
          <Link onClick={() => setOpen(false)} to="/collections">
            Collections
          </Link>
          <Link onClick={() => setOpen(false)} to="/about">
            About
          </Link>

          <div className="flex gap-6 pt-4">
            <Link to="/favorites">
              <Heart />
            </Link>
            <Link to="/dashboard/profile">
              <User />
            </Link>
            <Link to="/cart">
              <ShoppingBag />
            </Link>
          </div>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 pt-4"
            >
              <LogOut size={18} />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 pt-4"
            >
              <LogIn size={18} />
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
