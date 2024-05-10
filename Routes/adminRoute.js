import express from 'express'
import { adminUpdateProduct, createProducts, deleteProduct, getByIdProduct, viewAllproducts} from '../Controller/adminProductController.js'
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
router.get("/:categoryname/products",productByCategory)
router.patch("/:productid/update",adminUpdateProduct)  //idint get
router.get("/allproducts",adminToken,viewAllproducts)//ididnt get
router.delete("/:productid/delete",deleteProduct)
export default router