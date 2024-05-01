import express from 'express'
import { signup,login } from '../Controller/userController.js'
import imageUpload from '../Middlewares/imageUpload/imageUpload.js'



const router=express.Router()

router.post("/signup",imageUpload,(signup))
router.post("/login",(login))


export default router