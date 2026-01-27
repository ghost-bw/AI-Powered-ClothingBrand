import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import graphura from "../../assets/graphuralogo/graphura.webp";
import gpay from "../../assets/payment/gpay.webp";
import phonepe from "../../assets/payment/phonepe.webp";
import paytm from "../../assets/payment/paytm.webp";

import {
  CreditCard,
  Truck,
  Landmark,
  ShieldCheck,
  ChevronRight,
  MapPin,
  Menu,
  ShoppingBag,
  User,
  X,
} from "lucide-react";

/* ================= CHECKOUT STEPPER ================= */
const CheckoutStepper = ({ currentStep }) => {
  const steps = ["Address", "Payment", "Success"];

  return (
    <div className="flex items-center justify-between max-w-3xl mx-auto mb-10">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

        return (
          <div key={step} className="flex-1 flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold
                  ${
                    isCompleted
                      ? "bg-green-600 text-white"
                      : isActive
                      ? "bg-black text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
              >
                {stepNumber}
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  isActive ? "text-black" : "text-gray-500"
                }`}
              >
                {step}
              </span>
            </div>

            {index !== steps.length - 1 && (
              <div className="flex-1 h-[2px] mx-2 bg-gray-300" />
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ================= CHECKOUT PAGE ================= */
const CheckoutPage = () => {
  const navigate = useNavigate();

  /* ---------- AUTH GUARD ---------- */
  const handleCheckoutGuard = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/user/login");
      return false;
    }
    return true;
  };

  /* ---------- STATE ---------- */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  /* ---------- MOCK CART ---------- */
  const cartItems = [
    {
      id: 1,
      name: "Oversized Streetwear T-Shirt",
      size: "L",
      price: 999,
      image:
        "https://img.shoplineapp.com/media/image_clips/66012ff3dd389300115c5c18/original.jpg",
    },
    {
      id: 2,
      name: "Slim Fit Cargo Pants",
      size: "32",
      price: 1299,
      image:
        "https://cdna.lystit.com/photos/asos/29b7dc49/selected-Green-Slim-Fit-Cargo-Pant.jpeg",
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const shippingCost = subtotal > 1500 ? 0 : 99;
  const total = subtotal + shippingCost;

  /* ---------- VALIDATION ---------- */
  const isAddressValid = () => {
    const { fullName, email, phone, address, zip, city, state } = shippingInfo;
    return (
      fullName &&
      email &&
      phone.length === 10 &&
      address &&
      zip.length === 6 &&
      city &&
      state
    );
  };

  /* ---------- INPUT HANDLER ---------- */
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));

    if (name === "zip" && value.length === 6) {
      try {
        const res = await fetch(
          `https://api.postalpincode.in/pincode/${value}`
        );
        const data = await res.json();

        if (data[0].Status === "Success") {
          const postOffice = data[0].PostOffice[0];
          setShippingInfo((prev) => ({
            ...prev,
            city: postOffice.District,
            state: postOffice.State,
          }));
        }
      } catch {
        alert("Invalid pincode");
      }
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ---------- NAVBAR ---------- */}
      <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center h-16 px-6">
          <a href="/">
            <img src={graphura} className="h-10" alt="logo" />
          </a>

          <div className="hidden md:flex items-center gap-6">
            <ShoppingBag />
            <User />
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* ---------- MAIN ---------- */}
      <main className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <ShieldCheck className="text-green-600" /> Secure Checkout
        </h1>

        <CheckoutStepper currentStep={currentStep} />

        {/* ---------- STEP 1 ---------- */}
        {currentStep === 1 && (
          <button
            disabled={!isAddressValid()}
            onClick={() => {
              if (!handleCheckoutGuard()) return;
              setCurrentStep(2);
            }}
            className="bg-black text-white px-6 py-3 rounded"
          >
            Continue to Payment
          </button>
        )}

        {/* ---------- STEP 2 ---------- */}
        {currentStep === 2 && (
          <button
            onClick={() => setCurrentStep(3)}
            disabled={!paymentMethod}
            className="bg-black text-white px-6 py-3 rounded"
          >
            Place Order <ChevronRight />
          </button>
        )}

        {/* ---------- STEP 3 ---------- */}
        {currentStep === 3 && (
          <div className="bg-white p-10 rounded-xl text-center">
            <ShieldCheck className="w-16 h-16 mx-auto text-green-600" />
            <h2 className="text-2xl font-bold mt-4">Order Placed 🎉</h2>
            <p>Total Paid: ₹{total}</p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-black text-white px-8 py-3 rounded"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CheckoutPage;
