import Products from "../Models/productSchema.js";


export const viewProduct=async(req,res)=>{
    const product=await Products.find()
    console.log(product);
    if(!product){
        res.status(404).json({meassge:"unable to get products"})
    }
    res.status(200).json({status:"success",message:"successfully fetched data",data:product})
}

export const productById=async(req,res)=>{
   const productid=req.params.id
   const product=await Products.findById(productid)
   if(!product){
    res.status(404).json({Error:"not found",message:"product not found"})
   }
   res.status(200).json({product})
}

export const productByCategory=async(req,res)=>{
    const{categoryname}=req.params
    const products=await Products.find({
        $or:[
            {category:{$regex:new RegExp(categoryname,'i')}},
            {title:{$regex:new RegExp(categoryname,'i')}}
        ]
    }).select('title category price')
    if(products.length===0){
        res.status(404).json({message:"no item found"})
    }
    res.status(200).json({products})
}