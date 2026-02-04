import { Search, User, ShoppingBag, Menu, X, Heart } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import logo from "../../assets/logo/logo.webp";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const inputRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        if (open) setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

 useEffect(() => {
 const checkAuth = () => {
   setIsLoggedIn(!!localStorage.getItem("token"));
 };

 checkAuth();
 window.addEventListener("storage", checkAuth);

 return () => window.removeEventListener("storage", checkAuth);
}, []);

const handleLogout = () => {
 localStorage.removeItem("token");
 setIsLoggedIn(false);
};


  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <nav 
      className={`w-full border-b bg-white/95 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo - Leftmost */}
   <div className="shrink-0-flex -ml-4">
  <a href="/" className="block">
    <img 
      src={logo} 
      alt="logo" 
      className="h-12 w-40 md:h-14 md:w-48 object-contain hover:opacity-80 transition-opacity duration-200"
    />
  </a>
</div>

        {/* Center Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700 mx-6 flex-1 justify-center">
          <li>
            <a 
              href="/" 
              className="relative group hover:text-black cursor-pointer transition-colors duration-200 py-2"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a 
              href="/men" 
              className="relative group hover:text-black cursor-pointer transition-colors duration-200 py-2"
            >
              Men
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a 
              href="/women" 
              className="relative group hover:text-black cursor-pointer transition-colors duration-200 py-2"
            >
              Women
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a 
              href="/kids" 
              className="relative group hover:text-black cursor-pointer transition-colors duration-200 py-2"
            >
              Kid's
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a 
              href="/collections" 
              className="relative group hover:text-black cursor-pointer transition-colors duration-200 py-2"
            >
              Collections
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
          <li>
            <a 
              href="/about" 
              className="relative group hover:text-black cursor-pointer transition-colors duration-200 py-2"
            >
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
            </a>
          </li>
        </ul>

        {/* Right Icons with Search */}
        <div className="hidden md:flex items-center gap-6">
          {/* Search Bar */}
          <div
            onClick={handleContainerClick}
            className="
              flex items-center 
              px-4 py-2.5 
              rounded-full 
              border border-slate-200 
              hover:border-slate-300 
              focus-within:border-blue-500 
              focus-within:ring-2 focus-within:ring-blue-500/20
              transition-all duration-300
              cursor-text
              w-10 hover:w-56 focus-within:w-56
              bg-white
            "
          >
            <Search
              size={18}
              className="text-slate-500 shrink-0 transition-colors duration-300 group-focus-within:text-blue-500"
            />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search products..."
              className="
                ml-3 text-sm outline-none
                bg-transparent w-full
                placeholder:text-slate-400
                cursor-text
                transition-all duration-300
              "
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <a 
              href="/favorites" 
              className="relative group"
            >
              <Heart 
                className="w-6 h-6 cursor-pointer text-gray-600 hover:text-red-500 transition-colors duration-200" 
              />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </a>
            
            <a 
              href="/user/dashboard/me" 
              className="group"
            >
              <User 
                className="w-6 h-6 cursor-pointer text-gray-600 hover:text-blue-500 transition-colors duration-200" 
              />
            </a>
            
            <a 
              href="/cart" 
              className="relative group"
            >
              <ShoppingBag 
                className="w-6 h-6 cursor-pointer text-gray-600 hover:text-green-600 transition-colors duration-200" 
              />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
            </a>
            {isLoggedIn === null ? null : isLoggedIn ?(
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
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setOpen(!open)} 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          {open ? (
            <X className="w-6 h-6 text-gray-700 animate-spin-in" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div 
          ref={mobileMenuRef}
          className="md:hidden bg-white border-t animate-slide-down"
        >
          <div className="px-6 py-6 space-y-1">
            {/* Mobile Search */}
            <div className="mb-6">
              <div
                onClick={handleContainerClick}
                className="
                  flex items-center 
                  px-4 py-3 
                  rounded-lg 
                  border border-slate-300 
                  hover:border-slate-400 
                  focus-within:border-blue-500 
                  transition-all duration-200
                  cursor-text
                  bg-white
                "
              >
                <Search
                  size={18}
                  className="text-slate-500 shrink-0"
                />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search products..."
                  className="
                    ml-3 text-base outline-none
                    bg-transparent w-full
                    placeholder:text-slate-400
                    cursor-text
                  "
                />
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <a 
              href="/" 
              className="block py-3 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg px-3 transition-all duration-200"
              onClick={() => setOpen(false)}
            >
              Home
            </a>
            <a 
              href="/men" 
              className="block py-3 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg px-3 transition-all duration-200"
              onClick={() => setOpen(false)}
            >
              Men
            </a>
            <a 
              href="/women" 
              className="block py-3 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg px-3 transition-all duration-200"
              onClick={() => setOpen(false)}
            >
              Women
            </a>
            <a 
              href="/kids" 
              className="block py-3 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg px-3 transition-all duration-200"
              onClick={() => setOpen(false)}
            >
              Kid's
            </a>
            <a 
              href="/shopcollection" 
              className="block py-3 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg px-3 transition-all duration-200"
              onClick={() => setOpen(false)}
            >
              Collections
            </a>
            <a 
              href="/about" 
              className="block py-3 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg px-3 transition-all duration-200"
              onClick={() => setOpen(false)}
            >
              About Us
            </a>

            {/* Mobile Icons */}
            <div className="flex items-center justify-center gap-8 pt-8 border-t">
              <a 
                href="/favorites" 
                className="flex flex-col items-center gap-1"
                onClick={() => setOpen(false)}
              >
                <Heart className="w-6 h-6 text-gray-600" />
                <span className="text-xs text-gray-500">Favorites</span>
              </a>
              <a 
                href="/dashboard/profile" 
                className="flex flex-col items-center gap-1"
                onClick={() => setOpen(false)}
              >
                <User className="w-6 h-6 text-gray-600" />
                <span className="text-xs text-gray-500">Profile</span>
              </a>
              <a 
                href="/cart" 
                className="flex flex-col items-center gap-1"
                onClick={() => setOpen(false)}
              >
                <ShoppingBag className="w-6 h-6 text-gray-600" />
                <span className="text-xs text-gray-500">Cart</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;