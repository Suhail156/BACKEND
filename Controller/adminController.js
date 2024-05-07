import Jwt from "jsonwebtoken"
import dotenv from 'dotenv'
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

 