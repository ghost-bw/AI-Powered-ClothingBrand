import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, Grid, List, Search } from "lucide-react";
import API from "../../api/axios";
import Navbar from "../../components/Home/Navbar";
import ProductCard from "../../components/Home/ProductCard";

/* HERO IMAGE */
const HERO_IMAGE =
  "https://res.cloudinary.com/dttjgnypq/image/upload/v1770274090/ALL_Collection_Hero-3_sdcysc.jpg";

/* HERO TEXT */
const TITLE_TEXT = "All Collections";
const SUB_TEXT =
  "Discover our complete range of thoughtfully designed outfits, crafted to elevate every style and every moment.";

const CollectionsPage = () => {
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [gender, setGender] = useState("");

  /* ❤️ Wishlist */
  const [wishlist, setWishlist] = useState([]);

  /* HERO TYPEWRITER */
  const [typedText, setTypedText] = useState("");
  const [done, setDone] = useState(false);

  /* TYPEWRITER EFFECT */
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(TITLE_TEXT.slice(0, i + 1));
      i++;
      if (i === TITLE_TEXT.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  /* LOAD PRODUCTS */
  useEffect(() => {
    const loadProducts = async () => {
      const res = await API.get("/products");
      const data = Array.isArray(res.data) ? res.data : res.data.products;

      setProducts(data || []);

      const colls = data.flatMap(p => p.collections || []).map(c => c.name);
      setCollections([...new Set(colls)]);
    };

    loadProducts();
  }, []);

  /* COLLECTION TOGGLE */
  const toggleCollection = name => {
    setSelectedCategory("All");
    setGender("");
    setSelectedCollections(prev =>
      prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
    );
  };

  const isKidsSelected = selectedCollections.includes("Kids");

  /* ❤️ Wishlist Toggle */
  const handleWishlistToggle = product => {
    setWishlist(prev =>
      prev.includes(product._id)
        ? prev.filter(id => id !== product._id)
        : [...prev, product._id]
    );
  };

  /* ================= 🔒 STABLE FILTER BASE ================= */
  const filterBaseProducts = products.filter(p => {
    const matchesCollection =
      selectedCollections.length === 0 ||
      p.collections?.some(c => selectedCollections.includes(c.name));

    const matchesGender = !gender || p.gender === gender;

    return matchesCollection && matchesGender;
  });

  /* ================= 🎯 CATEGORY LIST (NEVER VANISHES) ================= */
  const filteredCategories = [
    "All",
    ...new Set(
      filterBaseProducts
        .map(p => p.category?.name)
        .filter(Boolean)
    ),
  ];

  /* ================= 🧮 FINAL PRODUCT LIST ================= */
  const filteredProducts = filterBaseProducts.filter(product => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const price = product.discountPrice || product.price;
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

    const matchesCategory =
      selectedCategory === "All" ||
      product.category?.name === selectedCategory;

    return matchesSearch && matchesPrice && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ================= HERO ================= */}
      <div
        className="relative h-[70vh] bg-cover bg-center flex items-center justify-center text-center px-4"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 max-w-3xl">
          <h1
            className={`text-4xl md:text-6xl font-serif font-bold text-[#FDF2E9] mb-4 ${
              done ? "animate-zoomOnce" : ""
            }`}
          >
            {typedText}
          </h1>
          {done && (
            <p className="text-lg md:text-xl text-[#FFE8D6] animate-fadeUp">
              {SUB_TEXT}
            </p>
          )}
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="container mx-auto px-4 py-8">
        {/* SEARCH + VIEW */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex bg-white border rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${
                viewMode === "grid" ? "bg-black text-white" : "text-gray-600"
              }`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${
                viewMode === "list" ? "bg-black text-white" : "text-gray-600"
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* FILTERS */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Filter size={20} /> Filters
              </h3>

              {/* Collections */}
              <div className="mb-6">
                {collections.map((c, i) => (
                  <label key={i} className="flex items-center gap-2 text-sm mb-1">
                    <input
                      type="checkbox"
                      checked={selectedCollections.includes(c)}
                      onChange={() => toggleCollection(c)}
                    />
                    {c}
                  </label>
                ))}
              </div>

              {/* Kids Gender */}
              {isKidsSelected && (
                <select
                  className="border p-2 rounded w-full mb-6"
                  value={gender}
                  onChange={e => {
                    setGender(e.target.value);
                    setSelectedCategory("All");
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="boys">Boys</option>
                  <option value="girls">Girls</option>
                </select>
              )}

              {/* Categories */}
              {filteredCategories.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`block w-full text-left px-3 py-2 rounded mb-1 ${
                    selectedCategory === c
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {c}
                </button>
              ))}

              {/* Price Slider */}
              <div className="mt-6">
                <label className="text-sm">Max Price: ₹{priceRange[1]}</label>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={e => setPriceRange([0, Number(e.target.value)])}
                  className="w-full accent-black"
                />
              </div>

              {/* Clear */}
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedCollections([]);
                  setGender("");
                  setPriceRange([0, 50000]);
                  setSearchTerm("");
                }}
                className="w-full mt-6 border py-2 rounded hover:bg-black hover:text-white"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="lg:w-3/4">
            <p className="text-gray-600 mb-6">
              Showing {filteredProducts.length} of {products.length} products
            </p>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onWishlistToggle={handleWishlistToggle}
                    isWishlisted={wishlist.includes(product._id)}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <div
                    key={product._id}
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="bg-white rounded-xl shadow-sm p-4 hover:shadow-lg transition cursor-pointer flex gap-4"
                  >
                    <img
                      src={product.colors?.[0]?.images?.[0]}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {product.description}
                      </p>
                      <p className="font-bold mt-1">
                        ₹{(product.discountPrice || product.price).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* HERO ANIMATIONS */}
      <style>{`
        @keyframes zoomOnce {
          0% { transform: scale(0.96); }
          60% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-zoomOnce {
          animation: zoomOnce 1.2s ease forwards;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          animation: fadeUp 0.8s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default CollectionsPage;
