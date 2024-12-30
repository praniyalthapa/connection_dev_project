const express=require('express');
const app=express();

app.use("/hello",(req,res)=>{
    res.send("Response from the home server");
    
})
app.use("/",(req,res)=>{
    res.send("Hello praniyal how are you doing to the new project");
})


app.listen(3000,()=>{
    console.log("Server is listening in port 3000...")
})
