import mongoose from "mongoose";

const schema = new mongoose.Schema({
 phone:String,
 template:String,
 message:String,
 status:String
},{timestamps:true});

export default mongoose.model("WhatsappLog",schema);
