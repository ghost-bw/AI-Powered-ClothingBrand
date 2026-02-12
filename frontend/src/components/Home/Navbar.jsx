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
import API from "../../api/axios";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);

  /* 🔍 SEARCH STATES */
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);

  const lastScrollY = useRef(0);
  const inputRef = useRef(null);
  const searchBoxRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  /* ================= AUTH STATE ================= */
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [location.pathname]);

  /* ================= LOAD PRODUCTS ONCE ================= */
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await API.get("/products");
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.products;

        setAllProducts(data || []);
      } catch (err) {
        console.error("Navbar product load failed");
      }
    };

    loadProducts();
  }, []);

  /* ================= SEARCH LOGIC (SAME AS COLLECTIONS) ================= */
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const filtered = allProducts.filter(p =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(filtered.slice(0, 6));
  }, [searchTerm, allProducts]);

  /* ================= WISHLIST COUNT ================= */
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    setWishlistCount(0);   // 🔥 CLEAR when logged out
    return;
  }

  const loadWishlistCount = async () => {
    try {
      const res = await API.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setWishlistCount(res.data.wishlist?.length || 0);
    } catch {
      setWishlistCount(0);
    }
  };

  loadWishlistCount();
}, [isLoggedIn]); // ✅ DEPEND ONLY ON LOGIN STATE


  /* ================= LOGOUT ================= */
 const handleLogout = () => {
  localStorage.removeItem("token");
  setIsLoggedIn(false);
  setWishlistCount(0); // 🔥 IMPORTANT
  setOpen(false);
  navigate("/user/login");
};


  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 20);

      if (current > lastScrollY.current && current > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= CLOSE SEARCH ON OUTSIDE CLICK ================= */
  useEffect(() => {
    const handler = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ================= LOCK BODY SCROLL ================= */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const navBtn = (path) => `
    px-5 py-2 rounded-full text-sm font-medium transition
    ${
      location.pathname === path
        ? scrolled
          ? "bg-white/20 text-white"
          : "bg-black text-white"
        : scrolled
        ? "text-white hover:bg-white/10"
        : "text-gray-700 hover:bg-black/5"
    }
  `;

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transform transition-all duration-300
        ${showNavbar ? "translate-y-0" : "-translate-y-full"}
        ${
          scrolled
            ? "bg-black/70 backdrop-blur-xl text-white"
            : "bg-white/90 backdrop-blur-md text-black"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/">
            <img src={logo} alt="logo" className="h-15 w-auto object-contain" />
          </Link>

          {/* DESKTOP MENU */}
          <div
            className={`hidden md:flex items-center gap-2 px-2 py-1 rounded-full border
            ${
              scrolled
                ? "border-white/20 bg-white/10"
                : "border-gray-200 bg-white"
            }`}
          >
            <Link to="/" className={navBtn("/")}>Home</Link>
            <Link to="/men" className={navBtn("/men")}>Men's</Link>
            <Link to="/women" className={navBtn("/women")}>Women's</Link>
            <Link to="/kids" className={navBtn("/kids")}>Kid's</Link>
            <Link to="/collections" className={navBtn("/collections")}>Collections</Link>
            <Link to="/about" className={navBtn("/about")}>About Us</Link>
          </div>

          {/* DESKTOP RIGHT */}
          <div className="hidden md:flex items-center gap-5 relative" ref={searchBoxRef}>
            {/* SEARCH */}
            <div
              onClick={() => inputRef.current?.focus()}
              className={`flex items-center px-3 py-2 rounded-full border transition-all
              ${
                scrolled
                  ? "border-white/20 bg-white/10 text-white"
                  : "border-gray-200 bg-white text-black"
              }
              w-10 hover:w-48 focus-within:w-48 cursor-text`}
            >
              <Search size={15} className="shrink-0"/>
              <input
                ref={inputRef}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSearchOpen(true);
                }}
                placeholder="Search products..."
                className="ml-3 text-sm outline-none bg-transparent w-full"
              />
            </div>

            {/* 🔍 SEARCH RESULTS */}
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute top-14 left-0 w-72 bg-white border rounded-xl shadow-xl z-50 overflow-hidden">
                {searchResults.map(p => (
                  <div
                    key={p._id}
                    onClick={() => {
                      navigate(`/product/${p._id}`);
                      setSearchTerm("");
                      setSearchOpen(false);
                    }}
                    className="flex gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    <img
                      src={p.image || p.colors?.[0]?.images?.[0]}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-gray-500">
                        ₹{p.discountPrice || p.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* FAVORITES */}
            <button
              onClick={() => navigate("/favorites")}
              className="text-gray-600 hover:text-red-500 relative transition-colors"
            >
              <Heart size={20} />
             {isLoggedIn && wishlistCount > 0 && (
  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
    {wishlistCount > 9 ? "9+" : wishlistCount}
  </span>
)}

            </button>

            {/* PROFILE */}
            <button
              onClick={() => navigate("/user/dashboard/me")}
              className="text-gray-600 hover:text-blue-500"
            >
              <User size={20} />
            </button>

            <Link to="/cart">
              <ShoppingBag size={20} className="hover:text-green-500" />
            </Link>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-500"
              >
                <LogOut size={16} /> Logout
              </button>
            ) : (
              <Link
                to="/user/login"
                className="flex items-center gap-1 hover:text-blue-500"
              >
                <LogIn size={16} /> Login
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button onClick={() => setOpen(true)} className="md:hidden">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-[999] transition-all duration-300
        ${open ? "visible opacity-100" : "invisible opacity-0"}
        bg-black/40 backdrop-blur-sm`}
        onClick={() => setOpen(false)}
      />

      {/* MOBILE SIDEBAR (UNCHANGED) */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] max-w-sm z-[1000]
        transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        bg-white shadow-xl`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <img src={logo} className="h-8" />
          <button onClick={() => setOpen(false)}>
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col p-6 gap-6 text-lg font-medium">
          <Link onClick={() => setOpen(false)} to="/">Home</Link>
          <Link onClick={() => setOpen(false)} to="/men">Men's</Link>
          <Link onClick={() => setOpen(false)} to="/women">Women's</Link>
          <Link onClick={() => setOpen(false)} to="/kids">Kid's</Link>
          <Link onClick={() => setOpen(false)} to="/collections">Collections</Link>
          <Link onClick={() => setOpen(false)} to="/about">About Us</Link>

          <div className="flex gap-6 pt-4">
            <Link to="/favorites"><Heart /></Link>
            <Link to="/user/dashboard/me"><User /></Link>
            <Link to="/cart"><ShoppingBag /></Link>
          </div>

          {isLoggedIn ? (
            <button onClick={handleLogout} className="flex gap-2 text-red-500 pt-4">
              <LogOut size={18} /> Logout
            </button>
          ) : (
            <Link to="/user/login" onClick={() => setOpen(false)} className="flex gap-2 pt-4">
              <LogIn size={18} /> Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
