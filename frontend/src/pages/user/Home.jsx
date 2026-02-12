import { Heart } from "lucide-react";
import heroImage from "../../assets/Home/herobg2.jpeg";
import HeroCarousel from "./HeroCarousel";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BrandStory from "./BrandStory";
import InnerCircle from "./InnerCircle";
import Navbar from "../../components/Home/Navbar";
import API from "../../api/axios";
import Coupons from "../../components/Home/Coupons";
import Footer from "../../components/Home/Footer";

/* ================= ANIMATED HEADING (UNCHANGED) ================= */
const AnimatedHeading = () => {
  const text = "Style for Every Story";
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;

    if (!isDeleting && displayedText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, displayedText.length + 1));
      }, 80);
    } else if (!isDeleting && displayedText.length === text.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, displayedText.length - 1));
      }, 40);
    } else {
      timeout = setTimeout(() => setIsDeleting(false), 500);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting]);

  return (
    <div className="min-h-[80px] sm:min-h-[100px] md:min-h-[120px] flex items-center justify-center">
      <h1 className="permanent-marker-regular text-4xl sm:text-5xl md:text-6xl font-light tracking-wide leading-tight text-white">
        {displayedText}
      </h1>
    </div>
  );
};

const Landing = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  /* ================= FETCH PRODUCTS (LOGIC ONLY) ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        const data = res.data.products || res.data;

        const newArrivals = [...data]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 2)
          .map(p => ({ ...p, badge: "NEW ARRIVAL" }));

        const trending = data
          .filter(p => p.isTrending)
          .slice(0, 2)
          .map(p => ({ ...p, badge: "TRENDING" }));

        const premium = data
          .filter(p => p.isPremium)
          .slice(0, 2)
          .map(p => ({ ...p, badge: "PREMIUM" }));

        const limited = data
          .filter(p => p.isLimited)
          .slice(0, 2)
          .map(p => ({ ...p, badge: "LIMITED EDITION" }));

        const usedIds = new Set([
          ...newArrivals,
          ...trending,
          ...premium,
          ...limited
        ].map(p => p._id));

        const bestSeller = data
          .filter(p => !usedIds.has(p._id))
          .slice(0, 2)
          .map(p => ({ ...p, badge: "BEST SELLER" }));

        setProducts(
          [
            ...bestSeller,
            ...newArrivals,
            ...trending,
            ...premium,
            ...limited,
          ].slice(0, 8)
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

return (
  <div className="w-full">
    <Navbar />

    {/* ================= HERO ================= */}
    <section className="relative h-[70vh] sm:h-[90vh] md:h-[95vh] w-full overflow-hidden">
      <img
        src={heroImage}
        alt="Hero"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 flex items-center justify-center text-center px-4 sm:px-6">
        <div className="max-w-3xl text-white">
          <AnimatedHeading />

          <p
            className="allura-regular mt-3 
              text-base sm:text-lg md:text-2xl lg:text-3xl 
              tracking-wide text-gray-200"
          >
            From little moments to big occasions — explore fashion for men,
            women, and kids. Designed for comfort, crafted for confidence.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/collections">
              <button className="border border-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-white hover:text-black transition duration-300 cursor-pointer">
                Shop Collection
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* ================= COUPONS ================= */}
    <div className="flex justify-center gap-10 mt-10">
      <button className="permanent-marker-regular text-xl sm:text-2xl tracking-wide border-b-2 border-black pb-2">
        Curated Saving
      </button>
    </div>

    <Coupons />

    {/* ================= CAROUSEL ================= */}
    <p className="tracking-widest cinzel text-lg sm:text-xl mt-10 mb-2 flex justify-center">
      PREMIUM
    </p>

    <div className="flex justify-center gap-10">
      <button className="permanent-marker-regular text-xl sm:text-2xl tracking-wide border-b-2 border-black pb-2">
        Wardrobe Picks
      </button>
    </div>

    <HeroCarousel />

    {/* ================= PRODUCT GRID ================= */}
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <p className="tracking-widest cinzel text-lg sm:text-xl mb-4 flex justify-center text-center">
        HERE FOR YOU
      </p>

      <div className="permanent-marker-regular flex flex-wrap justify-center gap-6 sm:gap-8 mb-12 text-center">
        <button className="text-lg sm:text-2xl tracking-wide border-b-2 border-black pb-2">
          BESTSELLER
        </button>
        <button className="text-lg sm:text-2xl tracking-wide text-gray-400">
          THIS IS NEW
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">

        {products.map((item) => (
          <Link
            key={item._id}
            to={`/product/${item._id}`}
            className="group bg-white rounded-2xl overflow-hidden 
              shadow-[0_10px_30px_rgba(0,0,0,0.48)]
              hover:shadow-[0_25px_60px_rgba(0,0,0,0.65)]
              transition-all duration-500 ease-out
              hover:-translate-y-2 block"
          >
            {/* IMAGE */}
            <div className="relative overflow-hidden">
              <img
                src={item.colors?.[0]?.images?.[0]}
                alt={item.name}
                className="w-full h-[320px] sm:h-[380px] lg:h-[420px] object-cover 
                  transition-transform duration-700 ease-out
                  group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />

              <span
                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-[#6b5b3e] 
                  text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 tracking-widest uppercase"
              >
                {item.badge}
              </span>
            </div>

            {/* INFO */}
            <div className="p-4 sm:p-5 text-sm">
              <p className="mb-1 cormorant-garamond text-gray-900 tracking-wide">
                {item.name}
              </p>
              <p className="cinzel font-bold text-base">
                MRP ₹{item.discountPrice || item.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>

    <BrandStory />
    <InnerCircle />
    <Footer />
  </div>
);

};

export default Landing;
