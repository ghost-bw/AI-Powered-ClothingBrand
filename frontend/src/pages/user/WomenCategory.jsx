import React, { useEffect, useMemo, useState } from "react";
import { Heart, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/Home/Navbar";

const WomenCollectionPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= LOAD PRODUCTS ================= */

  const loadProducts = async () => {
    try {
      setLoading(true);

      /* STEP 1 — WOMEN COLLECTION */

      const colRes = await API.get("/collections/?slug=women");
      const collectionId = colRes.data?.[0]?._id;

      if (!collectionId) return;

      /* STEP 2 — PRODUCTS */

      const prodRes = await API.get(`/products?collection=women`);


      const womenProducts = Array.isArray(prodRes.data)
        ? prodRes.data
        : prodRes.data.products;

      setProducts(womenProducts);

      /* HERO */

      const hero = womenProducts
        .slice(0, 3)
        .map(p => p.colors?.[0]?.images?.[0])
        .filter(Boolean);

      setHeroImages(hero);

      /* BUILD CATEGORIES (OBJECT SAFE) */

      const unique = [];

      womenProducts.forEach(p => {
        if (p.category && !unique.find(c => c._id === p.category._id)) {
          unique.push(p.category);
        }
      });

      setCategories([{ _id: "all", name: "All" }, ...unique]);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  /* ================= HERO AUTO ================= */

  useEffect(() => {
    if (!heroImages.length) return;

    const interval = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages]);

  /* ================= FILTER ================= */

  const filteredProducts = useMemo(() => {
    let list = products;

    if (activeCategory !== "All") {
      list = list.filter(p => p.category?.name === activeCategory);
    }

    if (search) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return list;
  }, [products, activeCategory, search]);

  const toggleWishlist = id => {
    setWishlist(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  if (loading) return <div className="py-40 text-center">Loading...</div>;

  return (
    <div className="bg-[#faf7f2] min-h-screen">
  <Navbar/>
      {/* ================= HERO ================= */}

      <section className="relative h-[70vh] overflow-hidden">

        {heroImages.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              heroIndex === i ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          />
        ))}

        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 h-full flex flex-col justify-center px-6 max-w-7xl mx-auto text-white">
          <h1 className="text-5xl font-serif mb-3">Women’s Collection</h1>

          <div className="bg-white rounded-full flex items-center px-5 py-3 max-w-md">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 outline-none text-gray-700"
            />
          </div>
        </div>

      </section>

      {/* ================= CONTENT ================= */}

      <section className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        {/* CATEGORIES */}

        <aside className="sticky top-24">
          {categories.map(cat => (
            <div
              key={cat._id}
              onClick={() => setActiveCategory(cat.name)}
              className={`cursor-pointer px-4 py-2 rounded mb-2 transition
              ${
                activeCategory === cat.name
                  ? "bg-black text-white"
                  : "hover:pl-4"
              }`}
            >
              {cat.name}
            </div>
          ))}
        </aside>

        {/* PRODUCTS */}

        <div className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredProducts.map(product => (
            <div
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg cursor-pointer"
            >

              <div className="relative">

                <img
                  src={product.colors?.[0]?.images?.[0]}
                  className="h-72 w-full object-cover"
                  alt=""
                />

                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleWishlist(product._id);
                  }}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full"
                >
                  <Heart
                    size={18}
                    className={
                      wishlist.includes(product._id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-500"
                    }
                  />
                </button>

              </div>

              <div className="p-4">
                <h4>{product.name}</h4>
                <p className="text-gray-600">₹{product.price}</p>
              </div>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
};

export default WomenCollectionPage;
