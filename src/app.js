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
  await user.save();
  res.send("User created successfully into database");
}
catch(e){
res.status(400).send("Not able to create database");
}
});


app.get("/user",async (req,res)=>{
  //const email=req.body.email;  //taking email from the req of postman
  const emailId=req.body.email;
  try{
   const userEmail= await userModel.findOne({email:emailId}); //find() finds all and findOne finds only one 
  if(!userEmail){
    res.status(400).send("No any user in the database");
  }
  else{
    res.send(userEmail);
  }
//     if(userEmail==0){
//   res.status(404).send("User data not found! Please enter a valid user email");
//   }
//    else{
//    res.send(userEmail);  
//    }
  }
  catch(e){
   res.status(400).send("We can't find the email from the request");
  }
});


//api for finding by id and delete it 
app.delete("/user",async(req,res)=>{
  const userId=req.body.userId;
  
  try{
    // const user=await userModel.findByIdAndDelete({_id:userId});
      const user=await userModel.findByIdAndDelete(userId);
      res.send("User deleted successfully");
  }
  catch(e){
    res.status(404).send("Something went wrong!!");
  }
});

//update the data of the user
app.patch("/user/:userId",async(req,res)=>{
  const userId=req.params?.userId;
  console.log("userId=",userId);
  const data=req.body;
  console.log(data);

  try{

    const AllowedUpdates = [
     "firstName", "lastName", "age", "gender","skills","about","photoUrl"
    ];
    // Check if all keys in 'data' are allowed
    const isUpdateAllowed = Object.keys(data).every((k) =>
       AllowedUpdates.includes(k)
  
    );
  
    if (!isUpdateAllowed) {
      throw new Error("Not able to update please check it");
    }
    if(data?.skills.length > 10){
      throw new Error("Skills cannot exceed more than 10");
    }
    
    
    const user= await userModel.findByIdAndUpdate({_id:userId},data,{
      returnDocument:"after",
      runValidators:true, //this for making changes for existing user+new user both
    })
    console.log(user);
res.send("User updated successfully hurray!!!");
  
  }
  catch(e){
    res.status(404).send("Something went wrong!!"+e.message);
  }
})



//fetch all the data from database
app.get("/feed",async(req,res)=>{
  try{
    
    const getingAll=await userModel.find({});
    if(!getingAll){
      res.status(404).send("Database is empty");
    }
    else{
     res.send(getingAll);
    }
    
  }
  catch(e){
    res.status(404).send("OOPS! Users from the database are not found!!");
  }
})
app.delete("/user");


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




