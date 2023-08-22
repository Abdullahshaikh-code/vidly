const jwt=require("jsonwebtoken");
const config=require("config");
function auth(req,res,next){
    const jwttoken=req.header("x-auth-token");
    if(!jwttoken){return res.status(401).send("Access denied. No token provided")}
    try{
        const decode=jwt.verify(jwttoken,config.get( "jwtPrivateKey"));
        console.log(decode)
        req.user=decode;
        next()
    }
    catch(error){
        res.status(400).send("Invalid token")
    }
}
module.exports=auth;