import React from "react";
import philosophyImg from "../../assets/BrandStory/BrandStory.webp";

const BrandStory = () => {
  return (
    <section className=" py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Image */}
        <div className="w-full md:w-[90%] lg:w-[85%]">
            <img
            src={philosophyImg}
            alt="Our Philosophy"
            className="w-full max-h-[420px] object-cover rounded-2xl shadow-lg"
            />
        </div>


        {/* Content */}
        <div>
          <span className="text-xs tracking-widest font-semibold text-indigo-600 uppercase">
            Our Philosophy
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight">
            Crafted in India, <br /> Worn Globally
          </h2>

          <p className="mt-6 text-gray-600 leading-relaxed">
            Graphura is a tribute to the timeless artistry of Indian weavers,
            reimagined for the global stage. We blend heritage techniques—from
            the looms of Maheshwar to the dye vats of Bagru—with modern,
            minimalist silhouettes.
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Every piece tells a story of tradition, sustainability, and
            uncompromising quality. This isn’t just fashion; it’s a legacy you
            can wear.
          </p>

          <button className="my-14 border-b-2 border-indigo-600 text-indigo-600 text-sm font-semibold tracking-wide hover:opacity-70 transition">
            DISCOVER OUR PROCESS
          </button>
        </div>

      </div>
    </section>
  );
};

export default BrandStory;
