import Orders from "../Models/orderSchema.js"




export const allOrders=async(req,res)=>{
    const orderdetails=await Orders.find()

    if(orderdetails.length===0){
      return  res.status(404).json({message:"no orders"})
    }
   return res.status(200).json({message:"successfully fetched",data:orderdetails})
}