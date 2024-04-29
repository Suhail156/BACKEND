import User from "../Models/userSchema.js";

export const signup=async(req,res)=>{
   const data=req.body
const newuser=new User({
    ...data})

    await newuser.save()
    res.status(201).json({message:"successfully created"})
}


