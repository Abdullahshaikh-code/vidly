const config=require("config");
const mongoose=require("mongoose");
const log=require("../startup/logging")

module.exports=function(){
    mongoose.connect(config.get("connectingString"), { useUnifiedTopology: true })
    .then(() => log.logger.info('connected to Database...'))
}