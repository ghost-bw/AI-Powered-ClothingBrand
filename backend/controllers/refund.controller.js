import RefundRequest from "../models/RefundRequest.model.js";
import Order from "../models/order.model.js";
import Notification from "../models/Notification.model.js";

export const createRefundRequest = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { type, bankDetails } = req.body;

    /* ===== 1. Find Order ===== */
    const order = await Order.findById(orderId);
    if (!order)
      return res.status(404).json({ message: "Order not found" });

    /* ===== 2. Block COD Orders ===== */
    if (order.paymentMethod === "cod") {
      return res.status(400).json({
        message: "COD orders do not require refund details",
      });
    }

    /* ===== 3. Prevent Duplicate Requests ===== */
    const alreadyRequested = await RefundRequest.findOne({
      order: orderId,
    });

    if (alreadyRequested) {
      return res.status(400).json({
        message: "Refund request already submitted for this order",
      });
    }

    /* ===== 4. Update Order Status ===== */
    order.status = type === "cancel" ? "Cancelled" : "Returned";
    await order.save();

    /* ===== 5. Create Refund Request ===== */
    await RefundRequest.create({
      user: req.user._id,
      order: orderId,
      type,
      bankDetails,
    });

    /* ===== 6. Create Admin Notification ===== */
    await Notification.create({
      title: "Refund / Return Request",
      message: `New ${type.toUpperCase()} request for Order #${order._id}`,
    });

    res.json({
      success: true,
      message: "Request submitted successfully",
    });

  } catch (error) {
    console.error("Refund Request Error:", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
