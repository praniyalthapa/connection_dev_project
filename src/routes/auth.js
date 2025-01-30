const express=require('express');
 const router = express.Router();
 const {validateSignUpData}=require('../utils/validation');
 const userModel=require('../model/user');
 const jwt=require('jsonwebtoken');
 const bcrypt = require('bcrypt');

router.post("/signup",async(req,res)=>{
    //console.log(req.body);
    //get all the data from the database
    try{
      //validation for data
      validateSignUpData(req);
    //hash the password
    const {password,firstName,lastName,email}=req.body;
    const hashedPassword=await bcrypt.hash(password,10);
    console.log(hashedPassword);
    //create a new instance of user model
    //const user=new userModel(req.body); //it is a way what should be included in database when signing up 
    const user=new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    //validate the user data
      await user.save();
      res.send("User created successfully into database");
    }
    catch(e){
    res.status(400).send("ERROR:"+e.message);
    }
    });
    
//login api
router.post("/login",async(req,res)=>{
    try{
  //validate email and password is present or not
  const {email,password}=req.body;
  const user=await userModel.findOne({email:email});
  
  console.log(user);
  if(!user){
    throw new Error("Invalid credentials");
  }
  //const isPassordValid=await bcrypt.compare(password,user.password);
  const isPassordValid=await user.validatePassword(password);
  console.log(isPassordValid);
  if(isPassordValid){
   //provide a jwt token to the user
   // const token=jwt.sign({_id:user._id},"personalProject123##",{expiresIn:"1d"});
   const token=await user.getJWT();
   //send back to user
   res.cookie("token",token,{expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httpOnly: true });
   console.log(token);
   res.send("User logged in sucessfully!!");
  }
  else{
    throw new Error("Invalid Credentials!!");
  }
    }
    catch(e){
      res.status(400).send("ERR"+e.message);
    }
  });

router.post("/logout",async(req,res)=>{
  res.cookie("token",null,{
    expires:new Date(Date.now()),
  });
  res.send("Logout successfully!!!");
});





module.exports=router;