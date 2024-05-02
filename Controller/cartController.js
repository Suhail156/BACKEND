import Cart from "../Models/cartSchema.js";
import Products from "../Models/productSchema.js";
import User from "../Models/userSchema.js";

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
