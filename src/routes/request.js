const express=require('express');
const router=express.Router();
const {userAuth}=require('../middleware/auth');



router.post("/sendConnectionRequest",userAuth,async(req,res)=>{ //this middleware first checks if we logged in (token is valid then only this works);
    console.log("connection req sending");
    
    res.send(req.user.firstName + "Send the connection request");
  });
  




module.exports=router;