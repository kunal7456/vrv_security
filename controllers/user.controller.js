const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const bcrypt=require("bcrypt")

/*controller file for performing action on a given route */

/* register controller registers a user into database with default role of "user" along with setting cookies with help of jwt and password is hashed using bcrypt 
 for securing user password */

const Register=async (req,res)=>{
    try {
        
        const {name,email,password}=req.body;
        if(!name || !email || !password ){
             return res.status(400).json({message:"All fields are required"});
        }

        const isUserExist=await User.findOne({email});
        if(isUserExist){
            return res.status(400).json({message:"Email already in use , Please Login"});
        }

        const hashPassword=await bcrypt.hash(password,10);
        
        const newUser=await User.create({
            name,
            email,
            password:hashPassword,
        })

        let token=jwt.sign({email:email,userid:newUser._id},"pass");
        res.cookie("token",token);
        
        res.status(201).json({message:"User registered successfully",user:{newUser}});

    } catch (error) {
        res.status(500).json({message:"Server error", error:error.message})
    }
}

/* Login route basically logs  in a user by verifying credentials, and sets a JWT in cookies upon success.*/

const Login=async(req,res)=>{
     try{
      const {email,password}=req.body;
      const user=await User.findOne({email});
      if(!user){
        res.status(500).json({message:"Not registered"})
      }
      bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            let token=jwt.sign({email,userid:user._id},"pass")
            res.cookie("token",token);
            res.status(201).json({message:"Logged In"});
        }
        else{
            res.redirect("/login");
        }
      })
}
catch(error){
    res.status(500).json({message:"Server error", error:error.message})
  }
}

/*Logs out a user by clearing the JWT cookie.*/

const Logout=async(req,res)=>{
    try {
        res.cookie("token","");
        res.status(201).json({message:"SucessFully Logout"})
    } catch (error) {
        res.status(500).json({message:"Server error", error:error.message})
    }
}

/*Provides the profile details of the logged-in user.*/

const Profile=async(req,res)=>{
    try {
        res.status(201).json({message:"Here is your profile section",user:req.user})
    } catch (error) {
        res.status(500).json({message:"Server error", error:error.message})
    }
}

/*Returns admin-specific content for logged-in admin users.*/

const Admin=async(req,res)=>{
    try {
        res.status(201).json({message:"Here is your Admin section",user:req.user})
    } catch (error) {
        res.status(500).json({message:"Server error", error:error.message})
    }
}

 /*Returns VIP section content for authorized admin or moderator users.*/

const Vip=async(req,res)=>{
    try {
        res.status(201).json({message:"Here is your VIP section admin/moderator",user:req.user})
    } catch (error) {
        res.status(500).json({message:"Server error", error:error.message})
    }
}


module.exports={Register,Login,Logout,Profile,Admin,Vip};

