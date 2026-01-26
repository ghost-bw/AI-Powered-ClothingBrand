import React, { useState } from "react";
import graphura from "../../assets/graphuralogo/graphura.webp";
import {
  CreditCard,
  Smartphone,
  Truck,
  Landmark,
  ShieldCheck,
  ChevronRight,
  MapPin,
  Menu,
  ShoppingBag,
  User,
  Search,
  X,
} from "lucide-react";

const CheckoutPage = () => {
  // --- STATE MANAGEMENT ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
  });

  // Mock Cart Data
  const cartItems = [
    {
      id: 1,
      name: "Oversized Streetwear T-Shirt",
      size: "L",
      price: 999,
      image:
        "https://img.shoplineapp.com/media/image_clips/66012ff3dd389300115c5c18/original.jpg?1711353843",
    },
    {
      id: 2,
      name: "Slim Fit Cargo Pants",
      size: "32",
      price: 1299,
      image:
        "https://cdna.lystit.com/photos/asos/29b7dc49/selected-Green-Slim-Fit-Cargo-Pant.jpeg",
    },
    {
      id: 3,
      name: "Women Washed Denim Jacket",
      size: "M",
      price: 1499,
      image:
        "https://rukminim1.flixcart.com/image/832/832/kgo0pzk0/jacket/7/x/e/free-or-jk01lblue-the-orange-shopee-original-imafwur9g8zbt393.jpeg?q=70",
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const shippingCost = subtotal > 1500 ? 0 : 99;
  const total = subtotal + shippingCost;

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    console.log("Processing Order...", {
      shipping: shippingInfo,
      payment: paymentMethod,
      total,
    });
    alert(`Order Placed via ${paymentMethod.toUpperCase()}!`);
  };

  // --- NAVBAR COMPONENT ---
  const Navbar = () => (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img className="w-35 h-15" src={graphura} alt="Graphura Logo" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-600 hover:text-black font-medium transition"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-black font-medium transition"
            >
              Shop
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-black font-medium transition"
            >
              Sustainability
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-black font-medium transition"
            >
              Journal
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-black font-medium transition"
            >
              Contact
            </a>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-600 hover:text-black">
              <Search size={20} />
            </button>
            <button className="text-gray-600 hover:text-black relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </button>
            <button className="text-gray-600 hover:text-black">
              <User size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-50 rounded-md"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-50 rounded-md"
            >
              Shop
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-50 rounded-md"
            >
              Collections
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-50 rounded-md"
            >
              My Account
            </a>
          </div>
        </div>
      )}
    </nav>
  );

  // --- MAIN LAYOUT ---
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <main className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <ShieldCheck className="text-green-600" /> Secure Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN: Shipping & Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Details Form */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin size={20} /> Shipping Information
                </h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                      placeholder="Ashirwad Kumar"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
                      placeholder="ashirwadgraphura@gmail.com"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
                      placeholder="+91 7378021327"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
                      placeholder="near RSF, Pataudi, Gurgaon, Haryana 122503"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
                      placeholder="Haryana"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="zip"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
                      placeholder="XX XX XX"
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </div>

              {/* Payment Method Selection */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {/* UPI */}
                  <label
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === "upi" ? "border-black bg-gray-50" : "border-gray-200"}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === "upi"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-black focus:ring-black"
                    />
                    <div className="ml-4 flex items-center gap-3">
                      <Smartphone className="text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-800">
                          UPI (GPay, PhonePe, Paytm)
                        </p>
                        <p className="text-sm text-gray-500">
                          Pay directly from your bank app
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Card */}
                  <label
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === "card" ? "border-black bg-gray-50" : "border-gray-200"}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-black focus:ring-black"
                    />
                    <div className="ml-4 flex items-center gap-3">
                      <CreditCard className="text-purple-600" />
                      <div>
                        <p className="font-semibold text-gray-800">
                          Credit / Debit Card
                        </p>
                        <p className="text-sm text-gray-500">
                          Visa, Mastercard, RuPay
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Net Banking */}
                  <label
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === "netbanking" ? "border-black bg-gray-50" : "border-gray-200"}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="netbanking"
                      checked={paymentMethod === "netbanking"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-black focus:ring-black"
                    />
                    <div className="ml-4 flex items-center gap-3">
                      <Landmark className="text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-800">
                          Net Banking
                        </p>
                        <p className="text-sm text-gray-500">
                          All major Indian banks supported
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* COD */}
                  <label
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === "cod" ? "border-black bg-gray-50" : "border-gray-200"}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-black focus:ring-black"
                    />
                    <div className="ml-4 flex items-center gap-3">
                      <Truck className="text-orange-600" />
                      <div>
                        <p className="font-semibold text-gray-800">
                          Cash on Delivery
                        </p>
                        <p className="text-sm text-gray-500">
                          Pay cash upon receiving your order
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-20 bg-gray-200 rounded-md flex-shrink-0 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800 line-clamp-2">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Size: {item.size}
                        </p>
                        <p className="text-sm font-semibold mt-1">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span
                      className={shippingCost === 0 ? "text-green-600" : ""}
                    >
                      {shippingCost === 0 ? "Free" : `₹${shippingCost}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-3 mt-2">
                    <span>Total Payable</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-black text-white py-4 rounded-lg mt-6 font-semibold text-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  Place Order <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
