import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import API from "../../api/axios";
import ProductCard from "../../components/Home/ProductCard";
import Navbar from "../../components/Home/Navbar";

function Favorites() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [wishlistRaw, setWishlistRaw] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    if (!token) navigate("/user/login");
  }, [token, navigate]);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const loadData = async () => {
      try {
        const [meRes, productsRes] = await Promise.all([
          API.get("/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          API.get("/products"),
        ]);

        setWishlistRaw(meRes.data.wishlist || []);
        setProducts(productsRes.data.products || productsRes.data || []);
      } catch (err) {
        console.error("Failed to load favorites", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) loadData();
  }, [token]);

  /* ================= NORMALIZE WISHLIST ================= */
  const wishlistIds = useMemo(() => {
    return wishlistRaw.map(item =>
      typeof item === "string"
        ? item
        : item.product?._id || item.product || item._id
    );
  }, [wishlistRaw]);

  const favoriteProducts = useMemo(() => {
    return products.filter(p => wishlistIds.includes(p._id));
  }, [products, wishlistIds]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading favorites...
      </div>
    );
  }

  /* ================= EMPTY ================= */
  if (favoriteProducts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <Heart size={48} className="text-red-400 mb-4" />
        <h2 className="text-xl font-semibold mb-2">
          No favorites yet
        </h2>
        <p className="text-gray-500 mb-6">
          Tap the heart on products you love
        </p>
        <button
          onClick={() => navigate("/collections")}
          className="px-6 py-3 bg-green-500 text-white rounded-lg"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Navbar/>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">My Favorites</h1>
          <p className="text-gray-500">
            {favoriteProducts.length} saved items
          </p>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {favoriteProducts.map((product, index) => (
          <ProductCard
            key={`${product._id}-${index}`}
            product={product}
          />
        ))}
      </div>
      
    </div>
  );
}

export default Favorites;
