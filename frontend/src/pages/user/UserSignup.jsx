import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import API from "../../api/axios";

const UserSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful! Please login.");
        navigate("/user/login");
      } else {
        alert(data.message || "Signup failed");
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
        <h2 className="text-xl mb-4 font-semibold">Create Account</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-4 py-2 w-full rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-4 py-2 w-full rounded"
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
          <GoogleLogin
    onSuccess={async (credentialResponse) => {
      try {
        const res = await API.post("/auth/google", {
          token: credentialResponse.credential,
        });

        localStorage.setItem("token", res.data.token);
        navigate("/");
      } catch (err) {
        alert("Google signup failed");
      }
    }}
    onError={() => alert("Google signup failed")}
  />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2F2C79] text-white py-2 rounded"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-[#2F2C79] cursor-pointer"
            onClick={() => navigate("/user/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
