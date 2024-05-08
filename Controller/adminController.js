import Jwt from "jsonwebtoken"
import dotenv from 'dotenv'
import User from "../Models/userSchema.js"
dotenv.config()


export const adminLogin=async(req,res,next)=>{
    try {
        const{email,password}=req.body
        if(email===process.env.ADMIN_EMAIL&&password===process.env.ADMIN_PASSWORD){
           const token=Jwt.sign({email},process.env.ADMIN_ACCESS_TOKEN)
           res.cookie('access_token',token,{httpOnly:true})
           res.status(200).json({message:"admin logged successfully",token})
        }
}
catch (error) {

        next(error)
}
    } 

   
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


 