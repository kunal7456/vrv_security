
# RBAC Based Secure System

This project is a Role-Based Access Control (RBAC) system built with Node.js and Express.js to handle secure authentication and authorization. It uses JWT tokens for managing user sessions and ensures that access to resources is based on user roles like Admin, Moderator, or User.

Key Features
1)Authentication: Users can register, log in, and log out securely.
2)Role-Based Authorization: Different roles have specific permissions to access or manage resources.
3)Token Management
4)Security Best Practices: Includes password hashing, secure cookies, and middleware to validate access.

The system is designed for flexibility and can be integrated into any application requiring secure user authentication and access control.


Drive Link for proper output from Postman showing all the features . 
https://docs.google.com/document/d/1liIWqVOYL44ZGOVGxvQuNPgxYCnMwdidoD8sQAAXGts/edit?addon_store&tab=t.0

# Setting up project 
 To Run this project follow following steps :
```
1)git clone (https://github.com/kunal7456/vrv_security.git)
2)cd <repository-folder>
3) npm i
4) npm run start
```
I have used local mongoDB in this project so if you want to use mongodb atlas just change the .env file . 