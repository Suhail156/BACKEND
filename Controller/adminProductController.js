import Products from "../Models/productSchema.js";
import productJoi from "../Validation/productValidation.js";



 export const createProducts=async(req,res)=>{
    try {
     const {error,value}=productJoi.validate(req.body)
     if (error) {
        return res.status(400).json({
          status: "error",
          message: error.details[0].message,
        });
      }
      const{title,description,price,category,image}=value
         const newProduct=new Products({
            title:title,
            description:description,
            price:price,
            category:category,
            image:image

         })
         console.log(newProduct);
         await newProduct.save()
         return res.status(201).json({
            status: "success",
            message: "product added successfully",
            data:newProduct
          });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "An unexpected error occurred",
          });
        
    }
 }


// view all products

   export const viewAdminProducts=async(req,res)=>{

         const allproducts=await Products.find()
         if(!allproducts){
            res.status(404).json({message:"product not found"})
         }
         res.status(200).json({status:"success",message:"successfully fetched data",data:allproducts})
      
   
   }

   // view products by id

   export const getByIdProduct=async(req,res)=>{
      const productId=req.params.productid
      const products=await Products.findById(productId)
      if(!products){
         res.status(404).json({message:"product not found"})
      }
      res.status(200).json(products)
   }


   //view products by category

   export const productsCategory=async(req,res)=>{
      const {categoryname}=req.params
      const product=await Products.find({
         $or:[
            {category:{$regex:new RegExp(categoryname,'i')}},
            {title:{$regex:new RegExp(categoryname,'i')}}
        ]
    }).select('title category price')
       if(product.length===0){
        return res.status(404).json({message:"no item found"})
       }
       res.status(200).json({product})
   }

   