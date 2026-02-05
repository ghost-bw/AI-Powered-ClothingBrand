import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SlidersHorizontal, Heart } from "lucide-react";

/* HERO SLIDES */
const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
    title: "Premium Kids Collection",
    subtitle: "Designed for comfort. Styled for smiles.",
  },
  {
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    title: "Cute & Cozy Styles",
    subtitle: "Soft fabrics kids truly love",
  },
];

/* CATEGORIES  */
const categories = [
  { name: "All", id: "all" },
  { name: "Boys T-Shirts", id: "boys-tshirts" },
  { name: "Boys Shirts", id: "boys-shirts" },
  { name: "Boys Bottom Wear", id: "boys-bottomwear" },
  { name: "Boys Footwear", id: "boys-footwear" },
  { name: "Girls Dresses", id: "girls-dresses" },
  { name: "Girls Tops", id: "girls-tops" },
];

/* ------------------ PRODUCTS ------------------ */
const kidsProducts = [
  { id: 1, title: "Boys Graphic T-Shirt", price: 799, category: "boys-tshirts", image: "https://images.unsplash.com/photo-1520975916090-3105956dac38" },
  { id: 2, title: "Boys Printed Tee", price: 699, category: "boys-tshirts", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b" },
  { id: 3, title: "Boys Casual Shirt", price: 1099, category: "boys-shirts", image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0" },
  { id: 4, title: "Boys Joggers", price: 999, category: "boys-bottomwear", image: "https://images.unsplash.com/photo-1542068829-1115f7259450" },
  { id: 5, title: "Boys Sneakers", price: 1799, category: "boys-footwear", image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519" },
  { id: 6, title: "Girls Party Dress", price: 1499, category: "girls-dresses", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
  { id: 7, title: "Girls Casual Top", price: 899, category: "girls-tops", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246" },
];

/*  HERO  */
function KidsHeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((p) => (p + 1) % heroSlides.length),
      4000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[55vh] overflow-hidden">
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          <div className="absolute inset-0 bg-black/40" />
          <img src={slide.image} className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-4xl md:text-6xl font-bold">{slide.title}</h2>
            <p className="mt-3 text-lg opacity-90">{slide.subtitle}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

/* MAIN PAGE */
export default function KidsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? kidsProducts
      : kidsProducts.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-[#fafafa]">
      <KidsHeroCarousel />

      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-[230px_1fr] gap-5">
        {/* SIDEBAR */}
        <aside>
          <div className="bg-white rounded-xl shadow p-4 sticky top-24">
            <div className="flex items-center gap-2 mb-3">
              <SlidersHorizontal size={18} />
              <h2 className="font-semibold text-lg">Filters</h2>
            </div>

            <ul className="space-y-1">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition
                    ${
                      activeCategory === cat.id
                        ? "bg-black text-white"
                        : "hover:bg-gray-100"
                    }`}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* PRODUCTS */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* PRODUCT CARD */
function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="
        group bg-white rounded-2xl cursor-pointer
        transition-all duration-300 ease-out
        hover:-translate-y-2 hover:shadow-2xl
      "
    >
      {/* IMAGE */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl">
        <img
          src={product.image}
          alt={product.title}
          className="
            w-full h-full object-cover
            transition-transform duration-500 ease-out
            group-hover:scale-110
          "
        />

        {/* WISHLIST */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="
            absolute top-3 right-3
            bg-white p-2 rounded-full shadow
            transition-transform duration-300
            hover:scale-110
          "
        >
          <Heart size={16} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* CATEGORY */}
        <p className="text-sm text-gray-500 mb-1">
          {product.category}
        </p>

        {/* TITLE */}
        <p className="font-semibold text-base leading-tight">
          {product.title}
        </p>

        {/* PRICE + BUTTON */}
        <div className="flex items-center justify-between mt-4">
          <span className="font-bold text-xl">
            ₹{product.price}
          </span>

          <button
            className="
              border border-black px-4 py-1.5 rounded-full text-sm
              transition-all duration-300
              group-hover:bg-black group-hover:text-white
            "
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}