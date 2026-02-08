import React, { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import API from "../../api/axios";
import Navbar from "../../components/Home/Navbar";
import ProductCard from "../../components/Home/ProductCard";

const MenCategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  /* ❤️ Wishlist state */
  const [wishlist, setWishlist] = useState([]);

  /* -------- HERO TYPEWRITER -------- */
  const headingText = "Men's Clothing Collection";
  const subText =
    "Elevate your everyday style with premium fits, timeless designs and confident comfort.";

  const [typed, setTyped] = useState("");
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (index < headingText.length) {
      const t = setTimeout(() => {
        setTyped(prev => prev + headingText[index]);
        setIndex(index + 1);
      }, 80);
      return () => clearTimeout(t);
    } else {
      setDone(true);
    }
  }, [index, headingText]);

  /* FETCH PRODUCTS */
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await API.get("/products?collection=men");

      const menProducts = Array.isArray(res.data)
        ? res.data
        : res.data.products;

      setProducts(menProducts);

      const cats = [
        "All",
        ...new Set(menProducts.map(p => p.category?.name || p.category)),
      ];

      setCategories(cats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          p => (p.category?.name || p.category) === activeCategory
        );

  /* ❤️ Wishlist toggle */
  const handleWishlistToggle = product => {
    setWishlist(prev =>
      prev.includes(product._id)
        ? prev.filter(id => id !== product._id)
        : [...prev, product._id]
    );
  };

  return (
    <div className="bg-[#faf7f2] min-h-screen">
      <Navbar />

      {/* ================= HERO ================= */}
      <div
        className="relative h-[70vh] bg-cover bg-top"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dttjgnypq/image/upload/v1770404996/male_k752dv.jpg)",
        }}
      >
        {/* shadow overlay */}
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center justify-end">
          <motion.div
            initial={{ scale: 1 }}
            animate={done ? { scale: [1, 1.07, 1] } : {}}
            transition={{ duration: 1 }}
            className="text-right max-w-xl text-white"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {typed}
              {!done && <span className="animate-pulse">|</span>}
            </h1>
            {done && <p className="text-lg text-gray-200">{subText}</p>}
          </motion.div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* SIDEBAR */}
        <aside>
          <div className="bg-white rounded-xl shadow p-5 sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal size={18} />
              <h2 className="font-semibold text-lg">Categories</h2>
            </div>

            <ul className="space-y-2">
              {categories.map(cat => (
                <motion.li
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium ${
                    activeCategory === cat
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </motion.li>
              ))}
            </ul>
          </div>
        </aside>

        {/* PRODUCTS */}
        <section className="lg:col-span-3">
          {loading && (
            <p className="text-center text-gray-500">Loading products...</p>
          )}

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProducts.map(product => (
              <motion.div key={product._id} layout whileHover={{ y: -6 }}>
                <ProductCard
                  product={product}
                  onWishlistToggle={handleWishlistToggle}
                  isWishlisted={wishlist.includes(product._id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default MenCategoryPage;
