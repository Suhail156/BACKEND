import userjoi from "../Middlewares/joivalidation.js";
import User from "../Models/userSchema.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

export const signup = async (req, res) => {
  try {
    const { value, error } = userjoi.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.details[0].message,
      });
    }

    const { username, image, email, password } = value;
    console.log(value);

    // Check username already exists
    const existingUser = await User.findOne({ email:email });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "Username already taken!",
      });
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      image:image,
      email: email,
      password: hashedPassword,
    });

    // Save new user to database
    await newUser.save();

    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data:newUser
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occurred",
    });
  }
};

//user login
export const login=async(req,res,next)=>{
  try {
    const{email,password}=req.body
    console.log(req.body);
    //find user
    const uservalid=await User.findOne({email})
    console.log(uservalid);
    if(!uservalid) {
      res.status(404).json({error:"user not found"})
    }
  //password checking
   const validpass=bcrypt.compareSync(password,uservalid.password)
   console.log(validpass);
   if(!validpass){
    res.status(401).json({error:"Wrong credential"})
   }
   //jwt
   const token=Jwt.sign({id:uservalid._id},process.env.USER_SECRET_TOKEN)
   const{password:hashedPassword, ...rest}=uservalid._doc
   const expirydate=new Date(Date.now() +60 * 1000)

   //cookie
   res.cookie("access_token",token,{httpOnly:true,expires:expirydate})
   .status(200).json(rest)
   
  } catch (error) {
    next(error)
  }
}