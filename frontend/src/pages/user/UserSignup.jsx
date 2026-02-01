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
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  password: "",
});


  const handleSignup = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await API.post("/users/signup", {
      name,
      email,
      phone: formData.phone,
      password,
    });

    alert("Signup successful! Please login.");
    navigate("/user/login");

  } catch (error) {
    console.log("FULL ERROR:", error.response?.data);
    alert(error.response?.data?.message || "Signup failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-2xl bg-white">

        {/* LEFT - INFO */}
        <div className="w-full md:w-1/2 bg-gray-800 text-white flex flex-col justify-center items-center text-center p-8 md:p-10">
          <h2 className="text-3xl font-bold mb-4">
            Welcome!
          </h2>
          <p className="text-sm opacity-90 leading-relaxed">
            Create your account and start your journey with us.
          </p>
        </div>

        {/* RIGHT - FORM */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Sign Up
          </h2>

          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-4 px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
              required
            />

           <input
                  type="text"
                  placeholder="Phone"
                  value={formData.phone}
                   className="mb-6 px-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
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
              {loading ? "Signing up..." : "Register"}
            </button>
          </form>

          <div className="mt-4 flex justify-center">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const res = await API.post("/users/google", {
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
          </div>

          <p className="text-sm mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <span
              className="text-gray-900 font-medium cursor-pointer"
              onClick={() => navigate("/user/login")}
            >
              Login
            </span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default UserSignup;
