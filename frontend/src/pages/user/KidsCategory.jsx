import React, { useState, useMemo, useEffect } from "react";
import ProductCard from "../../components/Home/ProductCard";
import API from "../../api/axios";
import Navbar from "../../components/Home/Navbar";
import { useShop } from "../../context/ShopContext";

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

  /* ❤️ WISHLIST FROM CONTEXT (SAME AS MEN) */
  // const { wishlist, toggleWishlist } = useShop();

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
    }, 60);

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

  return (
    <div className="bg-[#fafafa] min-h-screen">
      <Navbar />

      {/* HERO */}
       <div
        className="relative h-[80vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dttjgnypq/image/upload/v1770397575/Kid_s_kuv61w.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative text-center text-white px-4">
          <h1 className=" permanent-marker-regular text-4xl md:text-6xl font-bold">
            {typedText}
          </h1>

          {done && (
            <p className="font-dancing text-4xl mt-4 text-gray-200">
              {SUB_TEXT}
            </p>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-4 gap-10">

        {/* FILTERS */}
      <aside className="lg:col-span-1">
  <div
    className="
      bg-white rounded-2xl shadow
      p-4 sm:p-6
      lg:sticky lg:top-24
      space-y-5
    "
  >
    <h3 className="permanent-marker-regular text-xl tracking-wide">
      Filters
    </h3>

    {/* ================= GENDER ================= */}
    <div>
      <h4 className="mb-2 font-medium">Gender</h4>

      <div
        className="
          flex lg:flex-col gap-2
          overflow-x-auto lg:overflow-visible
          pb-2 lg:pb-0
        "
      >
        {["all", "boys", "girls"].map((g) => (
          <button
            key={g}
            onClick={() => {
              setGender(g);
              setCategory("all");
            }}
            className={`cinzel
              whitespace-nowrap px-4 py-2 rounded-lg
              text-sm sm:text-base tracking-wide
              transition
              ${
                gender === g
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }
            `}
          >
            {g.toUpperCase()}
          </button>
        ))}
      </div>
    </div>

    {/* ================= CATEGORY ================= */}
    {gender !== "all" && categories.length > 0 && (
      <div>
        <h4 className="mb-2 font-medium">Category</h4>

        <div
          className="
            flex lg:flex-col gap-2
            overflow-x-auto lg:overflow-visible
            pb-2 lg:pb-0
          "
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`cinzel
                whitespace-nowrap px-4 py-2 rounded-lg
                text-sm sm:text-base tracking-wide
                transition
                ${
                  category === c
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }
              `}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    )}

    {/* ================= PRICE ================= */}
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
        onChange={(e) => {
          const val = Number(e.target.value);
          setSliderValue(val);
          setPriceRange([0, val]);
        }}
        className="w-full accent-black"
      />
    </div>
  </div>
</aside>

        {/* PRODUCTS */}
        <main className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-6">
          {loading && <p>Loading...</p>}

          {filteredProducts.map(product => (
            <ProductCard
              key={product._id}
              product={product}
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
