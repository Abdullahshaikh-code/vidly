const config=require("config");
const mongoose=require("mongoose");
const express=require("express");
const app=express();
const movie= require("./raoutes/movie");
const authentication= require("./raoutes/authentication");
const genre= require("./raoutes/genres");
const customers=require("./raoutes/customers");
const user=require("./raoutes/users")
const rentals= require("./raoutes/rentals");


if (!config.get("jwtPrivateKey")){
  console.error("FATAL ERROR:jwt Private Key is not defined")
  process.exit(1);
}

mongoose.connect("mongodb://127.0.0.1:27017/vidly")
  .then(()=> console.log('connected to Databas...'))
  .catch((err)=>console.error('could not connect to database',err));
app.use("/api/user",user)
app.use("/api/auth",authentication)
app.use("/api/rentals",rentals)
app.use("/api/movies",movie)
app.use("/api/genres",genre)
app.use("/api/customers",customers)

const port = process.env.port  || 3000;
app.listen(port,()=>{
    console.log(`Server listening on ${port}`); 
})