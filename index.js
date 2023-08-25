const log=require("./startup/logging")
const express=require("express");
const app=express();
require("./startup/config")()
require("./startup/routes")(app)
require("./startup/database")()


const port = process.env.port  || 3000;
app.listen(port,()=>{
    log.logger.info(`Server listening on ${port}`); 
})