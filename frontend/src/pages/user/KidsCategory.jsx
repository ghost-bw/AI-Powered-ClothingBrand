import React, { useState, useMemo, useEffect } from "react";
import ProductCard from "../../components/Home/ProductCard";
import API from "../../api/axios";
import Navbar from "../../components/Home/Navbar";

/* HERO TEXT */
const TITLE_TEXT = "Little Styles. Big Smiles.";
const SUB_TEXT =
  "Playful, comfy & premium outfits made for every little moment";

export default function KidsCollection() {
  const [products, setProducts] = useState([]);
  const [gender, setGender] = useState("all");
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  const [priceRange, setPriceRange] = useState([0, 0]);
  const [sliderValue, setSliderValue] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [loading, setLoading] = useState(true);

  /* ❤️ Wishlist — SAME AS MEN/WOMEN */
  const [wishlist, setWishlist] = useState([]);

  /* TYPEWRITER */
  const TYPING_SPEED = 90;
  const [typedText, setTypedText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(TITLE_TEXT.slice(0, i + 1));
      i++;
      if (i === TITLE_TEXT.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, TYPING_SPEED);

    return () => clearInterval(interval);
  }, []);

  /* LOAD PRODUCTS */
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await API.get("/products?collection=kids");

      const kidsProducts = Array.isArray(res.data)
        ? res.data
        : res.data.products;

      setProducts(kidsProducts);

      const uniqueCats = [
        ...new Set(
          kidsProducts.map(p => p.category?.name?.toLowerCase())
        ),
      ].filter(Boolean);

      setCategories(uniqueCats);

      const rawMax = Math.max(
        ...kidsProducts.map(p => p.discountPrice || p.price || 0)
      );

      const max = Math.ceil(rawMax / 100) * 100;

      setMaxPrice(max);
      setPriceRange([0, max]);
      setSliderValue(max);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* FILTER */
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const genderMatch =
        gender === "all" || p.gender === gender;

      const categoryMatch =
        category === "all" ||
        p.category?.name?.toLowerCase() === category;

      const priceMatch =
        (p.discountPrice || p.price) <= priceRange[1];

      return genderMatch && categoryMatch && priceMatch;
    });
  }, [products, gender, category, priceRange]);

  /* ❤️ Wishlist toggle — SAME AS MEN/WOMEN */
  const handleWishlistToggle = product => {
    setWishlist(prev =>
      prev.includes(product._id)
        ? prev.filter(id => id !== product._id)
        : [...prev, product._id]
    );
  };

  return (
    <div className="bg-[#fafafa] min-h-screen">
    <Navbar/>
      {/* HERO */}
      <div
        className="relative h-[70vh] bg-cover bg-center flex flex-col items-center justify-center text-center px-4"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dttjgnypq/image/upload/v1770397575/Kid_s_kuv61w.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 shadow-inner"></div>

        <div className="relative z-10">
          <h1
            className={`text-4xl md:text-6xl font-semibold mb-4 ${
              done ? "animate-zoomOnce" : ""
            }`}
            style={{ color: "#FDF2E9" }}
          >
            {typedText}
          </h1>

          {done && (
            <p
              className="text-lg md:text-xl max-w-2xl animate-fadeUp"
              style={{ color: "#FFE8D6" }}
            >
              {SUB_TEXT}
            </p>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-4 gap-10">

        {/* FILTERS */}
        <aside className="bg-white rounded-2xl shadow p-6 h-fit sticky top-24 space-y-6">
          <h3 className="font-semibold text-lg">Filters</h3>

          {/* Gender */}
          <div>
            <h4 className="mb-2 font-medium">Gender</h4>

            {["all", "boys", "girls"].map(g => (
              <button
                key={g}
                onClick={() => {
                  setGender(g);
                  setCategory("all");
                }}
                className={`w-full py-2 mb-2 rounded-lg ${
                  gender === g ? "bg-black text-white" : "bg-gray-100"
                }`}
              >
                {g.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Category */}
          {gender !== "all" && categories.length > 0 && (
            <div>
              <h4 className="mb-2 font-medium">Category</h4>

              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`w-full py-2 mb-2 rounded-lg ${
                    category === c ? "bg-black text-white" : "bg-gray-100"
                  }`}
                >
                  {c.toUpperCase()}
                </button>
              ))}
            </div>
          )}

          {/* Price */}
          <div>
            <h4 className="mb-2 font-medium">Price Range</h4>

            <div className="flex justify-between text-sm mb-1">
              <span>₹0</span>
              <span>₹{sliderValue}</span>
            </div>

            <input
              type="range"
              min="0"
              max={maxPrice}
              step="100"
              value={sliderValue}
              onChange={e => {
                const val = Number(e.target.value);
                setSliderValue(val);
                setPriceRange([0, val]);
              }}
              className="w-full accent-black"
            />
          </div>
        </aside>

        {/* PRODUCTS — SAME AS MEN/WOMEN */}
        <main className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-6">

          {loading && <p>Loading...</p>}

          {filteredProducts.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              onWishlistToggle={handleWishlistToggle}
              isWishlisted={wishlist.includes(product._id)}
            />
          ))}

        </main>
      </div>

      {/* Animations */}
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
}
