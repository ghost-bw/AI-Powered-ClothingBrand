import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import leftImage from "../../assets/Login/leftimage.webp";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/admin/login"||"http://localhost:4000/api/admin",
        { email, password },
        { withCredentials: true }
      );

        if (res.data.token) {
          localStorage.setItem("admin_token", res.data.token);
          // console.log("SAVED TOKEN:", localStorage.getItem("admin_token"));

          localStorage.setItem("graphura_admin", "true");
        navigate("/admin/dashboard");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#FAFAF7]">

      {/* LEFT IMAGE */}
      <div className="relative hidden md:block h-screen w-full overflow-hidden">
        <img
          src={leftImage}
          alt="Login Banner"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />

        <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-14 text-white">
          <h1 className="text-2xl md:text-4xl font-serif font-semibold">
            Elegance is an attitude.
          </h1>
          <p className="mt-4 max-w-sm text-sm">
            Join our exclusive community of curators and define your signature
            style.
          </p>
        </div>

        <div className="absolute top-8 left-10 text-white font-semibold">
          Graphura
        </div>
      </div>

      {/* RIGHT LOGIN */}
      <div className="flex items-center justify-center px-4 sm:px-6 py-10">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-6 sm:p-8">

          <h2 className="text-2xl font-semibold text-[#2F2C79]">
            Admin
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to continue
          </p>

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F2C79]"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F2C79]"
              required
            />

            {error && (
              <p className="text-sm text-red-500 text-center">
                {error}
              </p>
            )}

            <button
              disabled={loading}
              className="w-full bg-[#2F2C79] text-white py-3 rounded-lg text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Signing in..." : "SIGN IN"}
            </button>
          </form>

      

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
