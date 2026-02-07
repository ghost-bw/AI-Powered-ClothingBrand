import dotenv from "dotenv";
dotenv.config();

import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

/* Cloudinary Storage */
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "tryon/users",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* TRY ON ROUTE */
router.post("/tryon", upload.single("user"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "User image missing" });
    }

    const userImage = req.file.path;     // Cloudinary URL
    const clothImage = req.body.cloth;  // Product URL

    if (!clothImage) {
      return res.status(400).json({ message: "Cloth image missing" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp-image-generation",
    });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: Buffer.from(
            await fetch(userImage).then(r => r.arrayBuffer())
          ).toString("base64"),
        },
      },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: Buffer.from(
            await fetch(clothImage).then(r => r.arrayBuffer())
          ).toString("base64"),
        },
      },
      {
        text: `
Virtual clothing try-on.

Put this garment on the person.
Match body pose and proportions.
Align shoulders and torso.
Add fabric wrinkles.
Add soft shadows.
Blend edges smoothly.
Keep face unchanged.
Photorealistic fashion result.
        `,
      },
    ]);

    const image =
      result.response.candidates[0].content.parts[0].inlineData.data;

    res.json({
      success: true,
      image,
    });

  } catch (err) {
    console.error("TRYON ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
