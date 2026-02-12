import { motion } from "framer-motion";

export default function FitSilhouette() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-120px" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="
        max-w-7xl mx-auto
        px-4 sm:px-6 lg:px-8
        py-20 sm:py-24 lg:py-28
        grid grid-cols-1 md:grid-cols-2
        gap-16 lg:gap-24
        border-b border-gray-200/60
      "
    >
      {/*  LEFT */}
      <div className="max-w-xl">
        <p className="text-[10px] sm:text-[11px] tracking-[0.45em] text-gray-400 mb-6 sm:mb-8">
          FIT & SILHOUETTE
        </p>

        <h2
          className="
          text-3xl sm:text-4xl lg:text-[42px]
          leading-tight
          font-medium
          mb-6 sm:mb-8
          text-[#111]
        "
        >
          Tailored to move naturally with the body.
        </h2>

        <p className="text-sm sm:text-base text-gray-600 mb-8 sm:mb-10 leading-relaxed">
          Fit is about proportion, movement, and ease — never restriction.
        </p>

        <ul className="space-y-4 text-sm sm:text-[15px] text-gray-600">
          {[
            "Relaxed tailoring with structure.",
            "Consistent grading across sizes.",
            "Ease built into key movement areas.",
          ].map((item) => (
            <li key={item} className="flex gap-3 items-start">
              <span className="text-gray-400 mt-[2px]">✳</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/*  RIGHT  */}
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="
          rounded-[24px] sm:rounded-[28px]
          border border-gray-200
          p-6 sm:p-8 lg:p-10
          bg-white
          shadow-[0_20px_60px_-20px_rgba(0,0,0,0.12)]
        "
      >
        <h3
          className="
          text-base sm:text-lg
          font-medium
          mb-6 sm:mb-8
          text-[#111]
        "
        >
          Our Fit Process
        </h3>

        {[
          "Multiple fit rounds",
          "Real body testing",
          "Seasonless proportion",
        ].map((step) => (
          <div
            key={step}
            className="
              border border-gray-200
              rounded-xl sm:rounded-2xl
              p-4 sm:p-6
              mb-4 sm:mb-5
              bg-gray-50/40
              hover:bg-white
              transition
            "
          >
            <p className="text-sm sm:text-[15px] text-gray-600">{step}</p>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}