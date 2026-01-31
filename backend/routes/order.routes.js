import express from "express";
import {placeOrder,getMyOrders,getAllOrders} from "../controllers/order.controller.js";
import protect from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post("/",protect,placeOrder);
// router.get("/my",protect,getMyOrders);
router.get("/admin/all", protect, isAdmin, getAllOrders);


export default router;
