const jwt=require('jsonwebtoken');
const userModel = require('../model/user');



const userAuth=async(req,res,next)=>{
//read token from req tookies
//validate the token
//validate whether the user exist or not 

try{

    const {token}=req.cookies;
    if(!token){
        throw new Error("Token is not valid");
    }
    console.log(token);
    const decodedObj=await jwt.verify(token,"personalProject123##");
    const {_id}=decodedObj;
    const user=await userModel.findById(_id);
    if(!user){
        throw new Error("User not found");

    }
    req.user=user;
    next(); //if user found then send to next middleware

}
catch(e){
    res.status(400).send("Error occured"+e.message);
}

}

module.exports={
    userAuth
};