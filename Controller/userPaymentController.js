// import User from "../Models/userSchema.js";

// export const payment = async (req, res) => {
//   const userId = req.params.id;
//   const user = await User.findById(userId).populate({
//     path: "cart",
//     populate: { path: "productId" },
//   });
//   if (!user) {
//     res.status(404).json({ message: "user not found" });
//   }
//   const cartProduct = user.cart;
//   if (cartProduct.length === 0) {
//     res.status(200).json({ message: "user cart is empty" });
//   }
//   let totalAmount = 0;
//   let totalQuantity = 0;

//   const lineItems = cartProduct.map((item) => {
//     totalAmount += item.productId.price * item.quantity;
//     totalQuantity += item.quantity;

//     return {
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: item.productId.title,
//           description: item.productId.description,
//         },
//         unit_amount: Math.round(item.productId.price * 100),
//       },
//       quantity: item.quantity,
//     };
// });
// const session = await stripeInstance.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: lineItems,
//     mode: "payment",
//     success_url: "https://example.com/success", // Replace with actual success URL
//     cancel_url: "https://example.com/cancel", // Replace with actual cancel URL
//   });

//   if (!session) {
//     return res
//       .status(500)
//       .json({ message: "Error occurred while creating session" });
//   }

//   Svalue = {
//     userId,
//     user,
//     session,
//   };

//   //  await Cart.findByIdAndDelete(user.cart._id)    


//   res.status(200).json({
//     message: "Stripe payment session created successfully",
//     url: session.url,
//     totalAmount,
//     totalQuantity,
//   });
// } 

