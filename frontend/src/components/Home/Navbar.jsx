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
import logo from "../../assets/logo/logo.webp";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/user/login");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBtn = (path) => `
    px-5 py-2 rounded-full text-sm font-medium transition
    ${
      location.pathname === path
        ? scrolled
          ? "bg-white/20 text-white"
          : "bg-black text-gray-100"
        : scrolled
          ? "text-white hover:bg-white/10"
          : "text-gray-700 hover:bg-black/5"
    }
  `;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300
        ${scrolled ? "bg-black/70 backdrop-blur-xl" : "bg-white/90 backdrop-blur-md"}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="h-15 w-40 object-contain"
            style={{ filter: scrolled ? "invert(0)" : "invert(0)" }}
          />
        </Link>

        <div
          className={`hidden md:flex items-center gap-2 px-2 py-1 rounded-full border
            ${
              scrolled
                ? "border-white/20 bg-white/10"
                : "border-gray-200 bg-white"
            }
          `}
        >
          <Link to="/" className={navBtn("/")}>
            Home
          </Link>
          <Link to="/men" className={navBtn("/men")}>
            Men&apos;s
          </Link>
          <Link to="/women" className={navBtn("/women")}>
            Women&apos;s
          </Link>
          <Link to="/kids" className={navBtn("/kids")}>
            Kid&apos;s
          </Link>
          <Link to="/collections" className={navBtn("/collections")}>
            Collections
          </Link>
          <Link to="/about" className={navBtn("/about")}>
            About Us
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-5">
          <div
            onClick={() => inputRef.current?.focus()}
            className={`flex items-center px-3 py-2 rounded-full border transition-all
              ${
                scrolled
                  ? "border-white/20 bg-white/10 text-white"
                  : "border-gray-100 bg-white text-black"
              }
              w-10 hover:w-48 focus-within:w-48 cursor-text`}
          >
            <Search
              size={18}
              className={`shrink-0 transition-colors
    ${scrolled ? "text-gray-100" : "text-slate-500"}
  `}
            />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products..."
              className="ml-3 text-sm outline-none bg-transparent w-full"
            />
          </div>

          <a href="/favorites" className="relative">
            <Heart
              className={`w-6 h-6 cursor-pointer transition-colors duration-200
            ${scrolled ? "text-gray-100 hover:text-red-400" : "text-gray-600 hover:text-red-500"}
            `}
            />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
          </a>

          <a href="user/dashboard/me">
            <User
              className={`w-6 h-6 cursor-pointer transition-colors duration-200
                ${scrolled ? "text-gray-100 hover:text-blue-400" : "text-gray-600 hover:text-blue-500"}
                `}
            />
          </a>

          <a href="/cart" className="relative">
            <ShoppingBag
              className={`w-6 h-6 cursor-pointer transition-colors duration-200
                 ${scrolled ? "text-gray-100 hover:text-green-400" : "text-gray-600 hover:text-green-600"}
               `}
            />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
          </a>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className={`flex items-center gap-1 text-sm font-medium
                ${scrolled ? "text-red-300" : "text-red-600"}`}
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <Link
              to="/user/login"
              className={`group flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition
    ${
      scrolled
        ? "text-white hover:text-gray-300 hover:bg-white/10"
        : "text-gray-700  hover:bg-black/5"
    }
  `}
            >
              <LogIn
                size={16}
                className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
              />
              Login
            </Link>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden ${scrolled ? "text-white" : "text-gray-700"}`}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;