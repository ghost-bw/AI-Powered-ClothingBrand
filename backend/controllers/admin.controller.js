import Admin from "../models/admin.model.js";
import { generateToken } from "../utils/jwt.js";
import { hashPassword, comparePassword } from "../utils/hash.js";

// export const adminSignup = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const exists = await Admin.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ message: "Admin already exists" });
//     }

//     const hashedPassword = await hashPassword(password);

//     const admin = await Admin.create({
//       email,
//       password: hashedPassword
//     });

//     const token = generateToken({
//       id: admin._id,
//       role: admin.role
//     });

//     res.status(201).json({
//       message: "Admin created successfully",
//       token
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Signup failed", error: err.message });
//   }
// };

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      id: admin._id,
      role: admin.role
    });

    res.json({
      message: "Login successful",
      token
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
