import Jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import User from "../Models/userSchema.js"
dotenv.config()




export const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        // Check if email and password match the admin credentials stored in environment variables
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // If credentials are correct, generate a JWT token
            const token = Jwt.sign({ email }, process.env.ADMIN_ACCESS_TOKEN);

            // Set the JWT token as a cookie with HttpOnly flag for security
            res.cookie('access_token', token, { httpOnly: true });

            // Respond with success message and the token
            res.status(200).json({ message: "Admin logged in successfully", token });
        } else {
            // If credentials are incorrect, respond with unauthorized status
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        // Pass any caught errors to the error handling middleware
        next(error);
    }
};

   
  //admin view all users
  
 export const viewAllusers=async(req,res,next)=>{
    try {
        const viewUser=await User.find()
        if(viewUser.length===0){
            res.status(404).json({message:"no users in db"})
        }
        res.status(200).json(viewUser)
    } catch (error) {
       next(error) 
    }
   
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