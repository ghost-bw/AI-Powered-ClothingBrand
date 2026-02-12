import React from "react";
import logo from "../../assets/logo/logo.webp";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaInstagram, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAboutLinkClick = (sectionId) => {
    sessionStorage.setItem("previousPage", location.pathname);
    const cleanSectionId = sectionId
      .replace("/about#", "")
      .replace("#", "")
      .replace("/about", "");
    navigate(`/about#${cleanSectionId}`);
  };

  const handleAboutNavigation = () => {
    sessionStorage.setItem("previousPage", location.pathname);
    navigate("/about");
  };

  return (
    <footer className="bg-black/85 backdrop-blur-xl text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        {/* Top Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-10 lg:mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <img src={logo} alt="Graphura Logo" className="h-15 w-auto" />

            <p className="text-sm leading-relaxed">
              Modern heritage redefined. Elevating Indian luxury through
              minimalist design and artisanal craft.
            </p>

            <div className="flex gap-3 pt-2">
              <a
                href="https://x.com/Graphura"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-600 hover:border-black hover:text-white cursor-pointer transition-colors hover:scale-120 duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter className="text-sm" />
              </a>

              <a
                href="https://www.linkedin.com/company/graphura-india-private-limited/"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-600 hover:border-black hover:text-white cursor-pointer transition-colors hover:scale-120 duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://www.facebook.com/Graphura.in?mibextid=ZbWKwL"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-600 hover:border-black hover:text-white cursor-pointer transition-colors hover:scale-120 duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/graphura.in?igsh=cW9laTd6amxjeWZh"
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-600 hover:border-black hover:text-white cursor-pointer transition-colors hover:scale-120 duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Shopping */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">Shopping</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/men" className="hover:text-white py-1 inline-block">
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/women"
                  className="hover:text-white py-1 inline-block"
                >
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link to="/kids" className="hover:text-white py-1 inline-block">
                  Kids
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="hover:text-white py-1 inline-block"
                >
                  All Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigate("/about")}
                  className="hover:text-white py-1 w-full text-left cursor-pointer"
                >
                  About Graphura
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/weavers")}
                  className="hover:text-white py-1 w-full text-left cursor-pointer"
                >
                  Our Weavers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/sustainability")}
                  className="hover:text-white py-1 w-full text-left cursor-pointer"
                >
                  Sustainability
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/careers")}
                  className="hover:text-white py-1 w-full text-left cursor-pointer"
                >
                  Careers
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">Support</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => navigate("/shipping")}
                  className="hover:text-white py-1 w-full text-left cursor-pointer"
                >
                  Shipping & Returns
                </button>
              </li>

              <li>
                <button
                  onClick={() => navigate("/faq")}
                  className="hover:text-white py-1 w-full text-left cursor-pointer"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-gray mt-1" />
                <span>
                  Graphura India Private Limited, near RSF, Pataudi, Gurgaon,
                  Haryana 122503
                </span>
              </li>

              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-gray" />
                <a href="tel:+917378021327" className="hover:text-white">
                  +91 7378021327
                </a>
              </li>

              <li className="flex items-center gap-3">
                <FaEnvelope className="text-gray" />
                <a
                  href="mailto:support@graphura.in"
                  className="hover:text-white"
                >
                  support@graphura.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>© 2026 Graphura India Private Limited. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;