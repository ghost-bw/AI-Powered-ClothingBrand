import axios from "axios";

// Create an Axios instance
const API = axios.create({
  baseURL: "http://localhost:4000/api", // your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});
// await API.post("/products", formData);

// Attach JWT token to requests automatically if present in localStorage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // JWT stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---------------- Auth APIs ---------------- //

// Login a user/admin
export const loginUser = async (data) => {
  try {
    const response = await API.post("/auth/login", data);
    // Save token in localStorage
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Register a new user/admin
export const registerUser = async (data) => {
  try {
    const response = await API.post("/auth/register", data);
    // Save token in localStorage
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get currently logged-in user info
export const getUserProfile = async () => {
  try {
    const response = await API.get("/auth/me");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("token");
};

export default API;
