const express=require('express');
const app=express();



// app.use("/hello/praniyal",(req,res)=>{
//     res.send("Hello praniyal you are into /praniyal api request");
// })
// app.use("/hello",(req,res)=>{
//     res.send("Response from the server");
    
// })
// app.use('/auth',(req,res)=>{
//     res.send("The authentication of praniyal is done now using this routes")

// })
// app.use("/",(req,res)=>{
//     res.send("Hello praniyal how are you doing to the new project");
// })
//To handle different http request we donr use app.use instead we use app.get,post,delete or put

app.post("/user/create",(req,res)=>{
    res.send("User created separetely now");
})
app.get("/user",(req,res)=>{
    res.send({
        "name":"praniyal thapa",
        "occupation":"web tester"
    });
})


app.listen(3000,()=>{
    console.log("Server is listening in port 3000...")
})
