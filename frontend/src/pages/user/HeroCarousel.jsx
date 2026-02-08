import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios"; // adjust path if needed

const HeroCarousel = () => {
  const navigate = useNavigate();
  const visibleSlides = 3;

  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  /* 🔹 FETCH CAROUSEL PRODUCTS */
  useEffect(() => {
    const fetchCarouselProducts = async () => {
      try {
        const res = await API.get("/products?isCarousel=true");
        setProducts(res.data.products || res.data); 
      } catch (err) {
        console.error("Carousel fetch error:", err);
      }
    };

    fetchCarouselProducts();
  }, []);

  /* DUPLICATE SLIDES FOR INFINITE LOOP */
  const slides =
    products.length > 0
      ? [...products, ...products.slice(0, visibleSlides)]
      : [];

  /* AUTO SLIDE */
  useEffect(() => {
    if (!products.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [products]);

  /* LOOP RESET */
  useEffect(() => {
    if (index === products.length) {
      setTimeout(() => {
        setIsAnimating(false);
        setIndex(0);
      }, 700);
    } else {
      setIsAnimating(true);
    }
  }, [index, products.length]);

  if (!products.length) return null;

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
          className={`flex w-[70%] ${
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
                onClick={() => navigate(`/product/${item._id}`)}
              >
                <img
                  src={item.colors?.[0]?.images?.[0]}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6 text-white">
                  <h2 className="permanent-marker-regular text-2xl font-bold">
                    {item.carouselTitle}
                  </h2>

                  <p className="cinzel">
                    {item.carouselSubtitle}
                  </p>

                  <p className="permanent-marker-regular text-xl font-extrabold mt-1">
                    {item.carouselPriceText}
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
