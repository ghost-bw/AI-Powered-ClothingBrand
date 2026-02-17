import { Gift, Tag, Bell, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import API from "../../api/axios";



const InnerCircle = () => {
  const [email, setEmail] = useState("");
const handleSubscribe = async () => {
  if (!email) {
    alert("Please enter email");
    return;
  }

  try {
    const res = await axios.post("http://localhost:4000/api/subscribe", {
      email,
      phone: "0000000000",
    });

    alert(res.data.message);
    setEmail("");
  } catch (err) {
    alert("Subscription failed ❌");
  }
};

return (
    <section className="w-full bg-white py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Heading */}
        <h2 className="allura-regular text-3xl sm:text-5xl lg:text-6xl leading-tight mb-2 px-2">
          Join The <span className="text-[#D4AF37]">Inner Circle</span>
        </h2>

        {/* Description */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="w-32 sm:w-72 lg:w-100 h-[1px] bg-[#d6c2a8] mt-4 mb-1"></div>

          <h3 className="cinzel text-xs sm:text-sm tracking-widest">
            EXCLUSIVE ACCESS. ELITE BENEFITS.
          </h3>

          <div className="w-32 sm:w-72 lg:w-100 h-[1px] bg-[#d6c2a8] mt-1 mb-4"></div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mt-6 text-left">
            {/* Item 1 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="text-[#c6a76b] mt-1 shrink-0">
                <Gift size={20} strokeWidth={1.5} />
              </div>
              <p className="cormorant-garamond text-gray-700 text-sm sm:text-base tracking-wide">
                Early Access to New Collections & Sales
              </p>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="text-[#c6a76b] mt-1 shrink-0">
                <Tag size={20} strokeWidth={1.5} />
              </div>
              <p className="cormorant-garamond text-gray-700 text-sm sm:text-base tracking-wide">
                Special Members-Only Offers
              </p>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="text-[#c6a76b] mt-1 shrink-0">
                <Bell size={20} strokeWidth={1.5} />
              </div>
              <p className="cormorant-garamond text-gray-700 text-sm sm:text-base tracking-wide">
                Personalized Updates & Style Tips
              </p>
            </div>

            {/* Item 4 */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="text-[#c6a76b] mt-1 shrink-0">
                <Truck size={20} strokeWidth={1.5} />
              </div>
              <p className="cormorant-garamond text-gray-700 text-sm sm:text-base tracking-wide">
                Free Shipping on Exclusive Member Orders
              </p>
            </div>
          </div>
        </div>

        {/* Email Label */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 my-6 px-2">
          <div className="w-10 sm:w-24 h-[1px] bg-[#d6c2a8]"></div>

          <span className="text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] text-gray-500 uppercase whitespace-nowrap">
            SIGN UP WITH YOUR EMAIL
          </span>

          <div className="w-10 sm:w-24 h-[1px] bg-[#d6c2a8]"></div>
        </div>

        {/* Email Box */}
        <div className="flex justify-center mt-2 px-2">
          <div
            className="flex items-center 
            w-full max-w-xl
            bg-white
            rounded-2xl
            border border-[#e5ded2]
            shadow-[0_10px_30px_rgba(0,0,0,0.38)]
            overflow-hidden"
          >
            {/* Input */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 
              text-sm sm:text-base
              bg-transparent
              outline-none
              text-gray-700
              placeholder-gray-400"
            />

            {/* Button */}
            <button
              onClick={handleSubscribe}
              className="bg-[#1f1f1f] 
              text-white 
              px-8 sm:px-10 
              py-4
              text-sm tracking-wider uppercase
              hover:bg-black cursor-pointer"
            >
              Subscribe Now
            </button>
          </div>
        </div>

        <div className="w-24 sm:w-48 lg:w-70 h-[1px] bg-[#ffd59e] mt-6 mb-4 mx-auto"></div>

        {/* Bottom Note */}
        <div className="cormorant-garamond mt-6 sm:mt-8 text-center px-4">
          <p className="text-gray-500 tracking-wide text-sm sm:text-lg">
            Stay Connected with Exclusive Perks & Insights
          </p>

          <p className="text-gray-600 tracking-widest mt-1 text-sm sm:text-lg">
            Unsubscribe Anytime • 100% Privacy Guaranteed
          </p>
        </div>
      </div>
    </section>
  );
};

export default InnerCircle;
