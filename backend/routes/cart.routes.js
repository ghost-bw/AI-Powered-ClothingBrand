import express from "express";
import {protect} from "../middlewares/auth.middleware.js";
import {addToCart,removeFromCart,updateCart,toggleWishlist} from "../controllers/cart.controller.js";

const router=express.Router();

router.post("/",protect,addToCart);
router.delete("/:id",protect,removeFromCart);
router.put("/:id",protect,updateCart);
router.post("/wishlist/:productId",protect,toggleWishlist);

export default router;
