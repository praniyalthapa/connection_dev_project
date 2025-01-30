const express=require('express');
const router=express.Router();
const {userAuth}=require('../middleware/auth');
const { validateProfileEditData } = require('../utils/validation');
//const {validateProfileEditData}=require('../utils/validation');
//api to view profile
router.get("/profile/view",userAuth,async(req,res)=>{
    try{
      const user=req.user;
      res.send(user);
    }
    catch(e){
      res.status(400).send("Invalid user"+e.message);
    }
  });
router.patch("/profile/edit",userAuth,async(req,res)=>{
   try{
    if(!validateProfileEditData){
      throw new Error("Invalid things are not able to edit");
    }
     
   }
   catch(e){
    res.status(400).send("Error: "+e.message);
   }


});
  
router.get("/user",async (req,res)=>{
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
  

module.exports=router;