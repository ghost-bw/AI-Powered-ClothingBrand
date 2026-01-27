import Herobg from '../../../src/assets/Home/Hero-bg.webp'

const Hero = () => {
  return (
    <section className="px-4 sm:px-8 lg:px-14 py-6">
      <div
        className="
          relative
          h-[70vh] sm:h-[80vh] lg:h-[85vh]
          rounded-2xl lg:rounded-3xl
          bg-cover bg-center
          flex items-center justify-center
          overflow-hidden
        "
        style={{ backgroundImage: `url(${Herobg})` }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* content */}
        <div className="relative text-center text-white px-4 max-w-3xl">
          <h1
            className="
              font-serif
              text-3xl sm:text-5xl lg:text-7xl
              mb-4
            "
          >
            Modern Heritage
          </h1>

          <p
            className="
              text-xs sm:text-sm
              tracking-widest
              uppercase
              text-white/90
              mb-6
            "
          >
            Redefining Indian luxury for the modern wardrobe
          </p>

          <button
          onClick={() => window.location.href = '/collections'}
            className="
              bg-indigo-600 hover:bg-indigo-700
              transition
              px-6 py-3
              rounded-full
              text-xs sm:text-sm
              font-medium
            "
          >
            SHOP NEW ARRIVALS
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
