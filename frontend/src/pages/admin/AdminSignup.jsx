import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import leftBlue from "../../assets/Login/userlogin.webp";
import logo from "../../assets/logo/logoWhite.webp";
import leftImage from "../../assets/Login/leftnew.webp";
import axios from "axios";


const AdminSignup = () => {
  const navigate = useNavigate();


  // ===== LOGIC (UNCHANGED) =====
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
  "http://localhost:4000/api/admin/signup",
  { email, password }
);




      const token =
  res.data.token ||
  res.data.admin?.token ||
  res.data.data?.token;

console.log("SIGNUP TOKEN:", token);

if (token) {
  localStorage.setItem("admin_token", token);
  localStorage.setItem("graphura_admin", "true");
  navigate("/admin/dashboard");
} else {
  setError("Token not received from server");
}

    } catch (err) {
      const errorMsg = err.response?.data?.message || "Server error. Please try again.";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#FAFAF7]">

      {/* LEFT IMAGE */}
      <div className="relative hidden md:flex h-screen w-full overflow-hidden">
        <img
          src={leftBlue}
          alt="Signup Banner"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />

        <div className="relative z-10 h-full w-full flex flex-col justify-between px-8 py-8 text-white">
          <div>
            <img
              src={logo}
              alt="Graphura Logo"
              className="h-12 w-auto"
            />
          </div>

          <div>
            <h1 className="text-xl md:text-3xl font-serif font-semibold">
              Elegance is an attitude.
            </h1>
            <p className="mt-3 max-w-xs text-sm opacity-90">
              Join our exclusive community of curators and define your signature style.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIGNUP CARD */}
      <div className="flex h-screen items-center justify-center px-4 sm:px-6">
        <div
          className="w-full max-w-md bg-white rounded-2xl px-8 py-10"
          style={{
            boxShadow: "0 16px 40px rgb(128,128,128)",
          }}
        >
          <h2 className="text-2xl font-semibold text-black">
            Create account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Join Graphura and curate your luxury wardrobe.
          </p>

<form className="mt-6 space-y-4" onSubmit={handleSignup}>

            {/* EMAIL */}
            <div>
              <label className="text-xs font-medium tracking-wide text-gray-600">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl text-sm bg-[#ECEFF4] focus:outline-none"
                required
                style={{
                  boxShadow: `
                    6px 6px 14px rgba(160,160,160,0.9),
                    -6px -6px 14px rgba(255,255,255,1),
                    inset 2px 2px 4px rgba(160,160,160,0.6),
                    inset -2px -2px 4px rgba(255,255,255,0.9)
                  `,
                }}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-xs font-medium tracking-wide text-gray-600">
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="Password (min 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-2xl text-sm bg-[#ECEFF4] focus:outline-none"
                style={{
                  boxShadow: `
                    6px 6px 14px rgba(160,160,160,0.9),
                    -6px -6px 14px rgba(255,255,255,1),
                    inset 2px 2px 4px rgba(160,160,160,0.6),
                    inset -2px -2px 4px rgba(255,255,255,0.9)
                  `,
                }}
              />
            </div>
             <div>
              <label className="text-xs font-medium tracking-wide text-gray-600">
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-2xl text-sm bg-[#ECEFF4] focus:outline-none"
                style={{
                  boxShadow: `
                    6px 6px 14px rgba(160,160,160,0.9),
                    -6px -6px 14px rgba(255,255,255,1),
                    inset 2px 2px 4px rgba(160,160,160,0.6),
                    inset -2px -2px 4px rgba(255,255,255,0.9)
                  `,
                }}
              />
            </div>

            {/* SIGN UP BUTTON */}
            <button
              type="submit"
                   disabled={loading}
              className="w-full mt-2 bg-black text-white py-3 rounded-3xl text-sm font-medium hover:opacity-90 transition active:scale-95"
            >
          {loading ? "Signing up..." : "SIGN UP"}
            </button>
          </form>

          {/* FOOTER */}
          <p className="mt-6 text-xs text-center text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/admin/login")}
              className="text-[#2F2C79] font-medium cursor-pointer hover:underline"
            >
              SIGN IN
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;