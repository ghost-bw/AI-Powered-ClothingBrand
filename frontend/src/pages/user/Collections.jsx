import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, Grid, List, Search } from "lucide-react";
import API from "../../api/axios";
import Navbar from "../../components/Home/Navbar";

const CollectionsPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [gender, setGender] = useState("");

  const navigate = useNavigate();

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

  const toggleCollection = (name) => {
    setSelectedCategory("All");
    setGender("");
    setSelectedCollections(prev =>
      prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
    );
  };

  const isKidsSelected = selectedCollections.includes("Kids");

  /* ================= FILTER PRODUCTS ================= */

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrice =
      (product.discountPrice || product.price) >= priceRange[0] &&
      (product.discountPrice || product.price) <= priceRange[1];

    const matchesCollection =
      selectedCollections.length === 0 ||
      product.collections?.some(c => selectedCollections.includes(c.name));

    const matchesGender =
      !gender || product.gender === gender;

    const matchesCategory =
      selectedCategory === "All" ||
      product.category?.name === selectedCategory;

    return matchesSearch && matchesPrice && matchesCollection && matchesGender && matchesCategory;
  });

  /* ================= DYNAMIC CATEGORIES ================= */

  const visibleCategories = [
    "All",
    ...new Set(
      filteredProducts
        .map(p => p.category?.name)
        .filter(Boolean)
    ),
  ];

  const handleProductClick = id => navigate(`/product/${id}`);

  const formatPrice = price =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      <div className="bg-linear-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            All Collections
          </h1>
          <p className="text-gray-300">Discover our curated fashion pieces</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">

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
            <button onClick={() => setViewMode("grid")} className={`p-2 rounded ${viewMode === "grid" ? "bg-black text-white" : "text-gray-600"}`}>
              <Grid size={20} />
            </button>
            <button onClick={() => setViewMode("list")} className={`p-2 rounded ${viewMode === "list" ? "bg-black text-white" : "text-gray-600"}`}>
              <List size={20} />
            </button>
          </div>

        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* FILTERS */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">

              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Filter size={20} /> Filters
              </h3>

              {/* COLLECTION FIRST */}
              <div className="mb-6">
                {collections.map((c, i) => (
                  <label key={`${c}-${i}`} className="flex items-center gap-2 text-sm mb-1">
                    <input
                      type="checkbox"
                      checked={selectedCollections.includes(c)}
                      onChange={() => toggleCollection(c)}
                    />
                    {c}
                  </label>
                ))}
              </div>

              {/* KIDS GENDER */}
              {isKidsSelected && (
                <div className="mb-6">
                  <select
                    className="border p-2 rounded w-full"
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="boys">Boys</option>
                    <option value="girls">Girls</option>
                  </select>
                </div>
              )}

              {/* CATEGORY (BASED ON COLLECTION + GENDER) */}
              {visibleCategories.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`block w-full text-left px-3 py-2 rounded ${
                    selectedCategory === c ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                >
                  {c}
                </button>
              ))}

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
                  <div key={product._id} onClick={() => handleProductClick(product._id)} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">

                    <div className="relative overflow-hidden aspect-square">

  <img
    src={product.colors?.[0]?.images?.[0] || "/placeholder.jpg"}
    alt={product.name}
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
  />

  {/* DISCOUNT BADGE */}
  {product.discountPercent > 0 && (
    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
      {product.discountPercent}% OFF
    </div>
  )}
</div>
                    <div className="p-4">

                      <div className="flex flex-wrap gap-1 mb-1">
                        {product.collections?.map((c, i) => (
                          <span key={i} className="text-[10px] uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">
                            {c.name}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-medium text-gray-900 line-clamp-1 mb-2">
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-between">
  <div>
    <span className="font-bold text-lg">
      {formatPrice(product.discountPrice || product.price)}
    </span>

    {product.discountPrice && (
      <span className="ml-2 text-sm text-gray-500 line-through">
        {formatPrice(product.price)}
      </span>
    )}
  </div>

  <div className="flex items-center">
    <span className="text-yellow-400">★</span>
    <span className="ml-1 text-sm">
      {product.rating || 4.5}
    </span>
  </div>
</div>


                    </div>
                  </div>
                ))}
              </div>

            ) : (

              <div className="space-y-4">
                {filteredProducts.map(product => (
                  <div key={product._id} onClick={() => handleProductClick(product._id)} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-lg transition-shadow cursor-pointer group flex gap-4">

                    <div className="w-24 h-24 shrink-0">
                      <img src={product.colors?.[0]?.images?.[0]} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">{product.description}</p>
                      <span className="font-bold">{formatPrice(product.discountPrice || product.price)}</span>
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
