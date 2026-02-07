import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const heroImages = [
  {
    id: 1,
    img: "https://wrogn.com/cdn/shop/files/VM1.webp?v=1744697911&width=720",
    title: "BUY 2",
    subtitle: "OVERSIZED T-SHIRTS",
    price: "AT ₹1099",
  },
  {
    id: 2,
    img: "https://images.meesho.com/images/products/393410005/27x8n_512.jpg",
    title: "BUY 2",
    subtitle: "JOGGERS",
    price: "AT ₹1699",
  },
  {
    id: 3,
    img: "https://ideogram.ai/assets/image/balanced/response/VOmXIJ98RN-2b51PQ8k1UQ@2k",
    title: "UPGRADE",
    subtitle: "DENIM ESSENTIALS",
    price: "AT ₹1299",
  },
  {
    id: 4,
    img: "https://m.media-amazon.com/images/I/81EMeBYzuRL._AC_UY1100_.jpg",
    title: "LIMITED",
    subtitle: "EDITION JACKETS",
    price: "AT ₹2399",
  },
  {
    id: 5,
    img: "https://images-na.ssl-images-amazon.com/images/I/91t-wmJJapL._AC_SL500_.jpg",
    title: "SUMMER",
    subtitle: "LINEN COLLECTION",
    price: "AT ₹1699",
  },
  {
    id: 6,
    img: "https://www.globaltextiletimes.com/wp-content/uploads/2025/12/global-streetwear-movements-driving-new-fashion-trends.webp",
    title: "TRENDING",
    subtitle: "URBAN STREETWEAR",
    price: "AT ₹2299",
  },
];

const HeroCarousel = () => {
  const navigate = useNavigate();
  const visibleSlides = 3;

  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  // duplicate slides for infinite loop
  const slides = [...heroImages, ...heroImages.slice(0, visibleSlides)];

  /* AUTO SLIDE */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (index === heroImages.length) {
      setTimeout(() => {
        setIsAnimating(false);
        setIndex(0);
      }, 700);
    } else {
      setIsAnimating(true);
    }
  }, [index]);

  return (
    <div className="w-full mt-10 mb-12 relative">
      <div className="w-full mx-auto px-4 overflow-hidden relative">
        {/* LEFT */}
        <button
          onClick={() => index > 0 && setIndex(index - 1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10
          bg-white/80 backdrop-blur-md p-3 rounded-full shadow-md hover:bg-white"
        >
          <ChevronLeft size={22} />
        </button>

        {/* RIGHT */}
        <button
          onClick={() => setIndex(index + 1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10
          bg-white/80 backdrop-blur-md p-3 rounded-full shadow-md hover:bg-white"
        >
          <ChevronRight size={22} />
        </button>

        {/* TRACK */}
        <div
          className={`flex w-[70%]  ${
            isAnimating ? "transition-transform duration-700 ease-in-out" : ""
          }`}
          style={{
            transform: `translateX(-${index * (100 / visibleSlides)}%)`,
          }}
        >
          {slides.map((item, i) => (
            <div
              key={i}
              className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2"
            >
              <div
                className="relative aspect-9/10 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img
                  src={item.img}
                  alt=""
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6 text-white">
                  <h2 className="permanent-marker-regular text-2xl font-bold">
                    {item.title}
                  </h2>
                  <p className="cinzel">{item.subtitle}</p>
                  <p className="permanent-marker-regular text-xl font-extrabold mt-1">
                    {item.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;