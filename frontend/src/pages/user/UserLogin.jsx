import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import API from "../../api/axios";

export default function UserLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl bg-white">

        {/* LEFT - FORM */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Login
          </h2>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-6 px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-gray-800 text-white py-2 rounded w-full hover:bg-gray-700 transition"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="mt-4 flex justify-center">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const res = await API.post("/auth/google", {
                    token: credentialResponse.credential,
                  });

                  localStorage.setItem("token", res.data.token);
                  navigate("/");
                } catch (err) {
                  console.error(err);
                  alert("Google login failed");
                }
              }}
              onError={() => alert("Google Login Failed")}
            />
          </div>

          <p className="text-sm mt-4 text-center text-gray-600">
            Don’t have an account?{" "}
            <span
              className="text-gray-900 font-medium cursor-pointer"
              onClick={() => navigate("/user/signup")}
            >
              Sign up
            </span>
          </p>
        </div>

        {/* RIGHT - INFO */}
        <div className="w-full md:w-1/2 bg-gray-800 text-white flex flex-col justify-center items-center text-center p-8 md:p-10">
          <h2 className="text-3xl font-bold mb-4">
            Welcome Back
          </h2>
          <p className="text-sm opacity-90 leading-relaxed">
            Login to access your dashboard and manage your account.
          </p>
        </div>

      </div>
    </div>
  );
}
