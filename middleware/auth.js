const authAdmin=(req,res,next)=>{
    console.log("Admin is checked for auth");
    const token="xyz123";
    if(token!=="xyz123"){
        res.status(404).send("User is not authorize now");
    }
    else{
        next();
    }
}
const userAuth=(req,res,next)=>{
    console.log("User is checked for auth");
    const token="xyz1234";
    if(token!=="xyz1234"){
        res.status(404).send("User is not authorize now");
    }
    else{
        next();
    }
}

module.exports={
    authAdmin,userAuth
}
