const express=require('express');
const app=express();


const {authAdmin,userAuth}=require('../middleware/auth');
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
app.use("/admin",authAdmin);

// app.use("/user",userAuth);
app.get("/user/getAllData",userAuth,(req,res)=>{
    res.send("See all the user authenticated data now");
})











app.listen(3000,()=>{
    console.log("Server is listening in port 3000...")
})
