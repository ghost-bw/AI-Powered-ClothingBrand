import express from "express";
import { adminSignup, adminLogin } from "../controllers/admin.controller.js";
import  protect  from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);

// Example protected admin route
router.get("/admin/dashboard", protect, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin Dashboard" });
});


export default router;
