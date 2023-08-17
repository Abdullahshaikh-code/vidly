const express= require("express");
const bcrypt= require("bcrypt");
const {User}=require("../models/users");
const router=express.Router();
router.use(express.json());


router.post("/",async(req,res)=>{
    const {error}=validation(req.body);
    if (error) {
      return  res.status(400).send(error.details[0].message);
    }
    const User_data=await User.findOne({email:req.body.email})
   if (!User_data){
    res.status(400).send("Invalid Email or Password")
   }
   const password_check=await bcrypt.compare(req.body.password,User_data.password)
   if (!password_check){
    res.status(400).send("Invalid Email or Password")
   }
   res.send(true)
});

module.exports =router; 