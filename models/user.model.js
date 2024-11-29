const mongoose=require('mongoose')
const validator=require('validator')
/*here i have just created a basic user database called User where i will be storing some imp
information about them along with role they have received which is imp for RBAC .*/

const userSchema=new mongoose.Schema({
     name:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true,
        validate:{
         validator: validator.isEmail,
         message: "Invalid email format",
        }
     },
     password:{
        type:String,
        required:true,
     },
     role:{
        type:String,
        default:"user",
        enum:["user","admin","moderator"]
     }

},{
    timestamps:true
})

module.exports=mongoose.model("User",userSchema);
