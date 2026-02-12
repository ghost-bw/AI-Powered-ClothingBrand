import { motion } from "framer-motion";
import BrandStory from "../../assets/philosophy/BrandStory.webp";

export default function BrandVision() {
  return (
    <section className="relative bg-[#FCFCFB] overflow-hidden">
      {/* subtle divider */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] border-b border-gray-300/60" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-120px" }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-20 sm:py-24 lg:py-32"
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* LEFT — IMAGE WITH OVERLAY CONTENT */}
          <div
            className="
              relative rounded-[24px] sm:rounded-[28px] lg:rounded-[32px]
              overflow-hidden
              min-h-[420px] sm:min-h-[480px] lg:min-h-[520px]
              flex items-end
            "
            style={{
              backgroundImage: `url(${BrandStory})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />

            {/* content */}
            <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-xl">
              <p className="text-[10px] sm:text-[11px] tracking-[0.4em] text-white/70 mb-6 sm:mb-8">
                BRAND VISION
              </p>

              <h2
                className="
                text-[26px] sm:text-[32px] md:text-[36px] lg:text-[40px]
                leading-[1.2]
                font-medium
                text-white
                mb-6 sm:mb-8
              "
              >
                A wardrobe system that respects time, touch, and everyday
                rhythm.
              </h2>

              <p
                className="
                text-white/80
                text-[14px] sm:text-[15px]
                leading-[1.9]
                max-w-lg
              "
              >
                We believe great clothing is quiet in the best way — never loud,
                always present. The pieces we make live between seasons and
                adapt naturally to the people who wear them.
              </p>
            </div>
          </div>

          {/* RIGHT — CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
            {[
              {
                title: "Clarity of Purpose",
                text: "Every piece has a reason to exist.",
                symbol: "01",
              },
              {
                title: "Integrity of Craft",
                text: "Honest materials and trusted construction.",
                symbol: "02",
              },
              {
                title: "Quiet Confidence",
                text: "Design that lets the wearer lead.",
                symbol: "03",
              },
              {
                title: "Thoughtful Longevity",
                text: "Durability as a form of respect.",
                symbol: "04",
              },
            ].map((card) => (
              <motion.div
                key={card.title}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="
                  rounded-[24px] sm:rounded-[28px]
                  bg-white
                  border border-gray-200/70
                  p-8 sm:p-10
                  shadow-[0_18px_45px_rgba(0,0,0,0.08)]
                  hover:shadow-[0_28px_65px_rgba(0,0,0,0.12)]
                  transition-all
                "
              >
                <div className="text-[10px] tracking-[0.35em] text-gray-400 mb-6">
                  {card.symbol}
                </div>

                <h4 className="text-[17px] font-medium mb-4 text-[#111]">
                  {card.title}
                </h4>

                <p className="text-[14px] leading-[1.8] text-gray-600">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}