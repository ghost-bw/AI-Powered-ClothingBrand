import { Heart } from "lucide-react";
import heroImage from "../../assets/Home/herobg2.jpeg";

import HeroCarousel from "./HeroCarousel";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BrandStory from "./BrandStory";
import InnerCircle from "./InnerCircle";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    title: "Light Blue Three Piece Textured Suit",
    price: "₹ 7,599",
    image: "https://kanwarsaa.com/public/uploads/all/FS6Full.png",
    badge: "BEST SELLER",
  },
  {
    id: 2,
    title: "Light Grey Textured Trouser - Chivas",
    price: "₹ 2,619",
    image:
      "https://cdn.shopify.com/s/files/1/0420/7073/7058/files/d308afc038e692817dcd523c7d1bba88.jpg?v=1742033590",
    badge: "BEST SELLER",
  },
  {
    id: 3,
    title: "Wine Reversible Solid Zipper Jacket",
    price: "₹ 4,421",
    image: "https://m.media-amazon.com/images/I/81d1Suz8nEL._AC_SL1500_.jpg",
    badge: "BEST SELLER",
  },
  {
    id: 4,
    title: "Jet Black Non Iron Solid Shirt - Sailor",
    price: "₹ 2,619",
    image: "https://m.media-amazon.com/images/I/818UXT76o4L._AC_UY1100_.jpg",
    badge: "BEST SELLER",
  },
  {
    id: 5,
    title: "Ivory Slim Fit Linen Blazer",
    price: "₹ 6,899",
    image:
      "https://www.allaboutsuit.com/pdcimg/detail/image/2020/11/df678fc9041a6b167011327534dba019.jpg",
    badge: "NEW ARRIVAL",
  },
  {
    id: 6,
    title: "Charcoal Grey Formal Waistcoat",
    price: "₹ 3,299",
    image:
      "https://www.gentlemansguru.com/wp-content/uploads/2019/02/Charcoal-Grey-Paisley-Vest-and-Tie-Set-Groom-Wedding-Tuxedo-Vest-from-Gentlemansguru.com_-1-scaled.jpg",
    badge: "PREMIUM",
  },
  {
    id: 7,
    title: "Olive Green Tailored Fit Chinos",
    price: "₹ 2,499",
    image:
      "https://www.jackjones.in/cdn/shop/files/141447402_g0.jpg?v=1745326328&width=2048",
    badge: "TRENDING",
  },
  {
    id: 8,
    title: "Beige Relaxed Fit Casual Overshirt",
    price: "₹ 3,799",
    image:
      "https://image.hm.com/assets/hm/73/a9/73a9866f15b07a36067d3e815432b27e9fd89890.jpg?imwidth=2160",
    badge: "LIMITED EDITION",
  },
];

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
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1500);
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
    <div className="min-h-[80px] sm:min-h-[100px] md:min-h-[120px] flex items-center justify-center">
      <h1 className="permanent-marker-regular text-4xl sm:text-5xl md:text-6xl font-light tracking-wide leading-tight text-white">
        {displayedText}
      </h1>
    </div>
  );
};

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[95vh] w-full">
        <img
          src={heroImage}
          alt="Hero"
          className="h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Text */}
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div className="max-w-3xl text-white">
            {/* Headline */}
            <AnimatedHeading />

            {/* Subheading */}
            <p
              className="allura-regular mt-2 
  text-lg sm:text-xl md:text-2xl lg:text-3xl 
  
  tracking-wide
  text-gray-200"
            >
              From little moments to big occasions — explore fashion for men,
              women, and kids. Designed for comfort, crafted for confidence.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/collections">
                <button className="border border-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-white hover:text-black transition duration-300 cursor-pointer">
                  Shop Collection
                </button>
              </Link>

              <Link to="/shopcollection">
                <button className="bg-white text-black px-8 py-3 text-sm tracking-wider uppercase hover:bg-gray-200 transition duration-300 cursor-pointer">
                  Explore New Arrivals
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <p className="tracking-widest cinzel text-xl mt-8 mb-2 flex justify-center">
        PREMIUM
      </p>
      <div className="flex justify-center gap-10 ">
        <button className="permanent-marker-regular text-2xl tracking-wide border-b-2 border-black pb-2">
          Wardrobe Picks
        </button>
      </div>
      <HeroCarousel />

      {/* ================= PRODUCT SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <p className="tracking-widest cinzel text-xl mb-4 flex justify-center">
          HERE FOR YOU
        </p>
        <div className="permanent-marker-regular flex justify-center gap-8 mb-14">
          <button className=" text-2xl tracking-wide border-b-2 border-black pb-2">
            BESTSELLER
          </button>
          <button className="text-2xl tracking-wide text-gray-400">
            THIS IS NEW
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className="group bg-white rounded-2xl overflow-hidden 
                 shadow-[0_10px_30px_rgba(0,0,0,0.48)]
                 hover:shadow-[0_25px_60px_rgba(0,0,0,0.65)]
                 transition-all duration-500 ease-out
                 hover:-translate-y-2 block"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[420px] object-cover 
                     transition-transform duration-700 ease-out
                     group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />

                {/* Heart */}
                <button
                  onClick={(e) => e.preventDefault()}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur 
                     rounded-full p-2 shadow-md
                     hover:scale-110 transition"
                >
                  <Heart size={18} className="text-gray-700" />
                </button>

                {/* Badge */}
                <span
                  className="absolute bottom-4 right-4 bg-[#6b5b3e] 
                         text-white text-xs px-3 py-1 tracking-widest uppercase"
                >
                  {item.badge}
                </span>
              </div>

              {/* Info */}
              <div className="p-5 text-sm">
                <p className="mb-1 cormorant-garamond text-gray-900 tracking-wide">
                  {item.title}
                </p>
                <p className="text-black-900 cinzel font-bold text-base">
                  MRP ₹{item.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <BrandStory />
      <InnerCircle />
    </div>
  );
};

export default Landing;