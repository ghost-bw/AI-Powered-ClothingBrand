import express from "express";
import { signup, login } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Example protected route
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "User profile",
    user: req.user
  });
});

export default router;
