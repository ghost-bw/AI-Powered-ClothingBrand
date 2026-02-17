import cron from "node-cron";
import Subscription from "../models/subscription.model.js";
import { sendEarlyEmail } from "../utils/email.js";
import { sendWhatsApp } from "../utils/whatsapp.js";

cron.schedule("0 9 * * *", async () => {
  const subs = await Subscription.find({ isActive: true });

  for (const user of subs) {
    await sendEarlyEmail(user.email);
    await sendWhatsApp(user.phone);
  }

  console.log("✅ Early offer messages sent");
});
