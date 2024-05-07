import express from 'express'
import { createProducts } from '../Controller/adminProductController.js'
import imageUpload from '../Middlewares/imageUpload/imageUpload.js'
import { adminLogin } from '../Controller/adminController.js'


const router=express.Router()
//login
router.post("/login",adminLogin)


//product
router.post("/createProducts",imageUpload,createProducts)
   

export default router