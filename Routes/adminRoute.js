import express from 'express'
import { createProducts, getByIdProduct, viewAdminProducts } from '../Controller/adminProductController.js'
import imageUpload from '../Middlewares/imageUpload/imageUpload.js'
import { adminLogin, userGetById, viewAllusers } from '../Controller/adminController.js'
import { adminToken } from '../Middlewares/adminMiddleware.js'
import { productByCategory } from '../Controller/productController.js'


const router=express.Router()
//login
router.post("/login",adminLogin)


//admin
router.get("/viewalluser",adminToken,viewAllusers)
router.get("/:id",adminToken,userGetById)


//product
router.post("/createProducts",imageUpload,createProducts)
router.get("/:productid/product",adminToken,getByIdProduct)  
router.get("/products",adminToken,viewAdminProducts)
router.get("/:categoryname/products",productByCategory)

export default router