import express from 'express'
import { productByCategory, productById, viewProduct } from '../Controller/productController.js'
import { verifytoken } from '../middlewares/authMiddleware.js'
import { addCartQuantity, addToCart, decremntQuantity, removeCart, viewCart } from '../Controller/cartController.js'
import { addToWishlist, removewishlist, viewWishlist } from '../Controller/wishlistController.js'
import { payment, success } from '../Controller/userPaymentController.js'


const router=express.Router()
//products 
router.get("/products",verifytoken,viewProduct)
router.get("/products/:id",verifytoken,productById)
router.get("/products/category/:categoryname",verifytoken,productByCategory)

 //cart 
 router.post("/:userid/cart/:productid",verifytoken,addToCart)
 router.get("/:id/cart",verifytoken,viewCart)
 router.patch("/:userid/cart/:productid/increment",verifytoken,addCartQuantity)
 router.patch("/:userid/cart/:productid/decrement",verifytoken,decremntQuantity)
 router.delete("/:userId/cart/:productId/remove",verifytoken,removeCart)
//whishlist
router.post("/:userid/wishlist/:productid",addToWishlist)
router.get("/:id/wishlist",viewWishlist)
router.delete("/:userid/wishlist/:productid/remove",removewishlist)
export default router   

//payment
router.post("/:userid/payment",payment)
router.get("/payment/success",success)