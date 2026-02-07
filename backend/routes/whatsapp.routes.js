import express from "express";
import { sendWhatsapp,getLogs,toggleWhatsapp } from "../controllers/whatsapp.controller.js";

const router = express.Router();

router.post("/send",(req,res,next)=>{
 console.log("🔥 ROUTE HIT /admin/whatsapp/send");
 next();
},sendWhatsapp);

router.get("/logs",getLogs);
router.post("/toggle",toggleWhatsapp);

export default router;
