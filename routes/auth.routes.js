import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);  // ✅ use directly
router.post("/login", login);        // ✅ use directly

export default router;

