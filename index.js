const mongoose=require("mongoose");
const express=require("express");
const app=express();
const movie= require("./raoutes/movie");
const genre= require("./raoutes/genres");
const customers=require("./raoutes/customers");
const rentals= require("./raoutes/rentals");
mongoose.connect("mongodb://127.0.0.1:27017/vidly")
  .then(()=> console.log('connected to Databas...'))
  .catch((err)=>console.error('could not connect to database',err));
app.use("/api/rentals",rentals)
app.use("/api/movies",movie)
app.use("/api/genres",genre)
app.use("/api/customers",customers)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(400).json({
      error: 'Bad request'
  });
});
const port = process.env.port  || 3000;
app.listen(port,()=>{
    console.log(`Server listening on ${port}`); 
})