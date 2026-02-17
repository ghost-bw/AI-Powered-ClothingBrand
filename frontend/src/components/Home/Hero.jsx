
import Herobg from "../../../src/assets/Home/Heronew.webp";
import GradientButton from "../lightswind/gradient-button";
import ShinyText from "../lightswind/shiny-text";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div
        className="
          relative
          w-full
          h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh]
          bg-cover bg-center
          flex items-center justify-start
          overflow-hidden
          shadow-lg
        "
        style={{ backgroundImage: `url(${Herobg})` }}
      >
        {/* overlay */}

 
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent pointer-events-none"></div>

        {/* content */}
        <div className="relative text-center text-white px-6 sm:px-10 lg:px-16 max-w-2xl lg:max-w-3xl">
          <h1 className="font-serif mb-3 sm:mb-4">
            <ShinyText
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif"
              baseColor="rgba(255, 255, 255, 0.95)"
              shineColor="rgba(255, 215, 160, 1)"
              speed={5}
            >
              Modern Heritage
            </ShinyText>
          </h1>

          <p
            className="

              text-xs text-center sm:text-sm md:text-base
              tracking-wider sm:tracking-widest
              uppercase
              text-white/90
              mb-4 sm:mb-6
            "
          >
            Redefining Indian luxury for the modern wardrobe
          </p>

          <div className="flex justify-center">
            <GradientButton
              onClick={() => navigate("/collections")}
              className="
                bg-linear-to-r from-indigo-600 to-purple-600 
                hover:from-indigo-700 hover:to-black
                transition-all duration-300
                transform hover:scale-105
                px-5 py-2 sm:px-6 sm:py-3
                rounded-full
                text-xs sm:text-sm md:text-base
                font-medium
                cursor-pointer
                shadow-lg hover:shadow-xl
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
              "
            >
              SHOP NEW ARRIVALS
            </GradientButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
