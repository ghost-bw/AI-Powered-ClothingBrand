import React, { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import ProductCard from "../../components/Home/ProductCard";
import API from "../../api/axios";
import Navbar from "../../components/Home/Navbar";
import { useShop } from "../../context/ShopContext";

/* HERO TEXT */
const HERO_TITLE = "Women’s Collection";
const HERO_SUB =
  "Grace in every detail — timeless ethnic, modern western and elegant styles designed for every woman, every mood.";

export default function WomenCollectionPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [loading, setLoading] = useState(true);

  /* ❤️ WISHLIST FROM CONTEXT (SAME AS MEN & KIDS) */
  // const { wishlist, toggleWishlist } = useShop();

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

      const cats = [
        "All",
        ...new Set(womenProducts.map(p => p.category?.name)),
      ];
      setCategories(cats);

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
        className="relative h-[65vh] sm:h-[75vh] lg:h-[80vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dttjgnypq/image/upload/v1770530846/FemailCollection_lqgld1.png)",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 px-4 sm:px-8 max-w-3xl text-white text-center">
          <h1
            className={`text-3xl permanent-marker-regular sm:text-5xl md:text-6xl font-serif mb-4 ${
              done ? "animate-zoom-once" : ""
            }`}
          >
            {HERO_TITLE}
          </h1>


          <p className=" lg:text-3xl mt-3 text-3xl sm:text-xs font-dancing text-gray-200">
            {typedText}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* FILTERS */}
       <aside className="md:col-span-1">
  <div
    className="
      bg-white rounded-2xl shadow
      p-4 sm:p-6
      md:sticky md:top-24
      space-y-6
    "
  >
    {/* HEADER */}
    <h3 className="flex items-center gap-2 permanent-marker-regular text-xl tracking-wide">
      <SlidersHorizontal size={18} />
      Filters
    </h3>

    {/* ================= CATEGORY ================= */}
    <div>
      <h4 className="mb-3 cinzel font-semibold tracking-wide">
        Category
      </h4>

      <div
        className="
          flex md:flex-col gap-2
          overflow-x-auto md:overflow-visible
          pb-2 md:pb-0
        "
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              cinzel whitespace-nowrap
              px-4 py-2 rounded-lg
              text-sm sm:text-base tracking-wide
              transition
              ${
                activeCategory === cat
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>

    {/* ================= PRICE ================= */}
    <div>
      <h4 className="mb-3 cinzel font-semibold tracking-wide flex items-center gap-2">
        <ArrowUpDown size={16} />
        Price Range
      </h4>

      <div className="flex justify-between text-sm mb-2 cinzel">
        <span>₹0</span>
        <span>₹{priceRange[1]}</span>
      </div>

      <input
        type="range"
        min="0"
        max={Math.max(
          ...products.map((p) => p.discountPrice || p.price || 0)
        )}
        step="100"
        value={priceRange[1]}
        onChange={(e) =>
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

          {filteredProducts.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              />
          ))}
        </div>
      </section>
    </div>
  );
}
