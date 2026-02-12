import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  FileText,
  Scale,
  Gavel,
  AlertCircle,
  ChevronRight,
  Search,
  Download,
  User,
  Lock,
  Globe,
  CreditCard,
  Shield,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Check,
  X,
  AlertTriangle,
  Users,
  Building,
  GraduationCap,
  Award,
  Heart,
  TrendingUp,
  Database,
  Server,
  Key,
  Bell,
  Trash2,
  Eye,
  ClipboardCheck,
  Share2,
  Cpu,
} from "lucide-react";

const TermsOfService = () => {
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
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className="bg-white overflow-hidden">
      {/* HERO BANNER - FULL WIDTH */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-white">
        {/* Full width background pattern */}
        <div className="absolute inset-0 w-full">
          <div className="absolute top-1/4 left-10 w-[40%] h-96 bg-[#ECD1A8]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-10 w-[40%] h-96 bg-[#ECD1A8]/5 rounded-full blur-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#ECD1A8] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#ECD1A8] to-transparent"></div>
        </div>

        <div className="relative z-10 w-full px-4 md:px-8 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8 w-full"
          >
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-2xl border-4 border-[#D4B483]">
                <Scale className="w-16 h-16 text-gray-900" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900 tracking-tight px-4">
              Terms of <span className="text-[#B89A67]">Service</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="w-full"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-gray-900 text-white rounded-full text-lg font-semibold shadow-2xl">
              <Gavel className="w-6 h-6" />
              Effective Date: January 25, 2026
            </div>
          </motion.div>
        </div>
      </section>

      {/* INTRODUCTION - FULL WIDTH */}
      <section className="py-16 w-full px-4 md:px-8 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="w-full"
        >
          <motion.div
            variants={itemVariants}
            className="w-full bg-linear-to-br from-white to-gray-50 p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200 mb-8"
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Welcome to Graphura
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                These Terms of Service ("Terms") govern your use of Graphura
                India Private Limited's website, services, and internship
                programs. By accessing or using our services, you agree to be
                bound by these Terms. If you disagree with any part of the
                terms, you may not access our services.
              </p>
              <div className="p-6 bg-[#ECD1A8]/10 rounded-xl border border-[#D4B483]/30">
                <p className="text-gray-900 font-semibold text-lg">
                  <AlertCircle className="inline w-6 h-6 mr-2 text-[#B89A67]" />
                  Important: These Terms constitute a legally binding agreement
                  between you and Graphura India Private Limited. Please read
                  them carefully.
                </p>
              </div>
            </div>
          </motion.div>

          {/* QUICK NAVIGATION - FULL WIDTH */}
          <motion.div
            variants={itemVariants}
            className="w-full bg-[#ECD1A8] p-8 md:p-12 rounded-2xl shadow-xl border border-[#D4B483]"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <FileText className="w-6 h-6" />
                  Quick Navigation
                </h3>
                <p className="text-gray-700">
                  Jump directly to any section of our Terms of Service
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search in terms..."
                    className="pl-12 pr-4 py-3 bg-white rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B89A67] w-64"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                {/* <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-black transition-colors">
                  <Download className="w-5 h-5" />
                  Download PDF
                </button> */}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  num: "1",
                  title: "Acceptance of Terms",
                  icon: <Check className="w-5 h-5" />,
                  color: "bg-blue-100 text-blue-800",
                },
                {
                  num: "2",
                  title: "Eligibility",
                  icon: <User className="w-5 h-5" />,
                  color: "bg-emerald-100 text-emerald-800",
                },
                {
                  num: "3",
                  title: "Program Registration",
                  icon: <ClipboardCheck className="w-5 h-5" />,
                  color: "bg-amber-100 text-amber-800",
                },
                {
                  num: "4",
                  title: "Payments & Fees",
                  icon: <CreditCard className="w-5 h-5" />,
                  color: "bg-purple-100 text-purple-800",
                },
                {
                  num: "5",
                  title: "Intellectual Property",
                  icon: <BookOpen className="w-5 h-5" />,
                  color: "bg-red-100 text-red-800",
                },
                {
                  num: "6",
                  title: "User Conduct",
                  icon: <Users className="w-5 h-5" />,
                  color: "bg-cyan-100 text-cyan-800",
                },
                {
                  num: "7",
                  title: "Termination",
                  icon: <X className="w-5 h-5" />,
                  color: "bg-indigo-100 text-indigo-800",
                },
                {
                  num: "8",
                  title: "Limitation of Liability",
                  icon: <Shield className="w-5 h-5" />,
                  color: "bg-gray-100 text-gray-800",
                },
                {
                  num: "9",
                  title: "Governing Law",
                  icon: <Scale className="w-5 h-5" />,
                  color: "bg-pink-100 text-pink-800",
                },
                {
                  num: "10",
                  title: "Changes to Terms",
                  icon: <AlertTriangle className="w-5 h-5" />,
                  color: "bg-orange-100 text-orange-800",
                },
                {
                  num: "11",
                  title: "Contact Information",
                  icon: <Mail className="w-5 h-5" />,
                  color: "bg-teal-100 text-teal-800",
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={`#section-${item.num}`}
                  className="flex items-center gap-4 p-6 bg-white rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <span
                    className={`flex items-center justify-center w-12 h-12 ${item.color} rounded-xl text-lg font-bold group-hover:scale-110 transition-transform`}
                  >
                    {item.num}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {item.icon}
                      <span className="font-bold text-gray-900 group-hover:text-[#B89A67] transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">Click to jump</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 ml-auto group-hover:translate-x-2 transition-transform" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* TERMS SECTIONS - FULL WIDTH */}
      <section className="py-16 w-full px-4 md:px-8 lg:px-16 space-y-12">
        {/* Section 1 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          id="section-1"
          className="scroll-mt-24 w-full"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-gray-900">1</span>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Acceptance of Terms
                </h2>
                <p className="text-gray-600 mt-2">
                  Understanding your agreement with our terms
                </p>
              </div>
            </div>

            <div className="w-full bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Check className="w-6 h-6 text-blue-600" />
                    1.1 Agreement
                  </h3>
                  <p className="text-gray-700">
                    By accessing and using Graphura's website, services, or
                    internship programs, you acknowledge that you have read,
                    understood, and agree to be bound by these Terms of Service.
                  </p>
                </div>

                <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-emerald-600" />
                    1.2 Modifications
                  </h3>
                  <p className="text-gray-700">
                    We reserve the right to modify these Terms at any time.
                    Continued use of our services after changes constitutes
                    acceptance of the new Terms.
                  </p>
                </div>
              </div>

              <div className="p-8 bg-linear-to-r from-[#ECD1A8]/20 to-[#D4B483]/20 rounded-2xl border-2 border-[#D4B483]/30">
                <div className="flex items-start gap-4">
                  <Scale className="w-8 h-8 text-[#B89A67] shrink-0-flex" />
                  <div>
                    <h4 className="font-bold text-gray-900 text-xl mb-2">
                      Legal Binding
                    </h4>
                    <p className="text-gray-700">
                      These Terms constitute a legally binding agreement between
                      you (the "User") and Graphura India Private Limited
                      ("Company," "we," "us," or "our"). If you are entering
                      into this agreement on behalf of a company or other legal
                      entity, you represent that you have the authority to bind
                      such entity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          id="section-2"
          className="scroll-mt-24 w-full"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-gray-900">2</span>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Eligibility Requirements
                </h2>
                <p className="text-gray-600 mt-2">
                  Who can use our services and programs
                </p>
              </div>
            </div>

            <div className="w-full space-y-8">
              {[
                {
                  number: "2.1",
                  icon: <User className="w-10 h-10" />,
                  title: "Age Requirement",
                  content:
                    "You must be at least 18 years of age to use our services. By using our services, you represent and warrant that you are at least 18 years old.",
                  color: "bg-blue-50",
                },
                {
                  number: "2.2",
                  icon: <GraduationCap className="w-10 h-10" />,
                  title: "Educational Status",
                  content:
                    "Our internship programs require participants to be currently enrolled in or recently graduated from an accredited university or college program.",
                  color: "bg-emerald-50",
                },
                {
                  number: "2.3",
                  icon: <Globe className="w-10 h-10" />,
                  title: "Geographic Eligibility",
                  content:
                    "Some programs may have geographic restrictions based on visa requirements and local regulations. Check specific program details for eligibility.",
                  color: "bg-amber-50",
                },
                {
                  number: "2.4",
                  icon: <Shield className="w-10 h-10" />,
                  title: "Background Checks",
                  content:
                    "We reserve the right to conduct background checks for certain programs. Acceptance may be contingent upon satisfactory results.",
                  color: "bg-purple-50",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`w-full ${item.color} p-8 rounded-2xl shadow-lg border border-gray-200`}
                >
                  <div className="flex items-start gap-6">
                    <div className="shrink-0-flex">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md">
                          <span className="text-xl font-bold text-gray-900">
                            {item.number}
                          </span>
                        </div>
                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md">
                          {item.icon}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 text-lg">{item.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          id="section-3"
          className="scroll-mt-24 w-full"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-gray-900">3</span>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Program Registration & Application
                </h2>
                <p className="text-gray-600 mt-2">
                  How to apply for our internship programs
                </p>
              </div>
            </div>

            <div className="w-full bg-linear-to-br from-white to-gray-50 p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200">
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
                  <div className="w-12 h-12 bg-[#ECD1A8] rounded-lg flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-gray-900" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    3.1 Application Process
                  </h3>
                  <p className="text-gray-700">
                    Complete our online application form with accurate and
                    truthful information. Incomplete or inaccurate applications
                    may be rejected.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
                  <div className="w-12 h-12 bg-[#ECD1A8] rounded-lg flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-gray-900" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    3.2 Application Deadlines
                  </h3>
                  <p className="text-gray-700">
                    Applications must be submitted by published deadlines. Late
                    applications may be considered at our discretion.
                  </p>
                </div>

                <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200">
                  <div className="w-12 h-12 bg-[#ECD1A8] rounded-lg flex items-center justify-center mb-4">
                    <CreditCard className="w-6 h-6 text-gray-900" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    3.3 Application Fees
                  </h3>
                  <p className="text-gray-700">
                    Some programs may require an application fee. This fee is
                    non-refundable unless otherwise stated.
                  </p>
                </div>
              </div>

              <div className="p-8 bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Selection Process
                </h3>
                <p className="text-gray-700 mb-6">
                  Selection for our internship programs is competitive and based
                  on multiple factors including academic performance, relevant
                  experience, interview performance, and alignment with host
                  company requirements.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-xl font-bold text-[#B89A67] mb-1">
                      1-2 Weeks
                    </div>
                    <div className="text-sm text-gray-600">Initial Review</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-xl font-bold text-[#B89A67] mb-1">
                      Interview
                    </div>
                    <div className="text-sm text-gray-600">Required Step</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-xl font-bold text-[#B89A67] mb-1">
                      3-4 Weeks
                    </div>
                    <div className="text-sm text-gray-600">Final Decision</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-xl font-bold text-[#B89A67] mb-1">
                      Limited
                    </div>
                    <div className="text-sm text-gray-600">Spots Available</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Section 4 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          id="section-4"
          className="scroll-mt-24 w-full"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-gray-900">4</span>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Payments, Fees & Refunds
                </h2>
                <p className="text-gray-600 mt-2">
                  Our financial policies and procedures
                </p>
              </div>
            </div>

            <div className="w-full space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  4.1 Program Fees
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                    <h4 className="font-bold text-gray-900 mb-3">
                      Included in Program Fee:
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0-flex" />
                        <span className="text-gray-700">
                          Internship placement services
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0-flex" />
                        <span className="text-gray-700">
                          Visa assistance and documentation
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0-flex" />
                        <span className="text-gray-700">
                          Pre-departure orientation
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0-flex" />
                        <span className="text-gray-700">
                          24/7 emergency support
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-amber-50 rounded-xl border border-amber-200">
                    <h4 className="font-bold text-gray-900 mb-3">
                      Not Included:
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <X className="w-5 h-5 text-red-600 mt-0.5 shrink-0-flex" />
                        <span className="text-gray-700">
                          Airfare and travel expenses
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <X className="w-5 h-5 text-red-600 mt-0.5 shrink-0-flex" />
                        <span className="text-gray-700">
                          Accommodation costs
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <X className="w-5 h-5 text-red-600 mt-0.5 shrink-0-flex" />
                        <span className="text-gray-700">
                          Personal living expenses
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <X className="w-5 h-5 text-red-600 mt-0.5 shrink-0-flex" />
                        <span className="text-gray-700">
                          Visa application fees
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-linear-to-br from-emerald-50 to-emerald-100 p-8 rounded-2xl shadow-lg border border-emerald-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    4.2 Payment Schedule
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                      <span className="font-medium text-gray-900">Deposit</span>
                      <span className="font-bold text-[#B89A67]">
                        Upon Acceptance
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                      <span className="font-medium text-gray-900">
                        Second Payment
                      </span>
                      <span className="font-bold text-[#B89A67]">
                        30 Days Before Start
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                      <span className="font-medium text-gray-900">
                        Final Payment
                      </span>
                      <span className="font-bold text-[#B89A67]">
                        Program Start Date
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-linear-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg border border-purple-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    4.3 Refund Policy
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">
                        Cancellation 60+ days before start
                      </span>
                      <span className="font-bold text-green-600">
                        80% Refund
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">
                        Cancellation 30-59 days before start
                      </span>
                      <span className="font-bold text-amber-600">
                        50% Refund
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">
                        Cancellation less than 30 days
                      </span>
                      <span className="font-bold text-red-600">No Refund</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Section 5 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          id="section-5"
          className="scroll-mt-24 w-full"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-gray-900">5</span>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Intellectual Property Rights
                </h2>
                <p className="text-gray-600 mt-2">
                  Ownership and usage of content and materials
                </p>
              </div>
            </div>

            <div className="w-full bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="p-6 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    5.1 Our Content
                  </h3>
                  <p className="text-gray-700">
                    All content on our website, including text, graphics, logos,
                    images, and software, is the property of Graphura India
                    Private Limited and protected by intellectual property laws.
                  </p>
                </div>

                <div className="p-6 bg-linear-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Eye className="w-6 h-6 text-emerald-600" />
                    5.2 License to Use
                  </h3>
                  <p className="text-gray-700">
                    We grant you a limited, non-exclusive, non-transferable
                    license to access and use our services for personal,
                    non-commercial purposes in accordance with these Terms.
                  </p>
                </div>
              </div>

              <div className="p-8 bg-linear-to-r from-[#ECD1A8]/20 to-[#D4B483]/20 rounded-2xl border-2 border-[#D4B483]/30">
                <h4 className="font-bold text-gray-900 text-xl mb-4">
                  Restrictions
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
                    <X className="w-5 h-5 text-red-600 mt-1 shrink-0-flex" />
                    <span className="text-gray-700">
                      Do not copy, modify, or distribute our content without
                      permission
                    </span>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
                    <X className="w-5 h-5 text-red-600 mt-1 shrink-0-flex" />
                    <span className="text-gray-700">
                      Do not use our trademarks without written consent
                    </span>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
                    <X className="w-5 h-5 text-red-600 mt-1 shrink-0-flex" />
                    <span className="text-gray-700">
                      Do not reverse engineer or decompile our software
                    </span>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-white rounded-lg">
                    <X className="w-5 h-5 text-red-600 mt-1 shrink-0-flex" />
                    <span className="text-gray-700">
                      Do not use our content for commercial purposes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Section 6-11 would continue similarly */}
        {/* Section 6 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          id="section-6"
          className="scroll-mt-24 w-full"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-gray-900">6</span>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  User Conduct & Responsibilities
                </h2>
                <p className="text-gray-600 mt-2">
                  Rules and guidelines for using our services
                </p>
              </div>
            </div>

            <div className="w-full bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="p-6 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Users className="w-6 h-6 text-blue-600" />
                    6.1 Acceptable Use
                  </h3>
                  <p className="text-gray-700 mb-4">
                    You agree to use our services only for lawful purposes and
                    in accordance with these Terms.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0-flex" />
                      <span className="text-gray-700">
                        Provide accurate and truthful information
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0-flex" />
                      <span className="text-gray-700">
                        Maintain the confidentiality of your account
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 shrink-0-flex" />
                      <span className="text-gray-700">
                        Comply with all applicable laws and regulations
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-linear-to-br from-red-50 to-red-100 rounded-xl border border-red-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    6.2 Prohibited Activities
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <X className="w-5 h-5 text-red-600 mt-0.5 shrink-0-flex" />
                      <span className="text-gray-700">
                        Impersonating others or providing false information
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <X className="w-5 h-5 text-red-600 mt-0.5 shrink-0-flex" />
                      <span className="text-gray-700">
                        Uploading viruses or malicious code
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <X className="w-5 h-5 text-red-600 mt-0.5 shrink-0-flex" />
                      <span className="text-gray-700">
                        Harassing or threatening other users
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <X className="w-5 h-5 text-red-600 mt-0.5 shrink-0-flex" />
                      <span className="text-gray-700">
                        Violating intellectual property rights
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-linear-to-r from-amber-50 to-amber-100 rounded-2xl border border-amber-200">
                <h4 className="font-bold text-gray-900 text-xl mb-4">
                  Intern Program Conduct
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">
                      During Internship:
                    </h5>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-1 shrink-0-flex" />
                        <span>Follow host company policies and procedures</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-1 shrink-0-flex" />
                        <span>Maintain professional conduct at all times</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-1 shrink-0-flex" />
                        <span>
                          Complete assigned tasks and responsibilities
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">
                      Code of Ethics:
                    </h5>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-1 shrink-0-flex" />
                        <span>
                          Maintain confidentiality of company information
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-1 shrink-0-flex" />
                        <span>Report any concerns to program coordinators</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-1 shrink-0-flex" />
                        <span>
                          Respect cultural differences in international
                          placements
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Section 7 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          id="section-7"
          className="scroll-mt-24 w-full"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-gray-900">7</span>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Termination & Suspension
                </h2>
                <p className="text-gray-600 mt-2">
                  Conditions for account termination and suspension
                </p>
              </div>
            </div>

            <div className="w-full grid md:grid-cols-2 gap-8">
              <div className="bg-linear-to-br from-red-50 to-red-100 p-8 rounded-2xl shadow-lg border border-red-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md">
                    <X className="w-8 h-8 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      7.1 Our Rights
                    </h3>
                    <div className="w-12 h-1 bg-red-600 rounded-full"></div>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  We reserve the right to terminate or suspend your account and
                  access to our services immediately, without prior notice or
                  liability, for any reason whatsoever, including without
                  limitation if you breach these Terms.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span className="text-gray-700 font-medium">
                      Violation of Terms of Service
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span className="text-gray-700 font-medium">
                      Fraudulent or illegal activities
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span className="text-gray-700 font-medium">
                      Non-payment of program fees
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-br from-amber-50 to-amber-100 p-8 rounded-2xl shadow-lg border border-amber-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md">
                    <User className="w-8 h-8 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      7.2 Your Rights
                    </h3>
                    <div className="w-12 h-1 bg-amber-600 rounded-full"></div>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  You may terminate your account at any time by contacting us at
                  <span className="font-semibold text-[#B89A67]">
                    {" "}
                    support@graphura.in
                  </span>
                  . Upon termination, your right to use our services will
                  immediately cease.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <span className="text-gray-700 font-medium">
                      30-day notice for program withdrawal
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-amber-600" />
                    <span className="text-gray-700 font-medium">
                      Refund eligibility per Section 4.3
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-600" />
                    <span className="text-gray-700 font-medium">
                      Written notice required
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full mt-8 bg-linear-to-r from-gray-50 to-gray-100 p-8 rounded-2xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                7.3 Effect of Termination
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <div className="text-3xl font-bold text-[#B89A67] mb-2">
                    Immediate
                  </div>
                  <div className="text-gray-700">
                    Access revocation to services
                  </div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <div className="text-3xl font-bold text-[#B89A67] mb-2">
                    30 Days
                  </div>
                  <div className="text-gray-700">
                    Data retention period begins
                  </div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                  <div className="text-3xl font-bold text-[#B89A67] mb-2">
                    Ongoing
                  </div>
                  <div className="text-gray-700">
                    Obligations survive termination
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Section 8 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          id="section-8"
          className="scroll-mt-24 w-full"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-gray-900">8</span>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Limitation of Liability
                </h2>
                <p className="text-gray-600 mt-2">
                  Legal disclaimers and liability limitations
                </p>
              </div>
            </div>

            <div className="w-full bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200">
              <div className="space-y-8">
                <div className="p-6 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    8.1 No Warranty
                  </h3>
                  <p className="text-gray-700">
                    Our services are provided on an "AS IS" and "AS AVAILABLE"
                    basis. We make no warranties, expressed or implied,
                    regarding the suitability, reliability, availability,
                    timeliness, or accuracy of our services for any particular
                    purpose.
                  </p>
                </div>

                <div className="p-6 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    8.2 Liability Cap
                  </h3>
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="shrink-0-flex">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <Shield className="w-12 h-12 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-700">
                        To the maximum extent permitted by law, Graphura India
                        Private Limited shall not be liable for any indirect,
                        incidental, special, consequential, or punitive damages,
                        including without limitation, loss of profits, data,
                        use, goodwill, or other intangible losses, resulting
                        from your access to or use of or inability to access or
                        use our services.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-linear-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    8.3 Program-Specific Limitations
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        We Are Not Responsible For:
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <X className="w-4 h-4 text-red-600 mt-1 shrink-0-flex" />
                          <span>
                            Visa denials or delays by government authorities
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <X className="w-4 h-4 text-red-600 mt-1 shrink-0-flex" />
                          <span>
                            Host company performance or internal decisions
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <X className="w-4 h-4 text-red-600 mt-1 shrink-0-flex" />
                          <span>Personal emergencies or health issues</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        We Provide Assistance For:
                      </h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 mt-1 shrink-0-flex" />
                          <span>
                            Visa application guidance and documentation
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 mt-1 shrink-0-flex" />
                          <span>24/7 emergency support during program</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-600 mt-1 shrink-0-flex" />
                          <span>Program coordination and logistics</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Section 9 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          id="section-9"
          className="scroll-mt-24 w-full"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-gray-900">9</span>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Governing Law & Dispute Resolution
                </h2>
                <p className="text-gray-600 mt-2">
                  Legal jurisdiction and conflict resolution procedures
                </p>
              </div>
            </div>

            <div className="w-full grid md:grid-cols-2 gap-8">
              <div className="bg-linear-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl shadow-lg border border-indigo-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md">
                    <Scale className="w-8 h-8 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      9.1 Governing Law
                    </h3>
                    <div className="w-12 h-1 bg-indigo-600 rounded-full"></div>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  These Terms shall be governed and construed in accordance with
                  the laws of India, without regard to its conflict of law
                  provisions.
                </p>
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#B89A67]" />
                    <div>
                      <div className="font-bold text-gray-900">
                        Jurisdiction
                      </div>
                      <div className="text-gray-700">
                        Courts in Gurgaon, Haryana
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-br from-emerald-50 to-emerald-100 p-8 rounded-2xl shadow-lg border border-emerald-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md">
                    <Users className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      9.2 Dispute Resolution
                    </h3>
                    <div className="w-12 h-1 bg-emerald-600 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <span className="font-bold text-emerald-600">1</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">
                        Informal Negotiation
                      </div>
                      <div className="text-gray-700">
                        Attempt to resolve disputes amicably within 30 days
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <span className="font-bold text-emerald-600">2</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Mediation</div>
                      <div className="text-gray-700">
                        If unresolved, proceed to mediation with neutral third
                        party
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <span className="font-bold text-emerald-600">3</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">
                        Legal Action
                      </div>
                      <div className="text-gray-700">
                        As last resort, pursue legal action in designated
                        jurisdiction
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full mt-8 bg-linear-to-r from-amber-50 to-amber-100 p-8 rounded-2xl border border-amber-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                9.3 Class Action Waiver
              </h3>
              <p className="text-gray-700">
                You agree that any dispute resolution proceedings will be
                conducted only on an individual basis and not in a class,
                consolidated, or representative action. You waive any right to a
                jury trial in any action arising out of or relating to these
                Terms.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Section 10 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          id="section-10"
          className="scroll-mt-24 w-full"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-gray-900">10</span>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Changes to Terms of Service
                </h2>
                <p className="text-gray-600 mt-2">
                  How and when we update our terms
                </p>
              </div>
            </div>

            <div className="w-full bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <AlertTriangle className="w-6 h-6 text-blue-600" />
                    10.1 Right to Modify
                  </h3>
                  <p className="text-gray-700">
                    We reserve the right, at our sole discretion, to modify or
                    replace these Terms at any time. If a revision is material,
                    we will provide at least 30 days' notice prior to any new
                    terms taking effect.
                  </p>
                </div>

                <div className="p-6 bg-linear-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <Bell className="w-6 h-6 text-purple-600" />
                    10.2 Notification Methods
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700">
                        Email notification to registered users
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700">
                        Website announcement and banner
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-700">
                        Updated "Last Modified" date
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-8 bg-linear-to-r from-[#ECD1A8]/20 to-[#D4B483]/20 rounded-2xl border-2 border-[#D4B483]/30">
                <h4 className="font-bold text-gray-900 text-xl mb-4">
                  10.3 Continued Use Constitutes Acceptance
                </h4>
                <div className="flex items-start gap-4">
                  <Check className="w-8 h-8 text-[#B89A67] shrink-0-flex" />
                  <div>
                    <p className="text-gray-700">
                      By continuing to access or use our services after any
                      revisions become effective, you agree to be bound by the
                      revised terms. If you do not agree to the new terms, you
                      are no longer authorized to use our services.
                    </p>
                    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-[#B89A67]" />
                        <div>
                          <div className="font-bold text-gray-900">
                            Review Period
                          </div>
                          <div className="text-gray-700">
                            You have 30 days to review changes before they take
                            effect
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Section 11 */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          id="section-11"
          className="scroll-mt-24 w-full"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-[#ECD1A8] rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-4xl font-bold text-gray-900">11</span>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Contact Information & Miscellaneous
                </h2>
                <p className="text-gray-600 mt-2">
                  How to contact us and other important provisions
                </p>
              </div>
            </div>

            <div className="w-full grid md:grid-cols-2 gap-8">
              <div className="bg-linear-to-br from-gray-900 to-[#2C1810] p-8 rounded-2xl shadow-xl text-white">
                <h3 className="text-2xl font-bold mb-6">
                  11.1 Contact Information
                </h3>

                <div className="space-y-6">
                  <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Building className="w-5 h-5 text-[#ECD1A8]" />
                      <h4 className="font-bold">Legal Department</h4>
                    </div>
                    <a
                      href="mailto:legal@graphura.in"
                      className="text-[#ECD1A8] hover:underline block"
                    >
                      legal@graphura.in
                    </a>
                  </div>

                  <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="w-5 h-5 text-[#ECD1A8]" />
                      <h4 className="font-bold">General Inquiries</h4>
                    </div>
                    <a
                      href="mailto:official@graphura.in"
                      className="text-[#ECD1A8] hover:underline block"
                    >
                      official@graphura.in
                    </a>
                  </div>

                  <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Phone className="w-5 h-5 text-[#ECD1A8]" />
                      <h4 className="font-bold">Phone Support</h4>
                    </div>
                    <div className="text-[#ECD1A8]">+91 7378021327</div>
                    <div className="text-gray-400 text-sm mt-1">
                      Mon-Fri, 9AM-6PM IST
                    </div>
                  </div>

                  <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="w-5 h-5 text-[#ECD1A8]" />
                      <h4 className="font-bold">Registered Office</h4>
                    </div>
                    <div className="text-gray-300">
                      Graphura India Private Limited
                      <br />
                      near RSF, Pataudi
                      <br />
                      Gurgaon, Haryana 122503
                      <br />
                      India
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-linear-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  11.2 Miscellaneous Provisions
                </h3>

                <div className="space-y-6">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-2">
                      Entire Agreement
                    </h4>
                    <p className="text-gray-700 text-sm">
                      These Terms constitute the entire agreement between you
                      and Graphura regarding our services and supersede all
                      prior agreements and understandings.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-2">
                      Severability
                    </h4>
                    <p className="text-gray-700 text-sm">
                      If any provision of these Terms is held to be
                      unenforceable or invalid, such provision will be changed
                      and interpreted to accomplish the objectives to the
                      greatest extent possible under applicable law.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-2">No Waiver</h4>
                    <p className="text-gray-700 text-sm">
                      Our failure to enforce any right or provision of these
                      Terms will not be considered a waiver of those rights.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-2">Assignment</h4>
                    <p className="text-gray-700 text-sm">
                      You may not assign or transfer these Terms without our
                      prior written consent. We may assign our rights under
                      these Terms without restriction.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full mt-8 bg-linear-to-r from-[#ECD1A8] to-[#D4B483] p-8 rounded-2xl shadow-xl border border-[#D4B483]">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Acknowledgement
                  </h3>
                  <p className="text-gray-900">
                    By using our services, you acknowledge that you have read
                    these Terms of Service, understand them, and agree to be
                    bound by them.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <Scale className="w-6 h-6 text-gray-900" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      January 25,2026
                    </div>
                    <div className="text-gray-900">Effective Date</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        {/* Quick Contact & Summary */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="w-full"
        >
          {/* <motion.div variants={itemVariants}>
                        <div className="w-full grid md:grid-cols-2 gap-8">
                            <div className="bg-linear-to-br from-[#2C1810] to-gray-900 p-8 rounded-2xl shadow-xl text-white">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <Mail className="w-6 h-6 text-[#ECD1A8]" />
                                    Need Clarification?
                                </h3>
                                <p className="text-gray-300 mb-6">
                                    If you have questions about any of these terms or need further clarification,
                                    please don't hesitate to contact us.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-[#ECD1A8]" />
                                        <a href="mailto:legal@graphura.in" className="text-[#ECD1A8] hover:underline">
                                            legal@graphura.in
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-[#ECD1A8]" />
                                        <span>+91 7378021327</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-5 h-5 text-[#ECD1A8]" />
                                        <span>Graphura India Private Limited, Gurgaon, Haryana</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-linear-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl border border-gray-200">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Terms Summary</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-4 bg-[#ECD1A8]/10 rounded-lg">
                                        <Check className="w-5 h-5 text-green-600" />
                                        <span className="text-gray-700">These Terms govern all use of our services</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-[#ECD1A8]/10 rounded-lg">
                                        <Check className="w-5 h-5 text-green-600" />
                                        <span className="text-gray-700">By using our services, you accept these Terms</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-[#ECD1A8]/10 rounded-lg">
                                        <Check className="w-5 h-5 text-green-600" />
                                        <span className="text-gray-700">We may update these Terms periodically</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-[#ECD1A8]/10 rounded-lg">
                                        <Check className="w-5 h-5 text-green-600" />
                                        <span className="text-gray-700">Your continued use constitutes acceptance</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div> */}
        </motion.div>

        {/* Back to Top - Full Width */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full mt-16 pt-8 border-t border-gray-200 text-center"
        >
          <a
            href="#top"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-bold text-lg rounded-full hover:shadow-2xl transition-all hover:scale-105 hover:bg-black"
          >
            <span>Back to Top</span>
            <ChevronRight className="w-6 h-6 -rotate-90" />
          </a>

          <div className="mt-8 text-gray-600">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <Gavel className="w-5 h-5 text-[#B89A67]" />
                <span className="font-semibold">Legally Binding Agreement</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#B89A67]" />
                <span className="font-semibold">
                  Effective January 25, 2026
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-[#B89A67]" />
                <span className="font-semibold">Governing Law: India</span>
              </div>
            </div>
            <p>© 2026 Graphura India Private Limited. All rights reserved.</p>
            <p className="mt-1">
              These Terms of Service were last updated on January 25, 2026
            </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default TermsOfService;