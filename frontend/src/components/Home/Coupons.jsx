import React, { useState, useEffect } from "react";

import API from "../../api/axios";

const gradients = [
  "from-[#f8f5ec] via-[#f1e7d0] to-[#f8f5ec]",
  "from-[#f3f4f6] via-[#e5e7eb] to-[#f3f4f6]",
  "from-[#ecfdf5] via-[#d1fae5] to-[#ecfdf5]",
  "from-[#fff7ed] via-[#ffedd5] to-[#fff7ed]",
  "from-[#f5f3ff] via-[#ede9fe] to-[#f5f3ff]",
];

const Coupons = () => {
  const [current, setCurrent] = useState(1);
  const [transition, setTransition] = useState(true);
  const [coupons, setCoupons] = useState([]);

  /* ================= FETCH FROM BACKEND ================= */
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await API.get("/coupons");
        const activeCoupons = (res.data || []).filter(
          c => c.status === "Active"
        );

        const formatted = activeCoupons.map((c, i) => ({
          _id: c._id,
          title: c.code,
          subtitle: `${c.type.toUpperCase()} DISCOUNT`,
          highlight:
            c.type === "Percentage"
              ? `${c.discountValue}% OFF • MIN ₹${c.minSpend}`
              : `₹${c.discountValue} OFF • MIN ₹${c.minSpend}`,
          code: c.code,
          gradient: gradients[i % gradients.length],
        }));

        setCoupons(formatted);
      } catch (err) {
        console.error("Coupon fetch error:", err);
      }
    };

    fetchCoupons();
  }, []);

  /* ================= INFINITE LOOP LOGIC (UNCHANGED) ================= */
  const extendedCoupons =
    coupons.length > 0
      ? [coupons[coupons.length - 1], ...coupons, coupons[0]]
      : [];

  useEffect(() => {
    if (!coupons.length) return;

    const interval = setInterval(() => {
      setCurrent(prev => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [coupons]);

  useEffect(() => {
    if (!extendedCoupons.length) return;
    if (current === extendedCoupons.length - 1) {
      setTimeout(() => {
        setTransition(false);
        setCurrent(1);
      }, 700);
    }

    if (current === 0) {
      setTimeout(() => {
        setTransition(false);
        setCurrent(extendedCoupons.length - 2);
      }, 700);
    }

    setTimeout(() => setTransition(true), 800);
  }, [current, extendedCoupons.length]);

  if (!coupons.length) return null;

  return (
    <div className="w-full py-16 flex flex-col items-center relative bg-white overflow-hidden">

      <div className="w-full max-w-[1500px] h-[260px] sm:h-[280px] md:h-[300px] overflow-visible relative px-4 sm:px-8">


        <div
          className="flex"
          style={{
            transform: `translateX(-${current * 100}%)`,
            transition: transition ? "transform 0.7s ease-in-out" : "none",
          }}
        >
          {extendedCoupons.map((coupon, index) => (
            <div
              key={index}
              className="min-w-full flex justify-center items-center px-4 sm:px-10"
            >
              <div
                className={`relative w-full h-[230px] sm:h-[250px] md:h-[260px] rounded-[40px]

                bg-gradient-to-r ${coupon.gradient}
                border border-black/5
                transition-all duration-500 hover:scale-[1.02]
                shadow-[0_40px_80px_rgba(0,0,0,0.42)]
                hover:shadow-[0_60px_120px_rgba(0,0,0,0.18)]`}
              >
                {/* Soft Shine */}
                <div className="absolute inset-0 overflow-hidden rounded-[40px]">
                  <div className="absolute -left-1/2 top-0 w-1/2 h-full 
                    bg-gradient-to-r from-transparent via-white/60 to-transparent 
                    skew-x-[-25deg] animate-shine opacity-60" />
                </div>

                <div className="relative z-10 h-full flex flex-col justify-center items-center text-black px-6 text-center">

                  {/* TITLE */}

                  <h2 className="cinzel text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.15em] font-light">
                    {coupon.title}
                  </h2>


                  {/* Responsive Subtitle */}
                  <h3 className="permanent-marker-regular text-sm sm:text-base md:text-lg tracking-[0.25em] mt-2 text-black/70">
                    {coupon.subtitle}
                  </h3>


                  {/* CODE */}
                  <div className="mt-5 px-6 sm:px-10 py-2 sm:py-3 rounded-full 
                    bg-white shadow-lg
                    border border-black/10
                    hover:bg-black hover:text-white
                    transition-all duration-300 
                    text-xs sm:text-sm md:text-base tracking-widest">
                    CODE: {coupon.code}
                  </div>

                  {/* HIGHLIGHT */}
                  <div className="mt-4 text-xs sm:text-sm md:text-base tracking-[0.2em] text-black/70">
                    {coupon.highlight}
                  </div>


                  {/* Code */}
                  {coupon.code && (
                    <div
                      className="mt-5 px-6 sm:px-10 py-2 sm:py-3 rounded-full 
                  bg-white shadow-lg
                  border border-black/10
                  hover:bg-black hover:text-white
                  transition-all duration-300 
                  text-xs sm:text-sm md:text-base tracking-widest"
                    >
                      CODE: {coupon.code}
                    </div>
                  )}

                  {/* Highlight */}
                  <div className="mt-4 text-xs sm:text-sm md:text-base tracking-[0.2em] text-black/70">
                    {coupon.highlight}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`

          @keyframes shine {
            0% { left: -60%; }
            100% { left: 120%; }
          }
          .animate-shine {
            animation: shine 4s linear infinite;
          }
        `}

      </style>
    </div>
  );
};

export default Coupons;
