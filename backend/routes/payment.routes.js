import express from "express";
import { razorpay } from "../config/razorpay.js";

const router = express.Router();

router.post("/create-order", async (req,res)=>{

  const { total } = req.body;

  const options = {
    amount: total * 100,
    currency: "INR",
    receipt: `order_${Date.now()}`
  };

  const order = await razorpay.orders.create(options);

  res.json(order);
});

export default router;
