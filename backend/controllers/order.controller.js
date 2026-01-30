import Order from "../models/order.model.js";

/* ================= PLACE ORDER ================= */



export const placeOrder = async (req, res) => {
 try {

  const user = req.user;

  if (!user.cart || user.cart.length === 0)
   return res.status(400).json({ message: "Cart empty" });

  const order = await Order.create({
   user: user._id,
   items: user.cart,
   shipping: req.body.shipping,
   paymentMethod: req.body.payment,
   subtotal: req.body.subtotal,
   shippingCost: req.body.shippingCost,
   gst: req.body.gst,
   discount: req.body.discount,
   total: req.body.total
  });

  // Clear cart AFTER order saved
  user.cart = [];
  await user.save();

  res.json({ success:true, order });

 } catch (err) {
  console.log("ORDER ERROR:", err);
  res.status(500).json({ message: err.message });
 }
};


/* ================= MY ORDERS ================= */

export const getMyOrders = async (req, res) => {
 try {

  const orders = await Order.find({
   user: req.user._id
  }).sort({ createdAt: -1 });

  res.json(orders);

 } catch (err) {
  res.status(500).json({ message: err.message });
 }
};
