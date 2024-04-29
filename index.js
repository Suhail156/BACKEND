import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

 dotenv.config()
 mongoose.connect("mongodb://localhost:27017/backendecommerce")
const app=express()
    const PORT=process.env.PORT||7000

app.listen(PORT,()=>{
    console.log(`server running on http://localhost${PORT}`);
})