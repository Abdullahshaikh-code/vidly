const config=require("config");
module.exports=function(){
    if (!config.get("jwtPrivateKey")){
        
        log.logger.error( new Error("FATAL ERROR:jwt Private Key is not defined"))
        process.exit(1)
      }
}