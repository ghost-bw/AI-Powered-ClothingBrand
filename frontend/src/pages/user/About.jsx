import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import Navbar from "../../components/Home/Navbar";
import {
  Scissors,
  Heart,
  Users,
  Leaf,
  Sparkles,
  Star,
  Target,
  Globe,
  Award,
  Zap,
  Palette,
  Gem,
  Clock,
  Shield,
  CheckCircle,
  Ribbon,
  Factory,
  MapPin,
  TrendingUp,
  Globe as GlobeIcon,
  Package,
  ShoppingBag,
  Check,
  Crown,
  Recycle,
} from "lucide-react";

const About = () => {
  const refs = useRef([]);
  const isInView = useInView(refs.current, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const fadeInUp = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <main className="bg-white overflow-hidden">
      {/* HERO SECTION */}
      <Navbar/>
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#eae0d1]">
        {/* Accent Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#eae0d1]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#eae0d1]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-6"
          >
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-[#dec195] rounded-2xl flex items-center justify-center shadow-lg border-2 border-[#D4B483]">
                <Gem className="w-12 h-12 text-gray-900" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 tracking-tight">
              Crafting <span className="text-[#B89A67]">Timeless</span> Elegance
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            Where traditional craftsmanship meets contemporary luxury. Each
            thread tells a story of heritage, sustainability, and unparalleled
            quality.
          </motion.p>
        </div>
      </section>

      {/* OUR STORY */}
      <motion.section
        className="py-20 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <div className="relative">
                <div className="absolute -inset-4 bg-[#eae0d1]/20 rounded-3xl blur-xl opacity-50"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#eae0d1] rounded-xl flex items-center justify-center">
                      <Palette className="w-6 h-6 text-gray-900" />
                    </div>
                    <motion.h2
                      className="text-3xl font-bold text-gray-900 mb-0"
                      variants={fadeInUp}
                    >
                      Our <span className="text-[#B89A67]">Heritage</span>
                    </motion.h2>
                  </div>
                  <motion.p
                    className="text-gray-700 mb-6 leading-relaxed"
                    variants={fadeInUp}
                  >
                    <Factory className="inline w-5 h-5 mr-2 text-[#B89A67]" />
                    Born from a passion for preserving India's rich textile
                    heritage,
                    <span className="font-semibold text-gray-900">
                      {" "}
                      Graphura
                    </span>{" "}
                    was founded in 2018 as a bridge between centuries-old
                    craftsmanship and modern luxury fashion.
                  </motion.p>
                  <motion.p
                    className="text-gray-700 leading-relaxed"
                    variants={fadeInUp}
                  >
                    <MapPin className="inline w-5 h-5 mr-2 text-[#B89A67]" />
                    We partner with master artisans from Varanasi, Maheshwar,
                    and Bhuj, empowering them with fair wages while bringing
                    their exquisite work to global audiences.
                  </motion.p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={scaleIn} className="space-y-6">
              <motion.div
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-[#eae0d1] rounded-xl flex items-center justify-center shadow-sm">
                    <Heart className="text-gray-900 w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Artisan First Philosophy
                    </h3>
                    <p className="text-sm text-gray-600 font-medium flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-[#B89A67]" /> 40%
                      above industry standards
                    </p>
                  </div>
                </div>
                <p className="text-gray-600">
                  Every piece is handcrafted by skilled artisans who receive
                  premium wages, health benefits, and continuous skill
                  development opportunities.
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200"
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center shadow-sm">
                    <Leaf className="text-emerald-700 w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Sustainable Practices
                    </h3>
                    <p className="text-sm text-gray-600 font-medium flex items-center gap-1">
                      <GlobeIcon className="w-4 h-4 text-emerald-600" />{" "}
                      Eco-conscious production
                    </p>
                  </div>
                </div>
                <p className="text-gray-600">
                  From organic cotton and natural dyes to zero-waste production,
                  sustainability is woven into every thread of our existence.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* VALUES CARDS - IN #ECD1A8 */}
      <section className="py-20 bg-[#eae0d1]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-semibold mb-4 shadow-lg">
              <Ribbon className="w-4 h-4" />
              Our Core Values
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Makes Us <span className="text-[#8B5E3C]">Different</span>
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              We combine traditional craftsmanship with modern ethics to create
              exceptional fashion
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Scissors className="w-10 h-10" />,
                title: "Master Craftsmanship",
                desc: "Each piece undergoes 200+ quality checks by master craftsmen",
                bg: "bg-white",
                border: "border-[#D4B483]",
                accent: "from-[#B89A67] to-[#8B5E3C]",
                checkIcon: <CheckCircle className="w-6 h-6 text-[#8B5E3C]" />,
                stat: "200+",
              },
              {
                icon: <Leaf className="w-10 h-10" />,
                title: "Eco-Friendly Materials",
                desc: "100% organic fabrics, natural dyes, biodegradable packaging",
                bg: "bg-white",
                border: "border-emerald-300",
                accent: "from-emerald-600 to-emerald-700",
                checkIcon: <Recycle className="w-6 h-6 text-emerald-700" />,
                stat: "100%",
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: "Fair Trade Certified",
                desc: "Ethical partnerships with 200+ artisan families across India",
                bg: "bg-white",
                border: "border-amber-300",
                accent: "from-amber-600 to-amber-700",
                checkIcon: <Shield className="w-6 h-6 text-amber-700" />,
                stat: "200+",
              },
              {
                icon: <Clock className="w-10 h-10" />,
                title: "Timeless Design",
                desc: "Collections designed to transcend seasons and trends",
                bg: "bg-white",
                border: "border-gray-300",
                accent: "from-gray-600 to-gray-700",
                checkIcon: <Sparkles className="w-6 h-6 text-gray-700" />,
                stat: "∞",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative group"
              >
                {/* Background Glow */}
                <div className="absolute -inset-2 bg-white/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Main Card */}
                <div
                  className={`relative ${value.bg} p-6 rounded-xl shadow-lg border ${value.border} h-full group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1`}
                >
                  {/* Icon Container */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-br ${value.accent} shadow-md transform group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div className="text-white">{value.icon}</div>
                    </div>

                    {/* Stat Badge */}
                    <div className="flex flex-col items-end">
                      <div className="text-2xl font-bold text-gray-900">
                        {value.stat}
                      </div>
                      <div className="text-xs text-gray-600 uppercase tracking-wider">
                        Quality
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                    {value.desc}
                  </p>

                  {/* Bottom Section */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      {value.checkIcon}
                      <span className="text-sm font-medium text-gray-800">
                        Verified
                      </span>
                    </div>

                    {/* Accent Line */}
                    <div
                      className={`h-1 w-8 rounded-full bg-gradient-to-r ${value.accent} transition-all duration-300 group-hover:w-16`}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT STATISTICS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <TrendingUp className="w-8 h-8 text-[#B89A67]" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Our <span className="text-[#B89A67]">Impact</span> in Numbers
              </h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Creating sustainable fashion while empowering communities and
              preserving heritage
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "200+",
                label: "Artisan Families Empowered",
                icon: <Users className="w-8 h-8" />,
                color: "text-[#B89A67]",
              },
              {
                number: "15M+",
                label: "Liters of Water Saved",
                icon: <Leaf className="w-8 h-8" />,
                color: "text-emerald-600",
              },
              {
                number: "50K+",
                label: "Sustainable Garments Crafted",
                icon: <Award className="w-8 h-8" />,
                color: "text-amber-600",
              },
              {
                number: "95%",
                label: "Waste Diverted",
                icon: <Globe className="w-8 h-8" />,
                color: "text-gray-700",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-md border border-gray-200 mb-6 group-hover:shadow-lg transition-all duration-300">
                  <div className={stat.color}>{stat.icon}</div>
                </div>
                <motion.div
                  className="text-4xl font-bold text-gray-900 mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {stat.number}
                </motion.div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-[#eae0d1]/10 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#eae0d1] rounded-xl flex items-center justify-center">
                    <Target className="text-gray-900 w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Our Vision
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <Globe className="inline w-5 h-5 mr-2 text-[#B89A67]" />
                  To redefine luxury fashion by creating a world where
                  sustainability and elegance coexist, where every garment tells
                  a story of heritage, craftsmanship, and conscious living.
                </p>
                <div className="flex items-center gap-4 text-[#B89A67] font-semibold">
                  <Zap className="w-5 h-5" />
                  <span>Leading the sustainable fashion revolution</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gray-100 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <div className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                    <Crown className="text-white w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Our Mission
                  </h3>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  <Ribbon className="inline w-5 h-5 mr-2 text-gray-700" />
                  To craft timeless apparel that celebrates Indian craftsmanship
                  while setting global standards for ethical production,
                  environmental responsibility, and inclusive growth.
                </p>
                <div className="flex items-center gap-4 text-gray-700 font-semibold">
                  <Sparkles className="w-5 h-5" />
                  <span>Every stitch, a step toward excellence</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-[#eae0d1]/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
              <div className="flex justify-center mb-6">
                <Gem className="w-12 h-12 text-[#B89A67]" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Join Our Journey of{" "}
                <span className="text-[#B89A67]">Conscious Fashion</span>
              </h2>
              <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                Experience clothing that feels good, looks beautiful, and does
                good for the planet and its people.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a href="/collections">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-black transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Shop Our Collections
                  </motion.button>
                </a>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-8 text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm">100% Sustainable Materials</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[#B89A67]" />
                  <span className="text-sm">Fair Trade Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-gray-600" />
                  <span className="text-sm">Carbon Neutral Shipping</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;
