const config=require("config");
const winston = require('winston');
// require('winston-mongodb');
require("express-async-errors")
module.exports=function(){
 winston.createLogger({
  transports: [
    new winston.transports.File({ filename: "./logs/errors.log",level:"error" }),
    // new winston.transports.MongoDB({
    //   db: config.get("connectingString"),
    //   options: { useUnifiedTopology: true },
    //   level: "info"
    // }),
    new winston.transports.File({
      filename: "./logs/errors.log",
      handleExceptions: true, /* set this option to true */
      handleRejections: true, /* set this option to true */
    }),
  ]
})};
// Configure exception and rejection handlers


  
