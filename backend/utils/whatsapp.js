import axios from "axios";

export const sendWhatsApp = async (phone) => {
  await axios.post(
    `https://graph.facebook.com/v18.0/${process.env.WA_PHONE_ID}/messages`,
    {
      messaging_product: "whatsapp",
      to: phone,
      type: "text",
      text: { body: "🔥 Early offer unlocked for subscribers!" },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.WA_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
};
