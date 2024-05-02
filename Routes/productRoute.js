import express from 'express'
import { productByCategory, productById, viewProduct } from '../Controller/productController.js'
import { verifytoken } from '../middlewares/authMiddleware.js'

const router=express.Router()

router.get("/products",verifytoken,viewProduct)
router.get("/products/:id",verifytoken,productById)
router.get("/products/category/:categoryname",verifytoken,productByCategory)


export default router   