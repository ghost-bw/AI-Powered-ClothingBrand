import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
 name:String,
 slug:String,
 isActive:{type:Boolean,default:true}
},{timestamps:true});

export default mongoose.model("Collection",collectionSchema);
