import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRouter from "./Routes/routes.js"

 dotenv.config()
 
 mongoose.connect("mongodb://localhost:27017/backendecommerce")
const app=express()
    const PORT=process.env.PORT||7000



    //middlewares
    app.use(express.json())
    app.use("/api/users",authRouter)

app.listen(PORT,()=>{
    console.log(`server running on http://localhost${PORT}`);
})