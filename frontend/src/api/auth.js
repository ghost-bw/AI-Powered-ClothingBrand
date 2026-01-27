import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api", // backend URL
});

export const loginUser = (data) => API.post("/auth/login", data);
