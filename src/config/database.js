const {mongoose}=require('mongoose');
//to connect with database we use mongoose.connet
const connectDB=async()=>{
   // await mongoose.connect("mongodb+srv://believeme020:ik7UUe9m2ZCDzmvC@devconnection.id1sy.mongodb.net/");
   await mongoose.connect("mongodb://localhost:27017/");
}
//always first connect to server then listen to the server
module.exports=connectDB;
 


// connectDB().then(()=>{
//     console.log("Database connected successfully");
// }).catch(()=>{
//     console.log("Not able to connect to database");
// })