const mongoose=require("mongoose");

/* a utility function which basically connects our backend to mongodb*/

const connectDB=(async ()=>{
    try {
        const db=await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_name}`)
        console.log('mongoDB connected');
    } catch (error) {
        console.log(error)
    }
})

module.exports=connectDB;