const express= require("express");
const bcrypt= require("bcrypt");
const validation=require("../models/auth")
const {User}=require("../models/users");
const router=express.Router();
router.use(express.json());

router.post("/",async(req,res)=>{
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
});
module.exports =router; 