import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

/* ------------------ SCROLL HELPER ------------------ */
const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

/* ================= HERO ================= */
function KidsHeroCarousel({ heroSlides }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!heroSlides.length) return;

    const timer = setInterval(
      () => setCurrent((p) => (p + 1) % heroSlides.length),
      4000
    );

    return () => clearInterval(timer);
  }, [heroSlides]);

  if (!heroSlides.length) return null;

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />

          <img
            src={slide.image}
            className="w-full h-full object-cover"
            alt=""
          />

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-4xl md:text-6xl font-bold">{slide.title}</h2>
            <p className="mt-3 opacity-90 max-w-xl">{slide.subtitle}</p>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full ${
              current === i ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/* ================= MAIN ================= */
export default function KidsCategory() {
  const [products, setProducts] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    const load = async () => {
      const res = await API.get("/products");
      const data = Array.isArray(res.data) ? res.data : res.data.products;

      /* ONLY KIDS */
    const kids = data.filter(p =>
  p.collections?.includes("Kids")
);

      setProducts(kids);

      /* HERO SLIDES (TOP 3) */
      setHeroSlides(
        kids.slice(0, 3).map((p) => ({
          image: p.colors?.[0]?.images?.[0],
          title: p.name,
          subtitle: p.description,
        }))
      );

      /* AUTO CATEGORY MAP */
      const map = {};

      kids.forEach((p) => {
        const gender = p.gender || "boys";
        const sub = p.subCategory || "Others";

        if (!map[gender]) map[gender] = new Set();
        map[gender].add(sub);
      });

      const formatted = {};
      Object.keys(map).forEach((k) => (formatted[k] = [...map[k]]));

      setCategories(formatted);
    };

    load();
  }, []);

  return (
    <div className="w-full bg-[#fafafa]">

      <KidsHeroCarousel heroSlides={heroSlides} />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold">KIDS FASHION</h1>

          <div className="hidden md:flex gap-10">
            {Object.keys(categories).map((g) => (
              <div key={g} className="group relative cursor-pointer">
                <span className="capitalize">{g} ▾</span>

                <div className="absolute left-0 mt-4 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:visible group-hover:opacity-100 transition">
                  {categories[g].map((c) => (
                    <p
                      key={c}
                      onClick={() => scrollToSection(`${g}-${c}`)}
                      className="px-5 py-3 hover:bg-gray-50"
                    >
                      {c}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* SECTIONS */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-24">
        {Object.keys(categories).map((gender) =>
          categories[gender].map((cat) => (
            <CategorySection
              key={`${gender}-${cat}`}
              id={`${gender}-${cat}`}
              title={`${gender} ${cat}`}
              products={products}
            />
          ))
        )}
      </div>
    </div>
  );
}

/* ================= CATEGORY ================= */
function CategorySection({ id, title, products }) {
  const navigate = useNavigate();
  const sub = title.split(" ")[1].toLowerCase();

  const items = products.filter((p) =>
    p.subCategory?.toLowerCase().includes(sub)
  );

  if (!items.length) return null;

  return (
    <section id={id} className="mb-16 text-center">

      <h3 className="text-3xl font-bold mb-10">{title}</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((p) => (
          <div
            key={p._id}
            onClick={() => navigate(`/product/${p._id}`)}
            className="bg-white rounded-2xl shadow hover:shadow-xl cursor-pointer"
          >
            <div className="aspect-3/4 overflow-hidden">
              <img
                src={p.colors?.[0]?.images?.[0]}
                className="w-full h-full object-cover hover:scale-110 transition"
                alt=""
              />
            </div>

            <div className="p-4">
              <p className="font-semibold">{p.name}</p>
              <p className="font-bold mt-1">
                ₹{p.discountPrice || p.price}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/cart");
                  }}
                  className="flex-1 bg-green-500 text-white py-2 rounded"
                >
                  Add to Cart
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/checkout");
                  }}
                  className="flex-1 bg-indigo-500 text-white py-2 rounded"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
