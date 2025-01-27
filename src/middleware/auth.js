///this is basic auth method which check the things which a logged in user must be able to perfom otherwise throw new erro

const jwt=require('jsonwebtoken');
const userModel = require('../model/user');
const userAuth=async(req,res,next)=>{
//read token from req cookies
//validate the token
//validate whether the user exist or not 
try{
//after login the checks are complete that is email and password
//so user will get a token inside cookies so check if it is valid or not
//to check first get the cookie and then get token from inside the cookie
    const {token}=req.cookies;
    if(!token){
        throw new Error("Token is not valid");
    }
    console.log(token);
    //if token is send and token exists then checks for whether the token is from authenticated user or not by using jwt library

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
