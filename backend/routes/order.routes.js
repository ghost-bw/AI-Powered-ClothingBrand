import express from "express";
import {placeOrder,getMyOrders} from "../controllers/order.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/",protect,placeOrder);
router.get("/my",protect,getMyOrders);

export default router;
