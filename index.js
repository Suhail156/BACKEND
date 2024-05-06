import dotenv from "dotenv"
import express from 'express'
import mongoose from 'mongoose'
import authRouter from "./Routes/routes.js"
import bodyParser from 'body-parser'
import adminRouter from "./Routes/adminRoute.js"
import productRouter from "./Routes/productRoute.js"
 const app=express()
 dotenv.config()
 //middlewares
 app.use(bodyParser.urlencoded({ extended: true }))
 app.use(bodyParser.json())
 app.use(express.json({extended:true}))
 //routes user
 app.use("/api/users",authRouter)
 app.use("/api/users",productRouter)
// routes products admin
 app.use("/api/admin",adminRouter)

 const mongoDB = "mongodb://localhost:27017/backendecommerce"
 
 
 

    const PORT=process.env.PORT||7000

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


   
    

app.listen(PORT,()=>{
    console.log(`server running on http://localhost${PORT}`);
})  