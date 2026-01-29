import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        // Store JWT in localStorage
        localStorage.setItem("token", data.token);
        navigate("/admin/dashboard");
      } else {
        alert(data.message); // Invalid credentials
      }
    } catch (err) {
      alert("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`${provider} login coming soon`);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#FAFAF7]">
      {/* LEFT SIDE */}
      <div className="relative hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1520975698519-59c1e6d46f6b?q=80&w=1200"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />
        <div className="relative z-10 h-full flex flex-col justify-end p-14 text-white">
          <h1 className="text-4xl font-serif font-semibold">Elegance is an attitude.</h1>
          <p className="mt-4 max-w-sm text-sm">
            Join our exclusive community of curators and define your signature style.
          </p>
        </div>
        <div className="absolute top-8 left-10 text-white font-semibold">Graphura</div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-[#2F2C79]">Welcome back</h2>
          <p className="text-sm text-gray-500 mt-1">Sign in to continue</p>

          {/* Tabs */}
          {/* <div className="mt-6 flex bg-[#F1F2F4] rounded-full p-1 text-sm"> */}
            {/* <button
              onClick={() => navigate("/admin/login")}
              className="flex-1 bg-white rounded-full py-2 shadow text-[#2F2C79]"
            >
              Password
            </button> */}
            {/* <button
              onClick={() => navigate("/admin/otp")}
              className="flex-1 text-gray-500 hover:text-black"
            >
              OTP Login
            </button> */}
          {/* </div> */}

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border px-4 py-2"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-4 py-2"
              required
            />
            <button
              disabled={loading}
              className="w-full bg-[#2F2C79] text-white py-3 rounded-lg"
            >
              {loading ? "Signing in..." : "SIGN IN"}
            </button>
          </form>

          {/* Social Login */}
          {/* <div className="my-6 text-center text-xs text-gray-400">OR CONTINUE WITH</div>
          <div className="flex gap-3">
            <button onClick={handleSocialLogin} className="flex-1 border rounded-lg py-2">
              Google
            </button>
            <button onClick={handleSocialLogin} className="flex-1 border rounded-lg py-2">
              Apple
            </button>
          </div> */}

          {/* <p className="text-xs text-center mt-6 text-gray-500">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/admin/signup")}
              className="text-[#2F2C79] cursor-pointer"
            >
              Sign Up
            </span>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
