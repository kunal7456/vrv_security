const express=require("express");
const { Register, Login, Logout, Profile, Admin, Vip } = require("../controllers/user.controller");
const {isLoggedIn,authorizeRoles} = require("../middleware/users.middleware");
const app=express.Router();

/* normal registering route . Can be accessed by all users. */

app.post('/register',Register);

/* This route is used for loggin in to our web . Can be accessed by all users . */

app.post('/login',Login);

/*This route is used for clearing all the cookies so that user successfully logs out*/

app.get('/logout',Logout);

/*This route can only be accessed by users who are currently logged in */

app.get('/profile',isLoggedIn,Profile)

/* This route can be accessed by users who are logged in and are admin (RBAC) */

app.get('/admin',isLoggedIn,authorizeRoles(['admin']),Admin)

/* This route can be accessed by users who are logged in and are admin or moderators (RBAC) */

app.get('/vip',isLoggedIn,authorizeRoles(['admin','moderator']),Vip)

/* hence i have successfully created routes which can handle whether users are authenticated using loggedIn and whether they are authorized to perform 
actions using authrizeRoles middleware . Hence its a completely secure system */

module.exports=app;