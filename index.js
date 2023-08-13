const mongoose=require("mongoose")
const express=require("express");
const app=express();
const movie= require("./raoutes/movie");
const genre= require("./raoutes/genres");
const customers=require("./raoutes/customers");
mongoose.connect("mongodb://127.0.0.1:27017/vidly")
  .then(()=> console.log('connected to Databas...'))
  .catch((err)=>console.error('could not connect to database',err));

app.use("/api/movies",movie)
app.use("/api/genres",genre)
app.use("/api/customers",customers)
const port = process.env.port  || 3000;
app.listen(port,()=>{
    console.log(`Server listening on ${port}`); 
})