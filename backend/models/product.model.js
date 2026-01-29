import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

 id:Number,
 name:String,
 slug:String,
 isDeleted:{type:Boolean,default:false},

 category:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"Category"
 },

 description:String,

 price:Number,
 discountPercent:Number,
 discountPrice:Number,

 stock:Number,
 sku:String,

 isActive:{type:Boolean,default:true},
 totalSold:{type:Number,default:0},

 sizes:[String],

 collections:[String],

 isTrending:{type:Boolean,default:false},
 isBrandStory:{type:Boolean,default:false},

 details:{
  fabric:String,
  material:String,
  care:String,
  weight:String,
  dimensions:String,
  origin:String
 },

 // ⭐ Color + Images
 colors:[
 {
  name:String,
  hex:String,
  images:[String]   // <=== THIS WAS MISSING
 }
]
,

 location:{
  city:String,
  state:String,
  pincode:String
 }

},{timestamps:true});

export default mongoose.model("Product", productSchema);

