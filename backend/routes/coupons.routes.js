import express from "express";
import Coupon from "../models/coupons.model.js";

const router = express.Router();

/* CREATE */
router.post("/", async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.json(coupon);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* GET ALL */
router.get("/", async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* VALIDATE */
router.get("/validate/:code", async (req, res) => {
  try {
    const coupon = await Coupon.findOne({
      code: req.params.code.toUpperCase(),
      status: "Active",
    });

    if (!coupon) return res.json({ valid: false });

    res.json({
      valid: true,
      discount: coupon.discountValue,
      minSpend: coupon.minSpend,
      type: coupon.type,
    });
  } catch (err) {
    res.status(500).json({ valid: false });
  }
});

/* EDIT COUPON */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* DISABLE COUPON */
router.put("/disable/:id", async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      { status: "Inactive" },
      { new: true }
    );

    res.json(coupon);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* INCREMENT USAGE */
router.put("/use/:code", async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ code: req.params.code.toUpperCase() });

    if (!coupon) return res.status(404).json();

    let [used, total] = coupon.usage.split("/").map(n => parseInt(n));

    coupon.usage = `${used + 1} / ${total}`;
    await coupon.save();

    res.json(coupon);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
