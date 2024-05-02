import express from 'express'
import { createProducts } from '../Controller/adminProductController.js'
import imageUpload from '../Middlewares/imageUpload/imageUpload.js'


const router=express.Router()

//product
router.post("/createProducts",imageUpload,createProducts)
   

export default router