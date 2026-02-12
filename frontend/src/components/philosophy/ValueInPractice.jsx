import { motion } from "framer-motion";
import { Sparkles, Heart, Ruler } from "lucide-react";

export default function ValueInPractice() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-120px" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="
        w-full bg-white
        py-20 sm:py-24 lg:py-28
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
        {/* LEFT */}
        <div>
          <p
            className="
              text-[10px] sm:text-xs
              tracking-[0.35em]
              text-gray-400
              mb-4 sm:mb-6
            "
          >
            VALUES IN PRACTICE
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
            Design is a system of decisions.
          </h2>

          <p
            className="
              text-sm sm:text-base
              text-gray-600
              max-w-xl
              leading-relaxed
            "
          >
            Every line, seam, and proportion is intentional.
          </p>
        </div>

        {/* RIGHT  */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="
            rounded-2xl sm:rounded-3xl
            border border-gray-200
            p-6 sm:p-8 lg:p-10
            bg-white
            shadow-[0_20px_60px_-20px_rgba(0,0,0,0.12)]
          "
        >
          <p
            className="
              text-[10px] sm:text-xs
              tracking-[0.35em]
              text-gray-400
              mb-6 sm:mb-8
            "
          >
            DESIGN PRINCIPLES
          </p>

          <ul
            className="
              space-y-4 sm:space-y-5
              text-sm sm:text-[15px]
              text-gray-700
            "
          >
            <li className="flex gap-3 items-start">
              <Sparkles className="w-4 h-4 mt-[3px] text-gray-400" />
              <span>Reduce noise</span>
            </li>

            <li className="flex gap-3 items-start">
              <Heart className="w-4 h-4 mt-[3px] text-gray-400" />
              <span>Respect the wearer</span>
            </li>

            <li className="flex gap-3 items-start">
              <Ruler className="w-4 h-4 mt-[3px] text-gray-400" />
              <span>Refine endlessly</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.section>
  );
}