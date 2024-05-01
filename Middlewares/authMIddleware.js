import Jwt from "jsonwebtoken";

export const verifytoken=(req,res)=>{
    const token=req.headers["authorization"]
    if(!token){
        res.status(404).json({error:"user not found"})
    }
    Jwt.verify(token,env.process.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err){
            res.status(404).json({error:"unauthorized"})
        }
        req.email=decoded.email
    })
    next()
}