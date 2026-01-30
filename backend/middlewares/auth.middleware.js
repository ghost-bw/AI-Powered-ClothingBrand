import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

console.log("Auth middleware loaded");

 const protect = async (req, res, next) => {

 console.log("---- PROTECT MIDDLEWARE HIT ----");

 const authHeader = req.headers.authorization;

 if (!authHeader || !authHeader.startsWith("Bearer ")) {
  return res.status(401).json({ message: "No token provided" });
 }

 const token = authHeader.split(" ")[1];

 try {

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 🔥 LOAD REAL USER FROM DB
  const user = await User.findById(decoded._id).select("-password");

  if (!user) {
   return res.status(401).json({ message: "User not found in database" });
  }

  req.user = user;   // FULL MONGO USER DOCUMENT

  console.log("REQ.USER FINAL:", req.user._id.toString());

  next();

 } catch (error) {
  console.log("JWT ERROR:", error.message);
  return res.status(401).json({ message: "Invalid or expired token" });
 }
};

export default protect;