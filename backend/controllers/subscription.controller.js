import Subscription from "../models/subscription.model.js";
import { sendEarlyEmail } from "../utils/email.js";

export const subscribeUser = async (req, res) => {
  try {
    const { email, phone } = req.body;

    const existing = await Subscription.findOne({ email });

    if (existing) {
      return res.json({
        message: "Already subscribed ✅",
        already: true,
      });
    }

    // ✅ new subscriber
    const sub = await Subscription.create({ email, phone });

    await sendEarlyEmail(email); // only for new users

    res.json({
      message: "Welcome to Inner Circle 🎉",
      already: false,
      sub,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Subscription failed ❌" });
  }
};
