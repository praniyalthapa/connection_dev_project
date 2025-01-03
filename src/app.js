const express=require('express');
const connectDB=require('./config/database');
const app=express();
const userModel=require('./model/user');
//first connect db then connect or run the server


app.post("/signup",async (req,res)=>{
    //create a new instace of a usermodel
  const user=new userModel({
    firstName:"Yubika",
    lastName:"Thapa",
    email:"yubkila100@gmail.com",
    password:"yubika@123"
  });
 try{
    await user.save();
    res.send("Data is added successfully");
 }
 catch(e){
    res.status(400).send("Error to create a user"+e.message);
 }
});









connectDB().then(()=>{
    console.log("Database connected successfully");
    app.listen(3000,()=>{
        console.log("Server is listening in port 3000...")
    });
})
  .catch(()=>{
    console.log("Not able to connect to database");
})















































//const {authAdmin,userAuth}=require('../middleware/auth');


// app.use("/hello/praniyal",(req,res)=>{
//     res.send("Hello praniyal you are into /praniyal api request");
// })
// app.use("/hello",(req,res)=>{
//     res.send("Response from the server");
    
//To handle different http request we donr use app.use instead we use app.get,post,delete or put

// app.post("/user/create",(req,res)=>{
//     res.send("User created separetely now");
// })
// app.get("/user",(req,res)=>{
//     res.send({
//         "name":"praniyal thapa",
//         "occupation":"web tester"
//     });
// })
// app.use("/admin",authAdmin);
// // app.use("/user",userAuth);
// app.get("/user/getAllData",userAuth,(req,res)=>{
//     res.send("See all the user authenticated data now");
// })




