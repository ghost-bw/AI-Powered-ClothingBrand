import twilio from "twilio";
import WhatsappLog from "../models/WhatsappLog.model.js";
import Order from "../models/order.model.js";

const client = twilio(
 process.env.TWILIO_SID,
 process.env.TWILIO_AUTH
);

// 🔥 ADMIN BROADCAST (keeps /send)
export const sendWhatsapp = async (req,res)=>{
 console.log("🔥 CONTROLLER ENTERED");

 try{

  const { message } = req.body;

  console.log("MESSAGE:",message);

  const orders = await Order.find();

  console.log("ORDERS FOUND:",orders.length);

  const phones=[];

 for(const o of orders){

 let phone = o.shipping?.phone;

 console.log("RAW PHONE:", phone);

 if(!phone) continue;

 // remove spaces, dashes, etc
 phone = phone.replace(/\D/g,"");

 // Indian numbers normalization
 if(phone.length === 10){
   phone = "+91" + phone;
 }

 // already contains country code
 else if(phone.length === 12){
   phone = "+" + phone;
 }

 else{
   console.log("SKIPPED INVALID:", phone);
   continue;
 }

 phones.push(phone);
}


  const uniquePhones=[...new Set(phones)];

  console.log("UNIQUE PHONES:",uniquePhones);

  if(!uniquePhones.length){
    return res.json({success:false,message:"No phones"});
  }

  for(const phone of uniquePhones){

    console.log("SENDING:",phone);

    await client.messages.create({
      from:"whatsapp:+14155238886",
      to:`whatsapp:${phone}`,
      body:message
    });

    await WhatsappLog.create({
      phone,
      message,
      status:"Sent"
    });

    console.log("SENT:",phone);
  }

  res.json({
    success:true,
    total:uniquePhones.length
  });

 }catch(err){
  console.log("TWILIO ERROR:",err);
  res.status(500).json({success:false,error:err.message});
 }
};


export const getLogs = async(req,res)=>{
 const logs = await WhatsappLog.find().sort({createdAt:-1});
 res.json(logs);
};

export const toggleWhatsapp = async(req,res)=>{
 res.json({enabled:req.body.enabled});
};
