
// import React, { useState } from "react";

// const InnerCircle = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubscribe = (e) => {
//     e.preventDefault();

//     if (!email) {
//       setMessage("Please enter your email address");
//       return;
//     }

//     if (!/\S+@\S+\.\S+/.test(email)) {
//       setMessage("Please enter a valid email");
//       return;
//     }

//     setMessage("✨ Welcome to the Inner Circle!");
//     setEmail("");
//   };

//   return (
//     <section className="relative w-full py-10 overflow-hidden">
//       {/* ===== BACKGROUND ===== */}
//       <div className="absolute inset-0 bg-linear-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]" />

//       {/* Floating Glow Orbs */}
//       <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
//       <div className="absolute top-1/3 -right-32 w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl animate-pulse delay-300" />

//       {/* ===== CONTENT ===== */}
//       <div className="relative z-10 max-w-5xl mx-auto px-4">
//         <div className="
//           relative
//           bg-white/10 backdrop-blur-xl
//           border border-white/20
//           rounded-3xl
//           px-6 sm:px-12 py-16
//           text-center
//           shadow-2xl
//           transition-all duration-500
//           hover:shadow-indigo-500/30
//         ">
//           {/* Badge */}
//           <div className="inline-block mb-4 px-5 py-1 rounded-full text-xs tracking-widest text-indigo-200 border border-indigo-300/30">
//             EXCLUSIVE ACCESS
//           </div>

//           {/* Heading */}
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-white">
//             Join the Inner Circle
//           </h2>

//           {/* Subtext */}
//           <p className="mt-6 text-sm sm:text-base text-white/80 max-w-xl mx-auto leading-relaxed">
//             Early access to limited drops, private stories, and members-only
//             privileges — curated for those who value modern luxury.
//           </p>

//           {/* FORM */}
//           <form
//             onSubmit={handleSubscribe}
//             className="mt-12 flex flex-col items-center gap-6"
//           >
//             <div className="relative w-full max-w-md">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Enter your email"
//                 className="
//                   w-full
//                   px-6 py-4
//                   rounded-full
//                   bg-white/90
//                   text-sm
//                   text-gray-900
//                   outline-none
//                   focus:ring-2 focus:ring-indigo-400
//                   transition
//                 "
//               />

//               {/* Glow on focus */}
//               <span className="absolute inset-0 rounded-full ring-2 ring-indigo-400/30 opacity-0 focus-within:opacity-100 transition pointer-events-none"></span>
//             </div>

//             <button
//               type="submit"
//               className="
//                 px-12 py-4
//                 rounded-full
//                 bg-linear-to-r from-indigo-500 to-purple-600
//                 text-white
//                 text-sm
//                 font-semibold
//                 tracking-widest
//                 shadow-lg shadow-indigo-500/40
//                 hover:scale-105
//                 hover:shadow-xl
//                 active:scale-95
//                 transition-all duration-300
//               "
//             >
//               JOIN NOW
//             </button>

//             {/* Message */}
//             {message && (
//               <p className="text-sm mt-2 text-indigo-200 font-medium animate-fade-in">
//                 {message}
//               </p>
//             )}
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default InnerCircle;




import React, { useState } from "react";

const InnerCircle = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage("Please enter a valid email");
      return;
    }

    setMessage("✨ Welcome to the Inner Circle");
    setEmail("");
  };

  return (
    <section className="relative w-full py-10 bg-white overflow-hidden">

      {/* SILK LIGHT ANIMATION */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/3 w-[600px] h-[600px] bg-black/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-black/10 rounded-full blur-[140px] animate-pulse delay-300" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div
          className="
            relative
            bg-white/70
            backdrop-blur-2xl
            border border-black/10
            rounded-[3rem]
            px-8 sm:px-14 py-10
            text-center
            shadow-[0_40px_120px_-30px_rgba(0,0,0,0.25)]
            transition-all duration-700
            hover:shadow-[0_60px_160px_-40px_rgba(0,0,0,0.35)]
          "
        >
          {/* TOP LINE */}
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-6">
            Invitation Only
          </p>

          {/* TITLE */}
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-gray-900">
            The Inner Circle
          </h2>

          {/* DIVIDER */}
          <div className="mx-auto mt-6 mb-8 h-px w-24 bg-black/20" />

          {/* DESCRIPTION */}
          <p className="max-w-xl mx-auto text-gray-600 text-sm sm:text-base leading-relaxed">
            Private access to limited drops, early releases and stories reserved
            for those who appreciate modern heritage and quiet luxury.
          </p>

          {/* FORM */}
          <form
            onSubmit={handleSubscribe}
            className="mt-14 flex flex-col items-center gap-6"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="
                w-full max-w-md
                px-7 py-4
                rounded-full
                bg-white
                border border-black/20
                text-sm
                outline-none
                focus:border-black
                focus:ring-1 focus:ring-black
                transition
              "
            />

            <button
              type="submit"
              className="
                px-14 py-4
                rounded-full
                bg-black
                text-white
                text-xs
                tracking-[0.25em]
                uppercase
                hover:scale-105
                active:scale-95
                transition-all duration-300
              "
            >
              Request Access
            </button>

            {message && (
              <p className="text-sm text-gray-700 animate-fade-in">
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default InnerCircle;
