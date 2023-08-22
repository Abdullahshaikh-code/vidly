const express= require("express");
const bcrypt= require("bcrypt");
const Joi = require('joi');
const {User}=require("../models/users");
const router=express.Router();
router.use(express.json());

router.post("/",async(req,res)=>{
  try {
   await validation(req.body);
   const User_data=await User.findOne({email:req.body.email})
   if (!User_data){
    return res.status(400).send("Invalid Email or Password")
   }
   const password_check=await bcrypt.compare(req.body.password,User_data.password)
   if (!password_check){
   return res.status(400).send("Invalid Email or Password")
   }
   const token=User_data.generateAuthToken()
   res.send(token)
}
catch (error) {
  // Handle other errors (e.g., database or server errors) 
  return res.status(500).send("Fill Info Correctly");
}
});

async function validation(User) {
  const schema = Joi.object({
      email: Joi.string().min(11).max(50).email().required(),
      password: Joi.string().min(8).required()
  });

  try {
      await schema.validateAsync(User);
      console.log('Validation successful');
  } catch (error) {  
    throw error; // Rethrow the validation error
  }
}

module.exports =router; 