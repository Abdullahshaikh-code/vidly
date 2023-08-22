const jwt=require("jsonwebtoken");
const config=require("config");
function auth(req,res,next){
    const jwttoken=req.header("x-auth-toke");
    if(!toke){return res.status(401).send("Access denied. No token provided")}
    try{
        const decode=jwt.verify(jwttoken,config.get( "jwtPrivateKey"));
        req.user=decode;
        next()
    }
    catch(error){
        res.status(400).send("Invalid token")
    }
}
module.exports=auth;