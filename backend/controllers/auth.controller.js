import User from "../models/user.model.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import { z } from "zod";

/**
 * =========================
 * USER REGISTER
 * =========================
 */
export const signup = async (req, res) => {
  try {
    const schema = z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email"),
      phone: z.string().min(10, "Phone is required"),
      password: z.string().min(6, "Password must be at least 6 characters"),
    });

    // Validate input
    const { name, email, phone, password } = schema.parse(req.body);
    const normalizedEmail = email.toLowerCase().trim();

    // Check existing user
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      name,
      email: normalizedEmail,
      phone,
      password: hashedPassword,
    });

    // Generate JWT
    const token = generateToken({
      id: user._id,
      role: user.role,
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors,
      });
    }
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

/**
 * =========================
 * USER LOGIN
 * =========================
 */
export const login = async (req, res) => {
  try {
    const schema = z.object({
      email: z.string().email("Invalid email"),
      password: z.string().min(6, "Password must be at least 6 characters"),
    });

    // Validate input
    const { email, password } = schema.parse(req.body);
    const normalizedEmail = email.toLowerCase().trim();

    // Find user
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = generateToken({
      id: user._id,
      role: user.role,
    });

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors,
      });
    }
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};
