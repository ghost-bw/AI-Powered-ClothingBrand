import React, { useEffect, useState } from "react";
import { Heart, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/Home/Navbar";

const MenCategoryPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

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
        ...new Set(menProducts.map(p => p.category?.name || p.category))
      ];

      setCategories(cats);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          p => (p.category?.name || p.category) === activeCategory
        );

  /* HERO TEXT ANIMATION */

  const text = "MEN COLLECTION";

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
  };

  const letter = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-[#faf7f2] min-h-screen">
      <Navbar />

      {/* HERO — SAME BACKGROUND IMAGE */}

      <div
        className="relative h-[70vh] bg-cover bg-top"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dttjgnypq/image/upload/v1770404996/male_k752dv.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.h1
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-white text-4xl md:text-6xl font-light tracking-[0.35em] uppercase"
          >
            {text.split("").map((char, index) => (
              <motion.span key={index} variants={letter} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
        </div>
      </div>

      {/* CONTENT */}

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

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredProducts.map(product => (
              <motion.div
                key={product._id}
                layout
                whileHover={{ y: -6 }}
                onClick={() => navigate(`/product/${product._id}`)}
                className="cursor-pointer bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition"
              >
                <div className="relative aspect-3/4 overflow-hidden">
                  <img
                    src={product.colors?.[0]?.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />

                  <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
                    <Heart size={16} />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-medium">{product.name}</h3>

                  <p className="text-sm text-gray-500">
                    {product.category?.name}
                  </p>

                  <div className="mt-2 flex justify-between items-center">
                    <span className="font-semibold">
                      ₹{product.discountPrice || product.price}
                    </span>

                    <button className="text-sm px-4 py-1.5 border rounded-full hover:bg-black hover:text-white">
                      View
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default MenCategoryPage;
