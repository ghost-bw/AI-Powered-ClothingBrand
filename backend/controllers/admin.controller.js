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

export const getAdminProfile = async (req, res) => {
 try {

  console.log("ADMIN USER:", req.user);   // TEMP DEBUG

  const admin = await Admin.findById(req.user._id || req.userId).select("-password");

  res.json(admin);

 } catch (err) {
  console.log("PROFILE ERROR:", err);
  res.status(500).json({ message: err.message });
 }
};


export const updateAdminEmail = async (req, res) => {
 try {

  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email required" });

  // Check if email belongs to another admin
  const exists = await Admin.findOne({
   email,
   _id: { $ne: req.user._id }
  });

  if (exists)
   return res.status(400).json({ message: "Email already in use" });

  const admin = await Admin.findByIdAndUpdate(
   req.user._id,
   { email },
   { new: true }
  );

  res.json({
   success: true,
   email: admin.email
  });

 } catch (err) {
  console.log("EMAIL UPDATE ERROR:", err);
  res.status(500).json({ message: err.message });
 }
};


export const updateAdminPassword = async (req, res) => {
 try {

  const { password } = req.body;

  if (!password) {
   return res.status(400).json({ message: "Password required" });
  }

  const hashed = await hashPassword(password);

  await Admin.findByIdAndUpdate(req.user._id, {
   password: hashed,
  });

  res.json({ success: true });

 } catch (err) {
  console.log("PASSWORD UPDATE ERROR:", err);
  res.status(500).json({ message: err.message });
 }
};

export const updateAdminAvatar = async (req, res) => {
 try {

  if (!req.file) {
   return res.status(400).json({ message: "No avatar uploaded" });
  }

  // Cloudinary gives secure URL here
  const avatar = req.file.path;

  const admin = await Admin.findByIdAndUpdate(
   req.user._id,
   { avatar },
   { new: true }
  ).select("-password");

  res.json({
   success: true,
   avatar: admin.avatar
  });

 } catch (err) {
  console.log("ADMIN AVATAR ERROR:", err);
  res.status(500).json({ message: err.message });
 }
};


