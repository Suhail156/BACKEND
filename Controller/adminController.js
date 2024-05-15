import Jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import User from "../Models/userSchema.js"
dotenv.config()




export const adminLogin = async (req, res) => {
        const { email, password } = req.body;
        

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    
            const token = Jwt.sign({ email }, process.env.ADMIN_ACCESS_TOKEN);

            res.cookie('access_token', token, { httpOnly: true });

            res.status(200).json({ message: "Admin logged in successfully", token });
        } else {
    
            res.status(401).json({ message: "Unauthorized" });
        }
    } 


   
  //admin view all users
  
 export const viewAllusers=async(req,res,next)=>{
        const viewUser=await User.find()
        if(viewUser.length===0){
            res.status(404).json({message:"no users in db"})
        }
        res.status(200).json(viewUser)
    
   
 } 

export const userGetById=async(req,res)=>{
    const userId=req.params.id
    const allusers=await User.findById(userId)
    if(!allusers){
        res.status(404).json({message:"user not found"})
    }
    res.status(200).json(allusers)

}
//block user 
export const blockUserById=async(req,res)=>{
    const{userId}=req.params


    const blockUser=await User.findOneAndUpdate({_id:userId},{$set:{isDeleted:true}})
    if(!blockUser){
        res.status(404).json({message:"user not found"})
    }
    res.status(200).json({message:"user blocked successfully"})
}

//unblock user

export const unBlockUserById=async(req,res)=>{
    const{userId}=req.params
    const unBlock=await User.findOneAndUpdate({_id:userId},{$set:{isDeleted:false}})
    if(!unBlock){
        res.status(404).json({message:"user not found"})
    }
    res.status(200).json({message:"user successfully unblocked"})
}