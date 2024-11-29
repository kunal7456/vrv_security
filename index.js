const { config } = require('dotenv');
const express=require('express');
const connectDB = require('./utility');
const cookieParser = require('cookie-parser');
const cors=require('cors')
const app=express();
const userRoutes=require('./routes/user.routes.js')
config({
    path:'.env'
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors());

connectDB();

/* This file basically starts the server and listens for incoming connections on the specified port. */

app.use("/api/v1/",userRoutes);

app.listen(process.env.PORT_NO,()=>{
    console.log(`Server started at PORT ${process.env.PORT_NO}`);
})

