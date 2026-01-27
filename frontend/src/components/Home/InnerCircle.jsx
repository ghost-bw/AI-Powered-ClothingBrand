import React from "react";

const InnerCircle = () => {
  return (
    <section className="px-4 py-14">
      <div className="max-w-[90rem] mx-auto bg-[#f3e4cf] rounded-2xl px-6 sm:px-12 py-12 text-center">


        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-[34px] font-serif font-semibold text-[#1f2937]">
          Join the Inner Circle
        </h2>

        {/* Subtext */}
        <p className="mt-3 text-sm text-gray-600 max-w-lg mx-auto leading-relaxed">
          Receive early access to limited edition drops, artisanal stories,
          and exclusive invitations.
        </p>

        {/* Input + Button */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">

          <input
            type="email"
            placeholder="Your email address"
            className="w-full sm:w-[380px] px-6 py-3 rounded-full text-sm bg-white border border-indigo-500 outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button className="px-8 py-3 rounded-full bg-indigo-600 text-white text-sm font-semibold tracking-wide hover:bg-indigo-700 transition">
            SUBSCRIBE
          </button>

        </div>

      </div>
    </section>
  );
};

export default InnerCircle;
