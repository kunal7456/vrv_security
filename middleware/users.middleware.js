const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

/*here i have just checked if user is LoggedIn by checking the cookies present and verifying it using jwt . If its a valid 
user i got its data which i passed into req body */

const isLoggedIn = async(req, res, next) => {
  if (!req.cookies || !req.cookies.token) {
    return res.status(401).send("Log In First");
  }
  try {
    const data = jwt.verify(req.cookies.token, "pass");
    userdata= await User.findById(data.userid).select('-password -createdAt -updatedAt');
    req.user = userdata;
    next();
  } catch (err) {
    return res.status(403).send("Invalid or expired token");
  }
};

/*here i have implemented role based secure system where i am checking whether the user role is matching the allowed roles for a given route .
 and since i have stored user data from isLoggedIn middleware i can use it directly here */ 

const authorizeRoles= (allowedRoles)=>{
     return async (req,res,next)=>{
        if(!req.user || !allowedRoles.includes(req.user?.role)){
           return res.status(403).json({
            message:"You are not authorized to perform this action"
           })
        }
        next();
     }
}

module.exports = {isLoggedIn,authorizeRoles};