import Jwt from "jsonwebtoken";
import dotenv from 'dotenv'
  
dotenv.config()
export const verifytoken=(req,res,next)=>{
    try {
        const token=req.headers["authorization"]
    if(!token){
        res.status(404).json({error:"user not found"})
    }
    Jwt.verify(token,process.env.USER_SECRET_TOKEN,(err,decoded)=>{
        if(err){
            res.status(404).json({error:"unauthorized"})
        }
        req.email=decoded.email
        next()
    })
    } catch (error) {
      return next(error)  
    }
    
    
}