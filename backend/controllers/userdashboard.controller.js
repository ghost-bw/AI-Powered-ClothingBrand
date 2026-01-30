import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import Address from "../models/address.model.js";
import Invoice from "../models/invoices.model.js";
// import Order from "../models/order.model.js";

/* SINGLE ORDER */

 export const getOrderDetails = async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("items.product")
    .populate("address");

  res.json({
    success: true,
    order,
  });
};




/* GET INVOICES */

export const getInvoices = async (req, res) => {
  const invoices = await Invoice.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  res.json({ success: true, invoices });
};

/* DOWNLOAD */

export const downloadInvoice = async (req, res) => {
  const invoice = await Invoice.findById(req.params.id);

  res.json(invoice);
};


/* GET ADDRESSES */

export const getAddresses = async (req, res) => {
  const addresses = await Address.find({ user: req.user._id });

  res.json({ success: true, addresses });
};

/* CREATE / UPDATE */

export const saveAddress = async (req, res) => {
  if (req.body.default) {
    await Address.updateMany(
      { user: req.user._id },
      { default: false }
    );
  }

  if (req.params.id) {
    const updated = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.json({ success: true, address: updated });
  }

  const address = await Address.create({
    ...req.body,
    user: req.user._id,
  });

  res.json({ success: true, address });
};

/* DELETE */

export const deleteAddress = async (req, res) => {
  await Address.findByIdAndDelete(req.params.id);

  res.json({ success: true });
};


/* USER PROFILE */

export const getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  res.json({
    success: true,
    user,
  });
};

/* USER ORDERS */

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.json({
    success: true,
    orders,
  });
};
