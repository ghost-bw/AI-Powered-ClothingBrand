import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, Grid, List, Search } from "lucide-react";
import API from "../../api/axios"; // make sure this path is correct
import Navbar from "../../components/Home/Navbar";

const CollectionsPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Fetch products
        const resProducts = await API.get("/products"); 
        const dataProducts = Array.isArray(resProducts.data)
          ? resProducts.data
          : resProducts.data.products || [];
        setProducts(dataProducts);

        // Extract categories dynamically from products
        // Extract unique categories dynamically from products
const uniqueCategories = [
  "All",
  ...new Set(dataProducts.map((p) => p.category).filter(Boolean)),
];
setCategories(uniqueCategories);


        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = (products || []).filter((product) => {
    const matchesSearch =
      (product.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (product.description?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) return <p className="text-center py-20">Loading products...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-linear-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            All Collections
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Discover our curated selection of sustainable, handcrafted fashion
            pieces
          </p>
        </div>
      </div>

      {/* Filters and Products */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* View Mode */}
          <div className="flex items-center gap-4">
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
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Filter size={20} /> Filters
              </h3>

              {/* Category */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded ${
                        selectedCategory === category
                          ? "bg-black text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6 pb-6 border-b">
                <h4 className="font-semibold mb-4">Price Range</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-2 block">
                      Min Price: ₹{priceRange[0].toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="1000"
                      value={priceRange[0]}
                      onChange={(e) => {
                        const newMin = parseInt(e.target.value);
                        if (newMin <= priceRange[1])
                          setPriceRange([newMin, priceRange[1]]);
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-2 block">
                      Max Price: ₹{priceRange[1].toLocaleString()}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) => {
                        const newMax = parseInt(e.target.value);
                        if (newMax >= priceRange[0])
                          setPriceRange([priceRange[0], newMax]);
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                    />
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                    <span className="text-sm font-medium">Price Range:</span>
                    <span className="font-semibold text-black">
                      ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setPriceRange([0, 50000]);
                  setSearchTerm("");
                }}
                className="w-full py-2 border border-black text-black rounded-lg hover:bg-black hover:text-white transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Products */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {/* Grid View */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => handleProductClick(product._id)}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                  >
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={product.images?.[0] || "https://via.placeholder.com/150"}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.discount > 0 && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          {product.discount}% OFF
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                        {product.category}
                      </p>
                      <h3 className="font-medium text-gray-900 line-clamp-1 mb-2">
                        {product.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-lg">{formatPrice(product.price)}</span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="ml-1 text-sm">{product.rating || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // List View
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => handleProductClick(product._id)}
                    className="bg-white rounded-xl shadow-sm p-4 hover:shadow-lg transition-shadow cursor-pointer group flex gap-4"
                  >
                    <div className="w-24 h-24 shrink-0">
                      <img
                        src={product.images?.[0] || "https://via.placeholder.com/150"}
                        alt={product.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{product.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{formatPrice(product.price)}</span>
                        <span className="text-sm text-gray-500">{product.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;
