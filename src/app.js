const express=require('express');
const connectDB=require('./config/database');
const app=express();
const userModel=require('./model/user');
//first connect db then connect or run the server
app.use(express.json()); //using express middleware



app.post("/signup",async(req,res)=>{
//console.log(req.body);
//get all the data from the database
const user=new userModel(req.body);
try{
  user.save();
  res.send("User created successfully into database");
}
catch(e){
res.status(400).send("Not able to create database");
}
});


app.get("/feed",async (req,res)=>{
  //const email=req.body.email;  //taking email from the req of postman
  const emailId=req.body.email;
  try{
   const userEmail= await userModel.findOne({email:emailId}); //find() finds all and findOne finds only one 
    if(userEmail==0){
  res.status(404).send("User data not found! Please enter a valid user email");
  }
   else{
   res.send(userEmail);  
   }
 }
  catch(e){
   res.status(400).send("We can't find the email from the request");
  }
});
//fetcg all the data from database
app.get("/getAll",async (req,res)=>{
  try{
    const getusers= await userModel.find({});
  res.send(getusers);
  }
  catch(e){
    res.status(400).send("No any users were found from the database");
  }

})

//first connect db then connect or run the server
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




