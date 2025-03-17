import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator"
import userModel from "../models/user.js";

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// for register of user

const register=async(req,res,next)=>{

    const {name,email,password}=req.body;
     try {
        // check if user already present
        const ispresent= await userModel.findOne({email});
        if(ispresent){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        // validating user email password is strong or not
        if(!validator.isEmail(email)){
            return res.status(400).json({
                success:false,
                message:"invalid email"
            })
        }
        if(password.length<5){
            return res.status(400).json({
                success:false,
                message:"please enter strong password more then 5 length"
            })
        }
        // hashing password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new userModel({name:name,email:email,password:hashedPassword});
        const user=await newUser.save();
        const token =createToken(user._id);
        res.json({
            success:true,
            message:"new user created",
            token,user
        })
     } catch (error) {
        next(error);
     }
}

// login user

const login=async(req,res,next)=>{
    const {email,password}=req.body;
    try {
        const user=await userModel.findOne({email});
        if(!user){
            res.status(400).json({
                success:false,
                message:"No user Present"
            })
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(400).json({
                success:false,
                message:"Password Does Not Match"
            })
        }
        const token=createToken(user._id);
        res.json({success:true,message:"User Login Successfully ",token,user})
    } catch (error) {
        next(error)
    }
}
export {login,register};
