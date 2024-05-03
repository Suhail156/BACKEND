import { required } from "joi";
import mongoose, { Schema } from "mongoose";

const whishlistSchema=new  mongoose.Schema({
    userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true},

   productId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
    quantity:{
        type:Number,
        default:1
    }
})
const Whishlist=mongoose.model("Whishlist",whishlistSchema)
export default Whishlist