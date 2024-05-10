import Products from "../Models/productSchema.js";
import productJoi from "../Validation/productValidation.js";



 export const createProducts=async(req,res)=>{
    try {
     const {error,value}=productJoi.validate(req.body)
     if (error) {
        return res.status(400).json({
          status: "error",
          message: error.message,
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

   // export const viewAdminProducts= async(req,res, next)=>{
   //    try {
         
   //                const allproducts=await Products.findOne();

   //                console.log(allproducts, "poreooiie");
                  
   //                if(!allproducts){
   //                   res.status(404).json({message:"product not found"})
   //                }
   //                res.status(200).json({status:"success",message:"successfully fetched data",data:allproducts})
               
         
   //    } catch (error) {
   //       next(error)
   //    }
   
   // }

   
export const  viewAllproducts =async(req,res)=>{
   try {
      const product=await Products.find()
      console.log(product);
      res.json(product) 
      if(!product){ 
          res.status(404).json({meassge:"unable to get products"})
      }
      res.status(200).json({status:"success",message:"successfully fetched data",data:product})
   }
   catch(error) {
     console.log(error)
   }
 
}
   // view products by id

   export const getByIdProduct=async(req,res,next)=>{


      try {
         const productId=req.params.productid

         const products=await Products.findById(productId)
         if(!products){
           return res.status(404).json({message:"product not found"})
         }
         res.status(200).json(products)
      } catch (error) {
         next(error)
      }
     
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

   
   //find and update product

   export const adminUpdateProduct = async (req, res, next) => {
      try {
         const { productid } = req.params;
         const product = await Products.findById(productid);
   
         if (!product) {
            return res.status(404).json({ message: "Product not found" });
         }
   
         const { title, category, description, price, image } = req.body;
   
         if (title) product.title = title;
         if (category) product.category = category;
         if (description) product.description = description;
         if (price) product.price = price;
         if (image) product.image = image;
   
         await product.save();
   
         console.log("After Update:", product);
   
         res.status(200).json({ message: "Product successfully updated", data: product });
      } catch (error) {
         next(error);
      }
   };
   