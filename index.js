import dotenv from "dotenv"
import express from 'express'
import mongoose from 'mongoose'
import authRouter from "./Routes/routes.js"
import bodyParser from 'body-parser'

 const app=express()
 dotenv.config()
 //middlewares
 app.use(bodyParser.urlencoded({ extended: true }))
 app.use(bodyParser.json())
 app.use(express.json({extended:true}))
 //routes 
 app.use("/api/users",authRouter)


 const mongoDB = "mongodb://localhost:27017/backendecommerce"
 
 async function main(){
    try{
        await mongoose.connect(mongoDB)
        console.log("Database connected...");
    }
    catch(err){
        console.log(err);
    }
 }
 main()


    const PORT=process.env.PORT||7000




   


app.listen(PORT,()=>{
    console.log(`server running on http://localhost${PORT}`);
})  