import express from 'express'
import { adminUpdateProduct, createProducts, deleteProduct, getByIdProduct, viewProducts} from '../Controller/adminProductController.js'
import imageUpload from '../Middlewares/imageUpload/imageUpload.js'
import { adminLogin, userGetById, viewAllusers } from '../Controller/adminController.js'
import { adminToken} from '../Middlewares/adminMiddleware.js'
import { productByCategory } from '../Controller/productController.js'


const router=express.Router()
//login
router.post("/login",adminLogin)

router.use(adminToken)
//admin
router.get("/viewalluser",viewAllusers)
router.get("/users/:id",userGetById)


//product
router.post("/createProducts",imageUpload,createProducts)
router.get("/:productid/product",getByIdProduct)  
router.get("/:categoryname/products",productByCategory)
router.get("/allproducts",viewProducts)
router.patch("/:id/update",adminUpdateProduct)  //idint get
router.delete("/:productid/delete",deleteProduct)
export default router