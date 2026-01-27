import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/admin.model.js";
import { hashPassword } from "../utils/hash.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "admin@graphura.com";

    const exists = await Admin.findOne({ email });
    if (exists) {
      console.log("❌ Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await hashPassword("Admin@123");

    await Admin.create({
      email,
      password: hashedPassword,
    });

    console.log("✅ Admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
