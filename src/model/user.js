const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
        minLength:7,
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
        
    },
    password:{
        type: String,
        required:true
    },
    age:{
        type: Number,
        min:18,
        max:70
    },
    gender:{
        type: String,
        lowercase:true,
        //adding custom validation function
        validate(value){
            if(!["male","female","other"]){
                throw new Error("Gender is not valid");
            }
        },
    },

    photoUrl:{
        type:String,
        default:"https://www.cgg.gov.in/wp-content/uploads/2017/10/dummy-profile-pic-male1-300x300.jpg"
    },
    about:{
        type:String,
        default:"This is default paragraph about the programmer information!!"
    },
    skills:{
        type:[String],

    }
})
//create a model
const userModel=mongoose.model("User",userSchema);
module.exports=userModel;