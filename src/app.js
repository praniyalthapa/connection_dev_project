const express=require('express');
const app=express();

app.use("/hello",(req,res)=>{
    res.send("Response from the server");
    
})
app.use('/auth',(req,res)=>{
    res.send("The authentication of praniyal is done now using this routes")

})
app.use("/",(req,res)=>{
    res.send("Hello praniyal how are you doing to the new project");
})


app.listen(3000,()=>{
    console.log("Server is listening in port 3000...")
})
