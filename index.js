const express=require("express");
const app=express();
require("./startup/logging")();
require("./startup/config")();
require("./startup/routes")(app);
require("./startup/database")();
require("./startup/prod")(app);

const port = process.env.port  || 3000;
const server=app.listen(port,()=>{console.log(`Server listening on ${port}`);})
module.exports=server;