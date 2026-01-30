import User from "../models/user.model.js";

/* ================= ADD ================= */

export const addToCart = async (req, res) => {
 try {
  const user = await User.findById(req.user._id || req.user.id);

  if (!user) return res.status(404).json({ message: "User not found" });

  if (!user.cart) user.cart = [];

  user.cart.push({
   product: req.body.product,
   name: req.body.name,
   price: req.body.price,
   image: req.body.image,
   size: req.body.size,
   color: req.body.color,
   quantity: req.body.quantity
  });

  await user.save();

  res.json({ success:true, cart:user.cart });

 } catch (err) {
  res.status(500).json({ message: err.message });
 }
};

/* ================= UPDATE ================= */

export const updateCart = async (req, res) => {
 try {

  const productId = req.params.id;
  const { quantity } = req.body;

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message:"User not found" });

  const item = user.cart.find(i=>i._id.toString()===productId);

  if(!item) return res.status(404).json({message:"Item not found"});

  item.quantity = quantity;

  await user.save();

  res.json({success:true,cart:user.cart});

 } catch(err){
  res.status(500).json({message:"Update failed"});
 }
};

/* ================= REMOVE ================= */

export const removeFromCart = async (req, res) => {
 try {

  const productId = req.params.id;

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message:"User not found" });

  user.cart = user.cart.filter(i=>i._id.toString()!==productId);

  await user.save();

  res.json({success:true,cart:user.cart});

 } catch(err){
  res.status(500).json({message:"Remove failed"});
 }
};

/* ================= WISHLIST ================= */

export const toggleWishlist = async (req, res) => {
 try {

  const productId = req.params.id;

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message:"User not found" });

  if(!user.wishlist) user.wishlist=[];

  const index=user.wishlist.findIndex(i=>i.toString()===productId);

  if(index>-1) user.wishlist.splice(index,1);
  else user.wishlist.push(productId);

  await user.save();

  res.json({success:true,wishlist:user.wishlist});

 } catch(err){
  res.status(500).json({message:"Wishlist failed"});
 }
};
