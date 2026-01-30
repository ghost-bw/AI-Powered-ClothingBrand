import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { getMe, getMyOrders } from "../controllers/userdashboard.controller.js";
import {
  getAddresses,
  saveAddress,
  deleteAddress,
  getOrderDetails
} from "../controllers/userdashboard.controller.js";
import {
  getInvoices,
  downloadInvoice,
} from "../controllers/userdashboard.controller.js";


const router = express.Router();

router.get("/invoices", protect, getInvoices);
router.get("/invoices/:id/download", protect, downloadInvoice);
router.get("/orders/:id", protect, getOrderDetails);





/* ADDRESS */

router.get("/addresses", protect, getAddresses);
router.post("/addresses", protect, saveAddress);
router.put("/addresses/:id", protect, saveAddress);
router.delete("/addresses/:id", protect, deleteAddress);



/* PROFILE */
router.get("/me", protect, getMe);

/* ORDERS */
router.get("/orders", protect, getMyOrders);

/* NOTIFICATIONS (optional) */
router.get("/notifications", protect, (req, res) => {
  res.json({
    success: true,
    notifications: [
      "📦 Order out for delivery",
      "💳 Payment successful",
    ],
  });
});

export default router;
