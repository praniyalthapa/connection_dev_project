const validator=require('validator'); //thsi is npm library

const validateSignUpData=(req)=>{
    const {firstName,lastName,email,password}=req.body;
   if(!firstName || !lastName){
    throw new Error("Name is must while register user");
   }
   else if(!validator.isEmail(email)){
  throw new Error("Email is not in correct order");
   }
else if(!validator.isStrongPassword(password)){
    throw new Error("Password is not strong make sure to make your password strong");
};
 

};
module.exports={
    validateSignUpData
}