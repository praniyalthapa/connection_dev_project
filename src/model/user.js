const mongoose=require('mongoose');
const validator = require('validator');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const userSchema=new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        minLength:4,
        maxLength:50
    },
    lastName:{
        type: String
    },
    email:{
        type: String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
          if(!validator.isEmail(value))
            throw new Error("Invalid email input");
        }
        
    },
    password:{
        type: String,
        required:true,
        validator(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password must be strong"+value);
            }
               
        },
    },
    age:{
        type: Number,
        min:18,
        max:70
    },
    gender:{
        type: String,
      
        //adding custom validation function
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender is not valid");
            }
        },
    },
    photoUrl:{
        type:String,
        default:"https://www.cgg.gov.in/wp-content/uploads/2017/10/dummy-profile-pic-male1-300x300.jpg",
        validate(value){
            if(!validator.isURL(value)){
             throw new Error("This is not a valid url");
            }
        }
    },
    about:{
        type:String,
        default:"This is default paragraph about the programmer information!!"
    },
    skills:{
        type:[String],
       maxLength:15

    }
},{
    timestamps:true //to update 
});



userSchema.methods.getJWT=async function() {
    const user=this;
    const token=await jwt.sign({_id:user._id},"personalProject123##",{expiresIn:"7d"});
    return token;
};


userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user=this;
    const passwordHash=user.password;
    const isPassordValid=await bcrypt.compare(passwordInputByUser,passwordHash);
    return isPassordValid;
}




//create a model
const userModel=mongoose.model("User",userSchema);
module.exports=userModel;