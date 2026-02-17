import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
collectionRef: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Collection"
},

gender:{
 type:String,
 enum:["boys","girls",null],
 default:null
}

  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
