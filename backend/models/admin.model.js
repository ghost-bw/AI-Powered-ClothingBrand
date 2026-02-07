import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
 {
  email: {
   type: String,
   required: true,
   unique: true,
   lowercase: true,
   trim: true
  },

  password: {
   type: String,
   required: true,
   minlength: 6
  },

  avatar: {
   type: String,
   default: ""
  },

  role: {
   type: String,
   default: "admin",
   immutable: true
  }
 },
 { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
