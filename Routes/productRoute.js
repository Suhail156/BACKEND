import express from 'express'
import { productByCategory, productById, viewProduct } from '../Controller/productController.js'
import { verifytoken } from '../middlewares/authMiddleware.js'
import { addToCart } from '../Controller/cartController.js'

const router=express.Router()
//products 
router.get("/products",verifytoken,viewProduct)
router.get("/products/:id",verifytoken,productById)
router.get("/products/category/:categoryname",verifytoken,productByCategory)

 //cart 
 router.post("/:userid/cart/:productid",verifytoken,addToCart)

export default router   