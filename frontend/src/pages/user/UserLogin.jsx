import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import API from "../../api/axios";

const UserLogin = () => {
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
        // Save JWT token
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
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7]">
      <div className="p-8 bg-white shadow rounded-xl w-full max-w-md">
        <h2 className="text-xl mb-4 font-semibold">User Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-4 py-2 w-full rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-4 py-2 w-full rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2F2C79] text-white py-2 rounded"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-4 text-center">
          Don’t have an account?{" "}
          <span
            className="text-[#2F2C79] cursor-pointer"
            onClick={() => navigate("/user/signup")}
          >
            Sign Up
          </span>
        </p>

    
<GoogleLogin
  onSuccess={async (credentialResponse) => {
    try {
      const res = await API.post("/auth/google", {
        token: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);

      // 🔥 React router redirect
      navigate("/");

    } catch (err) {
      console.error(err);
      alert("Google login failed");
    }
  }}
  onError={() => alert("Google Login Failed")}
/>
  </div>
    </div>
  );
};



export default UserLogin;