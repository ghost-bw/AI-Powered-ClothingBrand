import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Grid, List, Filter } from "lucide-react";
import API from "../../api/axios";

const CollectionsPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const res = await API.get("/products");
      const data = Array.isArray(res.data) ? res.data : res.data.products;

      setProducts(data || []);

      const unique = [
        "All",
        ...new Set(data.map(p => p.category?.name).filter(Boolean))
      ];

      setCategories(unique);
    };

    loadData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category?.name === selectedCategory;

    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleProductClick = (id) => navigate(`/product/${id}`);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-linear-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            All Collections
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">

        {/* SEARCH + VIEW */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">

          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg"
            />
          </div>

          <div className="flex bg-white border rounded-lg p-1">
            <button onClick={()=>setViewMode("grid")} className={`p-2 rounded ${viewMode==="grid"?"bg-black text-white":"text-gray-600"}`}>
              <Grid size={20}/>
            </button>
            <button onClick={()=>setViewMode("list")} className={`p-2 rounded ${viewMode==="list"?"bg-black text-white":"text-gray-600"}`}>
              <List size={20}/>
            </button>
          </div>

        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* SIDEBAR */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">

              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Filter size={18}/> Filters
              </h3>

              {categories.map(c=>(
                <button
                  key={c}
                  onClick={()=>setSelectedCategory(c)}
                  className={`block w-full text-left px-3 py-2 rounded ${selectedCategory===c?"bg-black text-white":"hover:bg-gray-100"}`}
                >
                  {c}
                </button>
              ))}

              <div className="mt-6">
                <input type="range" min="0" max="50000" value={priceRange[1]} onChange={e=>setPriceRange([0,Number(e.target.value)])}/>
              </div>

            </div>
          </div>

          {/* PRODUCTS */}
          <div className="lg:w-3/4">

            <p className="mb-4 text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>

            {viewMode==="grid"?(
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(p=>(
                  <div key={p._id} onClick={()=>handleProductClick(p._id)} className="bg-white rounded-xl shadow hover:shadow-lg cursor-pointer">
                    <img src={p.colors?.[0]?.images?.[0]} className="h-60 w-full object-cover"/>
                    <div className="p-4">
                      <h3 className="font-medium">{p.name}</h3>
                      <p>{formatPrice(p.discountPrice||p.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ):(
              filteredProducts.map(p=>(
                <div key={p._id} onClick={()=>handleProductClick(p._id)} className="bg-white p-4 rounded shadow flex gap-4 cursor-pointer">
                  <img src={p.colors?.[0]?.images?.[0]} className="w-24 h-24 object-cover"/>
                  <div>
                    <h3>{p.name}</h3>
                    <p>{formatPrice(p.discountPrice||p.price)}</p>
                  </div>
                </div>
              ))
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsPage;
