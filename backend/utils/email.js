import nodemailer from "nodemailer";
import Subscription from "../models/subscription.model.js";

/* ---------- SINGLE TRANSPORTER ---------- */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ---------- EARLY SUBSCRIBE EMAIL ---------- */
export const sendEarlyEmail = async (email) => {
  const html = `
    <h1>Welcome to the Inner Circle ✨</h1>

    <p>
      You now have early access to exclusive drops,
      limited collections, and private offers.
    </p>

    <p>
      Stay ready — something special is coming.
    </p>

    <hr />

    <p style="font-size:12px;color:gray;">
      You received this because you subscribed on our website.
    </p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Welcome to Inner Circle 🎉",
    html,
  });
};


/* ---------- NEW PRODUCT ALERT ---------- */
export const notifySubscribersNewProduct = async (product) => {
  const users = await Subscription.find();

  const html = `
    <h1>🔥 New Drop Just Landed</h1>
    <h2>${product.name}</h2>
    <p>Price: ₹${product.discountPrice}</p>

    <a href="https://yourwebsite.com/product/${product.slug}"
       style="padding:12px 20px;background:black;color:white;text-decoration:none;">
       Shop Now
    </a>
  `;

  for (const user of users) {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "New Product Alert 🚀",
      html,
    });
  }
};
