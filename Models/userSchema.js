import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    profileImg:{
        type:String,
        require:true
    },
    profileThumbImg:{
        type:String,
        require:true
    },
    accountCreatedDate:{
        type:Date,
        require:true,
        default:Date.now
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

const User=mongoose.model("User",userSchema)
export default User