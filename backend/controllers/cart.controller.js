import User from "../models/user.model.js";

export const addToCart = async(req,res)=>{

 const user = await User.findById(req.user._id);

 const {product,size,color,quantity}=req.body;

 user.cart.push({product,size,color,quantity});

 await user.save();

 res.json(user.cart);
};

export const removeFromCart = async(req,res)=>{

 const user = await User.findById(req.user._id);

 user.cart = user.cart.filter(i=>i._id!=req.params.id);

 await user.save();

 res.json(user.cart);
};

export const updateCart = async(req,res)=>{

 const user = await User.findById(req.user._id);

 const item = user.cart.id(req.params.id);

 item.quantity=req.body.quantity;

 await user.save();

 res.json(user.cart);
};

export const toggleWishlist = async(req,res)=>{

 const user = await User.findById(req.user._id);

 const pid=req.params.productId;

 if(user.wishlist.includes(pid)){
  user.wishlist.pull(pid);
 }else{
  user.wishlist.push(pid);
 }

 await user.save();

 res.json(user.wishlist);
};
