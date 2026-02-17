
import heroImage from "../../assets/Home/herobg2.webp";
import HeroCarousel from "./HeroCarousel";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BrandStory from "./BrandStory";
import InnerCircle from "./InnerCircle";
import { Link } from "react-router-dom";
import Coupons from "../../components/Home/Coupons";
import API from "../../api/axios";


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
    } else if (isDeleting && displayedText.length === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, 500);
    }


    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting]);

  return (
    <div className="min-h-[60px] sm:min-h-[80px] md:min-h-[110px] flex items-center justify-center">
      <h1 className="cinzel text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide leading-tight text-white text-center px-2">
        <b>{displayedText}</b>
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

        const final = [
  ...bestSeller,
  ...newArrivals,
  ...trending,
  ...premium,
  ...limited,
];

const unique = Array.from(
  new Map(final.map(p => [p._id, p])).values()
);

setProducts(unique.slice(0, 8));

      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="w-full overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative w-full h-[60vh] sm:h-[80vh] md:h-screen overflow-hidden">
        <img
          src={heroImage}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex items-center justify-center text-center px-4 sm:px-6">
          <div className="max-w-3xl text-white">
            <AnimatedHeading />

            <p className="cinzel mt-3 text-sm sm:text-sm md:text-lg lg:text-xl tracking-wide text-gray-200 px-2">
              From little moments to big occasions — explore fashion for men,
              women, and kids. Designed for comfort, crafted for confidence.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link to="/collections">
                <button className="cinzel border border-white px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:text-black transition duration-300 w-full sm:w-auto">
                  Shop Collection
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM */}
      <p className="tracking-widest cinzel text-2xl sm:text-4xl md:text-5xl mt-8 mb-2 flex justify-center text-center px-2">
        <b>PREMIUM</b>
      </p>

      <div className="flex justify-center gap-6 sm:gap-10 px-2">
        <button className="cinzel text-lg sm:text-2xl tracking-wide border-b-2 border-black pb-2">
          Wardrobe Picks
        </button>
      </div>

      <HeroCarousel />

 
      {/* PRODUCT SECTION */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-10">
        <p className="tracking-widest cinzel text-base sm:text-xl mb-4 flex justify-center text-center">
          HERE FOR YOU
        </p>

        <div className="permanent-marker-regular flex justify-center gap-4 sm:gap-8 mb-8 sm:mb-14 text-center">
          <button className="text-base sm:text-2xl tracking-wide border-b-2 border-black pb-2">
            BESTSELLER
          </button>

          <button className="text-base sm:text-2xl tracking-wide text-gray-400">
            THIS IS NEW
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
         {products.map((item, i) => (
  <Link key={`${item._id}-${i}`}to={`/product/${item._id}`}
              className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden 
              shadow-[0_5px_20px_rgba(0,0,0,0.25)]
              sm:shadow-[0_10px_30px_rgba(0,0,0,0.48)]
              hover:shadow-[0_25px_60px_rgba(0,0,0,0.65)]
              transition-all duration-500 ease-out
              hover:-translate-y-2 block"
            >
              <div className="relative overflow-hidden">
                <img
                src={item.colors?.[0]?.images?.[0] || "/fallback.jpg"}
                  alt={item.name}
                  className="w-full h-[180px] sm:h-[260px] md:h-[320px] lg:h-[420px] object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                

                <span className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-[#6b5b3e] text-white text-[9px] sm:text-xs px-2 sm:px-3 py-1 tracking-widest uppercase">
                     {item.badge}
                </span>
              </div>

              <div className="p-2 sm:p-4 text-xs sm:text-sm">
                <p className="mb-1 cormorant-garamond text-gray-900 tracking-wide">
                  {item.name}

                </p>

                <p className="cinzel text-sm sm:text-base">
                  MRP ₹{item.discountPrice ?? item.price ?? 0}
                </p>

                <p className="cinzel text-sm sm:text-base">
                 <b>Size:</b> {item.sizes?.length ? item.sizes.join(", ") : "Free Size"}

                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>


      {/* COUPONS */}
      <div className="flex justify-center gap-10 mt-6 px-2">
        <button className="cinzel text-xl sm:text-3xl tracking-wide border-b-2 border-black pb-2">
          Curated Saving
        </button>
      </div>

      <Coupons />

      <BrandStory />

      <InnerCircle />
    </div>
  );
};

export default Landing;
