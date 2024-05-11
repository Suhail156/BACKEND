import express from 'express'
import {verifytoken } from '../middlewares/authMiddleware.js'
import { productByCategory, productById, viewProduct } from '../Controller/productController.js'
import { addCartQuantity, addToCart, decremntQuantity, removeCart, viewCart } from '../Controller/cartController.js'
import { addToWishlist, removewishlist, viewWishlist } from '../Controller/wishlistController.js'
import { orderDetails, payment, success } from '../Controller/userPaymentController.js'
import TrycatchMiddleware from '../Middlewares/tryCatchMiddleware.js'

const router=express.Router()
//products 
router.use(verifytoken)

router.get("/products",TrycatchMiddleware(viewProduct))
router.get("/products/:id",TrycatchMiddleware(productById))
router.get("/products/category/:categoryname",TrycatchMiddleware(productByCategory))

 //cart 
 router.post("/:userid/cart/:productid",addToCart)
 router.get("/:id/cart",viewCart)   
 router.patch("/:userid/cart/:productid/increment",addCartQuantity)
 router.patch("/:userid/cart/:productid/decrement",decremntQuantity)
 router.delete("/:userId/cart/:productId/remove",removeCart)
//whishlist
router.post("/:userid/wishlist/:productid",addToWishlist)
router.get("/:id/wishlist",viewWishlist)
router.delete("/:userid/wishlist/:productid/remove",removewishlist)
export default router   

//payment
router.post("/:userid/payment",payment)
router.get("/payment/success",success)
router.get("/:userid/orderdetails",orderDetails)