import React from "react";
import logo from '../../assets/logo/logo.webp'

const Footer = () => {
  return (
    <footer className="bg-linear-to-b from-[#262627] to-black text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Top Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div>
            <img
            src={logo}
            alt="Graphura Logo"
            className="h-15 w-auto invert brightness-200"
            />

            <p className="text-sm leading-relaxed">
              Modern heritage redefined. Elevating Indian luxury through
              minimalist design and artisanal craft.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <span className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-600 hover:border-white cursor-pointer transition">
                🌐
              </span>
              <span className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-600 hover:border-white cursor-pointer transition">
                📷
              </span>
            </div>
          </div>

          {/* Shopping */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">
              Shopping
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer">Men's Collection</li>
              <li className="hover:text-white cursor-pointer">Women's Collection</li>
              <li className="hover:text-white cursor-pointer">Artisanal Accessories</li>
              <li className="hover:text-white cursor-pointer">Limited Drops</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer">About Graphura</li>
              <li className="hover:text-white cursor-pointer">Our Weavers</li>
              <li className="hover:text-white cursor-pointer">Sustainability</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer">Contact Us</li>
              <li className="hover:text-white cursor-pointer">Shipping & Returns</li>
              <li className="hover:text-white cursor-pointer">Size Guide</li>
              <li className="hover:text-white cursor-pointer">FAQ</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs gap-4">
          <p>
            © 2026 Graphura Luxury Private Limited. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
