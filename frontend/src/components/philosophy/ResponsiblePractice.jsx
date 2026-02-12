import { motion } from "framer-motion";

export default function ResponsiblePractice() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-120px" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="
        w-full bg-white
        py-20 sm:py-24 lg:py-28
        border-b border-gray-200/60
      "
    >
      <div
        className="
          max-w-7xl mx-auto
          px-4 sm:px-6 lg:px-8
          grid grid-cols-1 lg:grid-cols-2
          gap-14 lg:gap-20
        "
      >
        {/*  LEFT   */}
        <div>
          <p
            className="
            text-[10px] sm:text-xs
            tracking-[0.35em]
            text-gray-400
            mb-4 sm:mb-6
          "
          >
            RESPONSIBLE PRACTICES
          </p>

          <h2
            className="
            text-2xl sm:text-3xl lg:text-[38px]
            leading-tight
            font-medium
            text-[#111]
            mb-5 sm:mb-6
          "
          >
            Care for the process, not just the product.
          </h2>

          <p
            className="
            text-sm sm:text-base
            text-gray-600
            max-w-xl
            leading-relaxed
          "
          >
            Responsibility begins long before a garment is finished.
          </p>
        </div>

        {/*  RIGHT   */}
        <div
          className="
            grid grid-cols-1 sm:grid-cols-2
            gap-5 sm:gap-6
          "
        >
          {[
            "Measured production",
            "Material accountability",
            "Reduced waste",
            "Human-centered craft",
          ].map((item) => (
            <motion.div
              key={item}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="
                rounded-2xl sm:rounded-3xl
                border border-gray-200
                p-5 sm:p-7
                bg-white
                shadow-[0_16px_50px_-20px_rgba(0,0,0,0.12)]
                hover:border-gray-300
              "
            >
              <p
                className="
                text-sm sm:text-[15px]
                text-gray-700
              "
              >
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}