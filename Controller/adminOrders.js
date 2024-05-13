import Orders from "../Models/orderSchema.js"




export const allOrders=async(req,res)=>{
    const orderdetails=await Orders.find()

    if(!orderdetails){
        res.status(404).json({message:"not found"})
    }
    res.status(200).json({message:"successfully fetched",data:orderdetails})
}