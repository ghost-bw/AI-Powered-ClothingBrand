import React, { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/Home/ProductCard";
import API from "../../api/axios";
import Navbar from "../../components/Home/Navbar";

/* HERO TEXT */
const HERO_TITLE = "Women’s Collection";
const HERO_SUB =
  "Grace in every detail — timeless ethnic, modern western and elegant styles designed for every woman, every mood.";

export default function WomenCollectionPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [loading, setLoading] = useState(true);

  /* TYPEWRITER */

  const [typedText, setTypedText] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(HERO_SUB.slice(0, i + 1));
      i++;
      if (i === HERO_SUB.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  /* LOAD PRODUCTS */

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await API.get("/products?collection=women");

      const womenProducts = Array.isArray(res.data)
        ? res.data
        : res.data.products;

      setProducts(womenProducts);

      /* Categories */

      const cats = [
        "All",
        ...new Set(womenProducts.map(p => p.category?.name))
      ];

      setCategories(cats);

      /* Auto Max Price */

      const maxPrice = Math.max(
        ...womenProducts.map(p => p.discountPrice || p.price || 0)
      );

      setPriceRange([0, maxPrice]);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* FILTER */

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const categoryMatch =
        activeCategory === "All" ||
        p.category?.name === activeCategory;

      const priceMatch =
        (p.discountPrice || p.price) <= priceRange[1];

      return categoryMatch && priceMatch;
    });
  }, [products, activeCategory, priceRange]);

  return (
    <div className="bg-[#faf7f2] min-h-screen">
      <Navbar />

      {/* HERO */}

      <section
        className="relative h-[70vh] bg-cover bg-top flex items-center"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dttjgnypq/image/upload/v1770404161/female_pj10ap.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 px-8 max-w-3xl text-white">
          <h1
            className={`text-5xl md:text-6xl font-serif mb-4 ${
              done ? "animate-zoom-once" : ""
            }`}
          >
            {HERO_TITLE}
          </h1>

          <p className="text-lg md:text-xl leading-relaxed">
            {typedText}
          </p>
        </div>
      </section>

      {/* CONTENT */}

      <section className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* FILTERS */}

        <aside className="sticky top-24 h-fit">
          <div className="bg-white rounded-2xl shadow p-6 space-y-8">

            <h3 className="flex items-center gap-2 font-semibold text-lg">
              <SlidersHorizontal size={18} /> Filters
            </h3>

            <div>
              <h4 className="font-medium mb-3">Category</h4>

              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`block w-full text-left px-4 py-2 rounded-lg mb-2 ${
                    activeCategory === cat
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <ArrowUpDown size={16} /> Price Range
              </h4>

              <div className="flex justify-between text-sm mb-2">
                <span>₹0</span>
                <span>₹{priceRange[1]}</span>
              </div>

              <input
                  type="range"
                  min="0"
                  max={Math.max(...products.map(p => p.discountPrice || p.price || 0))}
                  step="100"
                  value={priceRange[1]}
                  onChange={e =>
                    setPriceRange([0, Number(e.target.value)])
                  }
                  className="w-full accent-black"
                  />

            </div>

          </div>
        </aside>

        {/* PRODUCTS GRID */}

        <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-6">

          {loading && <p>Loading...</p>}

          {filteredProducts.map(p => (
            <ProductCard
              key={p._id}
              product={p}
              onClick={() => navigate(`/product/${p._id}`)}
            />
          ))}

        </div>
      </section>

      {/* ZOOM ANIMATION */}

      <style>{`
        @keyframes zoomOnce {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }

        .animate-zoom-once {
          animation: zoomOnce 1.2s ease-in-out 1;
        }
      `}</style>

    </div>
  );
}
