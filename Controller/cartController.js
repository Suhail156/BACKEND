import Cart from "../Models/cartSchema.js";
import Products from "../Models/productSchema.js";
import User from "../Models/userSchema.js";



 // product addToCart
export const addToCart = async (req, res, next) => {
  try {
    const userId = req.params.userid;
    const productId = req.params.productid;

    // Find user by id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find product by id
    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // already existing
    let cartItem = await Cart.findOne({ userId: user._id, productId: product._id });
    if (cartItem) {
      //increment
      cartItem.quantity++;
      await cartItem.save();
      return res.status(200).json({ message: "Product incremented in the cart" });
    } else {
      // new cart
      cartItem = await Cart.create({
        userId: user._id,
        productId: product._id,
        quantity: 1
      });
      // add to cart array
      user.cart.push(cartItem._id);
      await user.save();
      return res.status(200).json({ message: "Product added to the cart" });
    }
  } catch (error) {
    
    next(error);
  }
};

// view cart

export const viewCart=async(req,res,next)=>{
    try {
        const{id}=req.params
        const user=await User.findById(id)
        .populate({
            path:"cart",
            populate:{path:"productId"}
        })
        if(!user){
            res.status(404).json({meassage:"user not found"})
        }
        res.status(200).json(user.cart)
    } catch (error) {
        next(error)
    }
}


// add cart quantity

export const addCartQuantity=async(req,res,next)=>{
    try {
        const userId=req.params.userid
        const productId=req.params.productid
        const{quantityIncrement}=req.body

        //find user by id
        const user=await User.findById(userId)
        console.log(user);
        if(!user){
          res.status(404).json({message:"user not found"})
        }
        // find product by id
        const product=await Products.findById(productId)
        console.log(product);
        if(!product){
          res.status(404).json({message:"product not found"})
        }
        //find or create item
        const cartItem =await Cart.findOne({userId:user._id,productId:product._id})
        console.log(cartItem);
        if(cartItem){
          if(typeof quantityIncrement !=="number"){
            res.status(400).json({message:"bad request"})
          }else{
            cartItem.quantity += quantityIncrement;
            await cartItem.save()
          }
        }
          res.status(201).json({message:"quantity incremented"})
    } catch (error) {
        next(error)
    }
}
