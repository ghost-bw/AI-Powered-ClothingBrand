import { Gift, Tag, Bell } from "lucide-react";

const InnerCircle = () => {
  return (
    <section className="w-full bg-white py-15 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Heading */}

        <h2 className="allura-regular text-4xl sm:text-5xl lg:text-6xl leading-tight mb-2">
          Join The <span className="text-[#D4AF37]">Inner Circle</span>
        </h2>

        {/* Description */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className=" w-100 h-[1px] bg-[#d6c2a8] mt-4 mb-1"></div>
          <h3 className="cinzel">EXCLUSIVE ACCESS. ELITE BENEFITS.</h3>
          <div className=" w-100 h-[1px] bg-[#d6c2a8] mt-1 mb-4"></div>

          <div className="space-y-5 mt-6">
            {/* Item 1 */}
            <div className="flex items-start gap-4">
              <div className="text-[#c6a76b] mt-1">
                <Gift size={22} strokeWidth={1.5} />
              </div>
              <p className="cormorant-garamond text-black-700 text-sm sm:text-base tracking-wide">
                Early Access to New Collections & Sales
              </p>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-4">
              <div className="text-[#c6a76b] mt-1">
                <Tag size={22} strokeWidth={1.5} />
              </div>
              <p className="cormorant-garamond text-black-700 text-sm sm:text-base tracking-wide">
                Special Members-Only Offers
              </p>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-4">
              <div className="text-[#c6a76b] mt-1">
                <Bell size={22} strokeWidth={1.5} />
              </div>
              <p className="cormorant-garamond text-black-700 text-sm sm:text-base tracking-wide">
                Personalized Updates & Style Tips
              </p>
            </div>
          </div>
        </div>
        {/* Email Box */}
        <div className="flex items-center justify-center gap-6 my-6">
          <div className="w-16 sm:w-24 h-[1px] bg-[#d6c2a8]"></div>

          <span className="text-xs tracking-[0.3em] text-gray-500 uppercase whitespace-nowrap">
            SIGN UP WITH YOUR EMAIL
          </span>

          <div className="w-16 sm:w-24 h-[1px] bg-[#d6c2a8]"></div>
        </div>

        <div className="flex justify-center mt-2">
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
              className="bg-[#1f1f1f] 
             text-white 
             px-8 sm:px-10 
             py-4
             text-sm tracking-wider uppercase
             rounded-r-2xl
             transition-all duration-300
             hover:bg-black cursor-pointer"
            >
              Join Now
            </button>
          </div>
        </div>
        <div className="w-70 h-[1px] bg-[#ffd59e] mt-4 mb-4 mx-auto"></div>

        {/* Bottom Note */}
        <div className=" cormorant-garamond mt-8 text-center">
          <p className=" text-gray-500 tracking-wide">
            Stay Connected with Exclusive Perks & Insights
          </p>

          <p className=" text-gray-400 tracking-widest mt-1">
            Unsubscribe Anytime • 100% Privacy Guaranteed
          </p>
        </div>
      </div>
    </section>
  );
};

export default InnerCircle;