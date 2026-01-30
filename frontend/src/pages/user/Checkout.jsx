
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useShop } from "../../context/ShopContext";
import graphura from "../../assets/graphuralogo/graphura.webp";
import gpay from "../../assets/payment/gpay.webp";
import phonepe from "../../assets/payment/phonepe.webp";
import paytm from "../../assets/payment/paytm.webp";



import API from "../../api/axios";



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
  X,
  Check,
} from "lucide-react";




// Improved Checkout Stepper Component
// Precise Checkout Stepper Component
// Corrected Checkout Stepper Component
// Simple Fixed Checkout Stepper Component
// Perfect Checkout Stepper Component
const CheckoutStepper = ({ currentStep }) => {
 

  const steps = [
    { title: "Address", step: 1, description: "Shipping details" },
    { title: "Payment", step: 2, description: "Payment method" },
    { title: "Success", step: 3, description: "Order confirmation" },
  ];

  // Calculate line positions
  const circleWidth = 48; // 12 * 4 (w-12 in pixels)
  const containerWidth = 1024; // max-w-4xl approx
  
  return (
    <div className="max-w-4xl mx-auto mb-10 px-4">
      <div className="relative">
        {/* Steps Container */}
        <div className="flex justify-between items-start relative">
          
          {/* Full Background Line */}
          <div 
            className="absolute top-6 h-0.5 bg-gray-300"
            style={{
              left: '24px',      // Start after address circle radius
              right: '24px',     // End before success circle radius
              width: 'calc(100% - 48px)'
            }}
          ></div>
          
          {/* Progress Line */}
          <div 
            className="absolute top-6 h-0.5 bg-green-600 transition-all duration-300"
            style={{
              left: '24px',
              width: `${(currentStep - 1) * 50}%`,
              maxWidth: 'calc(100% - 48px)'
            }}
          ></div>

          {steps.map((step, index) => {
            const isCompleted = currentStep > step.step;
            const isActive = currentStep === step.step;
            const isFirst = index === 0;
            const isLast = index === steps.length - 1;
            const isMiddle = index === 1;

            return (
              <div 
                key={step.title} 
                className="flex flex-col items-center relative z-20"
                style={{
                  width: isMiddle ? 'auto' : 'calc(50% - 24px)',
                }}
              >
                {/* Circle Container with white overlay to hide line behind middle circle */}
                <div className="relative">
                  {isMiddle && (
                    <div 
                      className="absolute top-6 left-1/2 transform -translate-x-1/2 w-14 h-0.5 bg-white z-10"
                    ></div>
                  )}
                  
                  {/* Circle */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg mb-2 border-2 transition-all duration-300 relative z-20
                      ${
                        isCompleted || isActive
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white text-gray-600 border-gray-300"
                      }`}
                  >
                    {isCompleted ? (
                      <Check size={20} className="text-white" />
                    ) : (
                      step.step
                    )}
                  </div>
                </div>
                
                {/* Step Title */}
                <span
                  className={`text-sm font-medium ${
                    isCompleted || isActive
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>
                
                {/* Step Description */}
                <span className="text-xs text-gray-400 mt-1 text-center">
                  {step.description}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  // const { cart, cartTotal, cartCount, loading } = useShop();
  // --- STATE MANAGEMENT ---
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

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [freeShippingThreshold] = useState(7000);
  const [shippingCost] = useState(150);
  const [gstRate] = useState(0.12);
  const [cart,setCart] = useState([]);
const [loading,setLoading] = useState(true);
const [placing, setPlacing] = useState(false);



  // Get real cart data from context
  // const { cart, cartTotal, cartCount } = useShop();
  const navigate = useNavigate();

  // Calculate totals based on real cart data
  const subtotal = cart.reduce((a,b)=>a + (b.price * b.quantity),0);
const cartCount = cart.reduce((a,b)=>a + b.quantity,0);

  const estimatedShipping = subtotal >= freeShippingThreshold ? 0 : shippingCost;
  const gst = (subtotal + estimatedShipping) * gstRate;
  const total = subtotal + estimatedShipping + gst - discount;

  // Calculate free shipping progress
  const freeShippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const amountNeeded = Math.max(freeShippingThreshold - subtotal, 0);

 const [initialized, setInitialized] = useState(false);
//  const { cart, cartTotal, cartCount } = useShop();

// console.log("CHECKOUT CART:", cart);
// console.log("CHECKOUT CART LENGTH:", cart?.length);
// console.log("CURRENT STEP:", currentStep);


useEffect(()=>{

 const loadCart = async()=>{

  try{

   const res = await API.get("/users/me",{
    headers:{
     Authorization:`Bearer ${localStorage.getItem("token")}`
    }
   });

   setCart(res.data?.cart || []);

  }catch(err){
   console.log(err);
  }finally{
   setLoading(false);
  }

 };

 loadCart();

},[]);
// 👇 THEN this redirect effect
  useEffect(()=>{

    if(!loading && cart.length===0 && currentStep!==3){
      navigate("/cart");
    }

  },[cart,loading,currentStep]);




  const isAddressValid = () => {
    const { fullName, email, phone, address, zip, city, state } = shippingInfo;

    if (!fullName.trim()) return false;
    if (!email.trim()) return false;
    if (!phone.trim() || phone.length < 10) return false;
    if (!address.trim()) return false;
    if (!zip || zip.length !== 6) return false;
    if (!city || !state) return false;

    return true;
  };

  // Handle promo code
  const handleApplyPromo = () => {
    if (promoCode.trim() === "") return;

    const validPromoCodes = {
      WELCOME15: 0.15,
      SAVE10: 0.1,
      FASHION20: 0.2,
    };

    if (validPromoCodes[promoCode.toUpperCase()]) {
      const discountRate = validPromoCodes[promoCode.toUpperCase()];
      const discountAmount = subtotal * discountRate;
      setDiscount(discountAmount);
      alert(`Promo code applied! You saved ₹${discountAmount.toFixed(2)}`);
    } else {
      alert("Invalid promo code. Please try again.");
    }
  };

  // --- HANDLERS ---
  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    // Normal input update
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 👇 PINCODE AUTO-FILL LOGIC
    if (name === "zip" && value.length === 6) {
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${value}`);
        const data = await res.json();

        if (data[0].Status === "Success") {
          const postOffice = data[0].PostOffice[0];

          setShippingInfo((prev) => ({
            ...prev,
            city: postOffice.District,
            state: postOffice.State,
          }));
        } else {
          setShippingInfo((prev) => ({
            ...prev,
            city: "",
            state: "",
          }));
          alert("Invalid Pincode");
        }
      } catch (error) {
        alert("Unable to fetch location");
      }
    }
  };

  const handlePlaceOrder = async (e) => {
 e.preventDefault();

 try {

 const res = await API.post("/orders", {
   shipping: shippingInfo,
   payment: paymentMethod,
   subtotal,
   shippingCost: estimatedShipping,
   gst,
   discount,
   total
 }, {
   headers: {
     Authorization: `Bearer ${localStorage.getItem("token")}`
   }
 });

 if(res.data.success){
  //  alert(res.data.message);
   setCurrentStep(3);
 }

} catch (err) {
 alert(err.response?.data?.message || "Order failed");
}}



  // --- NAVBAR COMPONENT ---
  const Navbar = () => (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="w-full px-6">
        <div className="flex justify-between items-center h-16 px-4">
          {/* Logo */}
          <div className="flex items-center justify-start">
            <a href="/">
              <img className="w-auto h-15" src={graphura} alt="Graphura Logo" />
            </a>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="hidden md:flex items-left text-left space-x-8">
              <a
                href="#"
                className="text-gray-600 hover:text-black font-medium transition"
              >
                Support
              </a>
            </div>
            <button
              onClick={() => navigate('/cart')}
              className="text-gray-600 hover:text-black relative cursor-pointer"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            </button>
            <button className="text-gray-600 hover:text-black cursor-pointer">
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
              Support
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

          <CheckoutStepper currentStep={currentStep} />

          {/* Free Shipping Progress Bar */}
          {currentStep !== 3 && cart.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Almost there!
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {freeShippingProgress.toFixed(0)}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                ></div>
              </div>

              <p className="text-sm text-gray-600">
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-green-600 font-medium">
                    🎉 You've unlocked Free Express Shipping!
                  </span>
                ) : (
                  `Add ₹${amountNeeded} more to unlock Free Express Shipping.`
                )}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN: Shipping & Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Details Form */}
              {currentStep === 1 && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <MapPin size={20} /> Shipping Address
                  </h2>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>

                      <input
                        type="text"
                        name="fullName"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                        placeholder="Enter Full Name"
                        onChange={handleInputChange}
                        value={shippingInfo.fullName}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
                        placeholder="Enter your Email"
                        onChange={handleInputChange}
                        value={shippingInfo.email}
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone <span className="text-red-500">*</span>
                      </label>

                      <div
                        className={`flex items-center rounded-lg border transition
      ${
                          shippingInfo.phone.length === 10
                            ? "border-green-500"
                            : "border-gray-300 focus-within:border-black"
                        }`}
                      >
                        {/* Country Code */}
                        <div className="flex items-center gap-1 px-3 bg-gray-100 text-sm font-medium text-gray-700 rounded-l-lg border-r">
                          <span className="text-lg">🇮🇳</span>
                          +91
                        </div>

                        {/* Phone Input */}
                        <input
                          type="tel"
                          name="phone"
                          maxLength={10}
                          value={shippingInfo.phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setShippingInfo((prev) => ({
                              ...prev,
                              phone: val,
                            }));
                          }}
                          placeholder="Enter mobile no."
                          className="w-full px-4 py-3 outline-none rounded-r-lg placeholder-gray-400"
                        />

                        {/* Success Icon */}
                        {shippingInfo.phone.length === 10 && (
                          <span className="px-3 text-green-600 font-bold">
                            ✔
                          </span>
                        )}
                      </div>

                      <p className="text-xs mt-1 text-gray-500">
                        We'll use this number for delivery updates
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black outline-none"
                        placeholder="Enter Full Address"
                        onChange={handleInputChange}
                        value={shippingInfo.address}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={shippingInfo.city}
                        readOnly
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={shippingInfo.state}
                        readOnly
                        className="w-full p-3 border border-gray-300 rounded-md bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pincode <span className="text-red-500">*</span>
                      </label>

                      <input
                        type="tel"
                        name="zip"
                        value={shippingInfo.zip}
                        onChange={handleInputChange}
                        maxLength={6}
                        placeholder="Enter 6-digit pincode"
                        className="w-full p-3 border border-gray-300 rounded-md 
             focus:ring-2 focus:ring-black outline-none 
             placeholder-gray-400"
                      />
                    </div>
                  </form>
                  <button
                    disabled={!isAddressValid()}
                    onClick={() => {
                      if (!isAddressValid()) return;
                      setCurrentStep(2);
                    }}
                    className={`mt-6 px-6 py-3 rounded-lg font-semibold transition
    ${
      isAddressValid()
        ? "bg-black text-white hover:bg-green-800"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }
  `}
                  >
                    Continue to Payment →
                  </button>
                </div>
              )}

              {/* Payment Method Selection */}
              {currentStep === 2 && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Payment Method
                  </h2>
                  <div className="space-y-3">
                    {/* UPI */}
                    <label
                      className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all
  ${paymentMethod === "upi" ? "border-green-600 bg-green-50" : "border-gray-200 hover:border-gray-300"}`}
                    >
                      {/* Radio */}
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={paymentMethod === "upi"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-green-600 focus:ring-green-500"
                      />

                      {/* UPI Logos */}
                      <div className="flex items-center gap-2">
                        <img
                          src={gpay}
                          alt="Google Pay"
                          className="h-5 w-auto object-contain"
                        />
                        <img
                          src={phonepe}
                          alt="PhonePe"
                          className="h-5 w-auto object-contain"
                        />
                        <img
                          src={paytm}
                          alt="Paytm"
                          className="h-5 w-auto object-contain"
                        />
                      </div>

                      {/* Text */}
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          UPI (GPay, PhonePe, Paytm)
                        </p>
                        <p className="text-sm text-gray-500">
                          Fast & Secure | Most Preferred
                        </p>
                      </div>
                    </label>

                    {/* Card */}
                    <label
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                        paymentMethod === "card"
                          ? "border-green-600 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-green-600 focus:ring-green-500"
                      />
                      <div className="ml-4 flex items-center gap-4">
                        {/* ICON WRAPPER */}
                        <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                          <CreditCard className="text-purple-600" />
                        </div>

                        {/* TEXT */}
                        <div className="flex-1">
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
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                        paymentMethod === "netbanking"
                          ? "border-green-600 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="netbanking"
                        checked={paymentMethod === "netbanking"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-green-600 focus:ring-green-500"
                      />
                      <div className="ml-4 flex items-center gap-4">
                        {/* ICON */}
                        <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                          <Landmark className="text-green-600" />
                        </div>

                        {/* TEXT */}
                        <div className="flex-1">
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
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                        paymentMethod === "cod"
                          ? "border-green-600 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-5 h-5 text-green-600 focus:ring-green-500"
                      />
                      <div className="ml-4 flex items-center gap-4">
                        {/* ICON */}
                        <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                          <Truck className="text-orange-600" />
                        </div>

                        {/* TEXT */}
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">
                            Cash on Delivery
                          </p>
                          <p className="text-sm text-gray-500">
                            COD available on orders below ₹199.
                            <br />
                            Pay when you receive your order
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="flex justify-between">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                  >
                    ← Back to Address
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={!paymentMethod}
                    className={`px-6 py-3 rounded-lg font-semibold transition
                      ${paymentMethod ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                  >
                    Place Order & Pay →
                  </button>
                </div>
              )}
            </div>

            {currentStep === 3 && (
              <div className="col-span-1 lg:col-span-3 flex justify-center">
                <div className="bg-white p-10 rounded-xl shadow-md border border-gray-100 text-center max-w-lg w-full">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck className="text-green-600 w-10 h-10" />
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Order Placed Successfully 🎉
                  </h2>
                  
                  <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg inline-block mb-4">
                    <span className="font-semibold">Order ID:</span> ORD{Date.now()}
                  </div>

                  <p className="text-gray-600 mb-6">
                    Thank you for shopping with us. Your order has been
                    confirmed and will be shipped within 2-3 business days.
                  </p>

                  <div className="bg-gray-50 p-4 rounded-lg text-left mb-6">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Payment Method:</strong>{" "}
                      <span className="text-green-600 font-semibold">{paymentMethod.toUpperCase()}</span>
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Total Paid:</strong> ₹{total.toFixed(0)}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Shipping to:</strong> {shippingInfo.city}, {shippingInfo.state}
                    </p>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => navigate('/')}
                      className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
                    >
                      Continue Shopping
                    </button>
                    <button
                      onClick={() => navigate('/orders')}
                      className="bg-white text-green-600 border border-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition"
                    >
                      View Order Details
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* RIGHT COLUMN: Order Summary (Real Cart Data) */}
            {currentStep !== 3 && cart.length > 0 && (
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  {/* Order Summary Card */}
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                      Order Summary ({cartCount} items)
                    </h2>

                    {/* Cart Items List */}
                    <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                      {cart.map((item) => (
                        <div
                          key={item._id}

                          className="flex gap-3 pb-4 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="w-16 h-16 bg-gray-200 rounded-md shrink-0 overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-800 line-clamp-2">
                                  {item.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Size: {item.size || 'M'} | Qty: {item.quantity || 1}
                                </p>
                                {item.color && (
                                  <p className="text-xs text-gray-500">
                                    Color: {item.color}
                                  </p>
                                )}
                                <p className="text-sm font-bold text-gray-900 mt-1">
                                  ₹{item.price ? item.price.toLocaleString() : '0'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-gray-700">
                        <span>Subtotal ({cartCount} items)</span>
                        <span className="font-medium">
                          ₹{subtotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Estimated Shipping</span>
                        <span className="font-medium">
                          {subtotal >= freeShippingThreshold ? (
                            <span className="text-green-600">FREE</span>
                          ) : (
                            `₹${estimatedShipping.toLocaleString()}`
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>GST (12%)</span>
                        <span className="font-medium">₹{gst.toFixed(0)}</span>
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount Applied</span>
                          <span className="font-medium">
                            -₹{discount.toFixed(0)}
                          </span>
                        </div>
                      )}

                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between text-lg font-bold text-gray-900">
                          <span>Total Amount</span>
                          <span>₹{total.toFixed(0)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Promo Code */}
                    <div className="mb-6">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Promo Code"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <button
                          onClick={handleApplyPromo}
                          className="px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                      <div className="text-xs">
                        <div className="text-gray-900 font-semibold mb-1">
                          100% SECURE CHECKOUT
                        </div>
                        <div className="text-gray-500">SSL Protected</div>
                      </div>
                      <div className="text-xs">
                        <div className="text-gray-900 font-semibold mb-1">
                          EASY 15-DAY RETURNS
                        </div>
                        <div className="text-gray-500">No Questions Asked</div>
                      </div>
                      <div className="text-xs">
                        <div className="text-gray-900 font-semibold mb-1">
                          FREE SHIPPING
                        </div>
                        <div className="text-gray-500">Over ₹7,000</div>
                      </div>
                    </div>

                    {/* Help Section */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <p className="text-gray-700 mb-3">
                        Need help? Contact Styling Expert
                      </p>
                      <a
                        href="tel:+917378021327"
                        className="text-green-600 font-medium hover:text-green-800"
                      >
                        +91 7378021327
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Empty Cart Message */}
            {currentStep !== 3 && cart.length === 0 && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <div className="text-5xl mb-4">🛒</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-600 mb-6">Please add items to your cart first.</p>
                  <button
                    onClick={() => navigate('/collections')}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};


export default CheckoutPage;