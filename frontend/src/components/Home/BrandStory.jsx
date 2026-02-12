import React from "react";
import { useNavigate } from "react-router-dom";
import philosophyImg from "../../assets/BrandStory/BrandStory.webp";

const PhilosophySection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-15 px-6 lg:px-15">
      <div className="flex justify-center mb-4">
        <p className="tracking-[0.4em] text-2xl permanent-marker-regular text-gray-600 uppercase mb-6 border-b-2 border-gray-600">
          Our Philosophy
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* LEFT IMAGE CARD */}
        <div className="relative group w-full ">
          <div
            className="w-full rounded-[36px] overflow-hidden 
                       border border-gray-100
                       shadow-[0_30px_60px_rgba(0,0,0,0.55)]
                       transition-all duration-700 ease-out
                       group-hover:-translate-y-4
                       group-hover:shadow-[0_50px_100px_rgba(0,0,0,0.75)]"
          >
            <img
              src={philosophyImg}
              alt="Craftsmanship"
              className="w-full aspect-[4/5] max-h-[450px]
                         object-cover transition-transform duration-700
                         group-hover:scale-105"
            />
          </div>

          {/* Floating Badge */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8">
            <div
              className="relative bg-white/70 backdrop-blur-xl
                         px-5 py-2 sm:px-7 sm:py-3 lg:px-10 lg:py-4
                         rounded-full border border-white/40
                         shadow-[0_12px_30px_rgba(0,0,0,0.12)]
                         tracking-[0.3em] text-[11px] font-semibold
                         pointer-events-none"
            >
              <span className="relative z-10 whitespace-nowrap">
                HANDCRAFTED IN INDIA
              </span>

              {/* Shine overlay */}
              <div
                className="absolute inset-0 rounded-full 
                           bg-gradient-to-r from-white/30 via-transparent to-white/30
                           opacity-0 group-hover:opacity-100 transition-opacity duration-700
                           pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="text-left">
          <h2 className="cinzel text-3xl sm:text-5xl lg:text-6xl leading-[1.1] text-gray-900 mb-8">
            Crafted in India,
            <br />
            <span className="italic">Worn Globally</span>
          </h2>

          <div className="w-50 h-[3px] bg-gray-300 mb-10" />

          <p className="cormorant-garamond text-lg text-gray-700 leading-relaxed mb-4 max-w-xl">
            Experience the timeless artistry of Indian craftsmanship,
            refined for a global audience.
          </p>

          <p className="cormorant-garamond text-lg text-gray-700 leading-relaxed mb-12 max-w-xl">
            We design minimalist, enduring silhouettes that embody
            quiet luxury — timeless fashion that stands the test of time.
          </p>

          {/* BUTTON */}
          <div className="flex flex-wrap gap-6 pointer-events-auto">
            <button
              onClick={() => navigate("/philosophy")}
              className="group relative inline-flex items-center gap-3
                         bg-black text-white
                         px-10 py-4 rounded-full
                         text-xs tracking-[0.3em] uppercase
                         shadow-[0_15px_35px_rgba(0,0,0,0.55)]
                         transition-all duration-500
                         hover:-translate-y-2
                         hover:shadow-[0_25px_60px_rgba(0,0,0,0.75)]
                         active:translate-y-0
                         pointer-events-auto"
            >
              <span>Discover Process</span>
              <span className="transition-all duration-500 group-hover:translate-x-2">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
