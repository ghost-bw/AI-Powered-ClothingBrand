import React, { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import API from "../../api/axios";
import Navbar from "../../components/Home/Navbar";
import ProductCard from "../../components/Home/ProductCard";
import { useShop } from "../../context/ShopContext";

const MenCategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  /* ✅ GLOBAL SHOP CONTEXT */
  // const { toggleWishlist, isWishlisted } = useShop();

  /* -------- HERO TYPEWRITER -------- */
   const headingText = "Men's Clothing Collection";

  const subText =
    "Elevate your everyday style with premium fits and timeless designs.";

  const [typed, setTyped] = useState("");
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (index < headingText.length) {
      const t = setTimeout(() => {
        setTyped((prev) => prev + headingText[index]);
        setIndex(index + 1);
      }, 50);

      return () => clearTimeout(t);
    } else {
      setDone(true);
    }
  }, [index]);

  /* ================= FETCH PRODUCTS ================= */
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
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILTER ================= */
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          p => (p.category?.name || p.category) === activeCategory
        );

  return (
    <div className="bg-[#faf7f2] min-h-screen">
      <Navbar />

      {/* ================= HERO ================= */}
      <div className="relative h-[80vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dttjgnypq/image/upload/v1770530824/Men_sCollection_rhgsj6.png)",
        }}>
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="text-white">
            <h1 className="text-3xl permanent-marker-regular md:text-5xl font-bold font-serif">
              {typed}
            </h1>

            {done && (
              <p className="mt-3 text-4xl font-dancing text-gray-200">
                {subText}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIDEBAR */}
       <aside className="lg:col-span-1">
  <div
    className="
      bg-white rounded-xl shadow 
      p-4 sm:p-5 
      lg:sticky lg:top-24
    "
  >
    <div className="flex items-center gap-2 mb-3">
      <SlidersHorizontal size={18} />
      <h2 className="permanent-marker-regular text-xl tracking-wide">
        Categories
      </h2>
    </div>

    <ul
      className="
        flex lg:flex-col gap-2
        overflow-x-auto lg:overflow-visible
        pb-2 lg:pb-0
      "
    >
      {categories.map((cat) => (
        <motion.li
          key={cat}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveCategory(cat)}
          className={`cinzel
            whitespace-nowrap cursor-pointer 
            px-4 py-2 rounded-md
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
        </motion.li>
      ))}
    </ul>
  </div>
</aside>


        {/* PRODUCTS */}
        <section className="lg:col-span-3">
          {loading && (
            <p className="text-center text-gray-500">
              Loading products...
            </p>
          )}

          {!loading && filteredProducts.length === 0 && (
            <p className="text-center text-gray-500">
              No products found.
            </p>
          )}

          <motion.div
  layout
  className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
>

            {filteredProducts.map(product => (
              <motion.div
                key={product._id}
                layout
                whileHover={{ y: -6 }}
              >
               <ProductCard
                product={product}
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
