const config=require("config");
const mongoose=require("mongoose");
module.exports=function(){
    mongoose.connect(config.get("connectingString"), { useUnifiedTopology: true })
    .then(() => console.log('connected to Database...'))
}