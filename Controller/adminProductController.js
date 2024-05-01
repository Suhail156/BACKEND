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