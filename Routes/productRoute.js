import express from 'express'
import { productByCategory, productById, viewProduct } from '../Controller/productController.js'
import { verifytoken } from '../middlewares/authMiddleware.js'
import { addCartQuantity, addToCart, viewCart } from '../Controller/cartController.js'

const router=express.Router()
//products 
router.get("/products",verifytoken,viewProduct)
router.get("/products/:id",verifytoken,productById)
router.get("/products/category/:categoryname",verifytoken,productByCategory)

 //cart 
 router.post("/:userid/cart/:productid",verifytoken,addToCart)
 router.get("/:id/cart",verifytoken,viewCart)
 router.patch("/:userid/cart/:productid/increment",addCartQuantity)

export default router   