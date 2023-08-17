const express= require("express");
const _= require("lodash");
const bcrypt= require("bcrypt");
const passwordComplexity= require("joi-password-complexity");
const {User,validation}=require("../models/users");
const router=express.Router();
router.use(express.json());


router.post("/",async(req,res)=>{
    const {error}=validation(req.body);
    if (error) {
      return  res.status(400).send(error.details[0].message);
    }
   if (await User.findOne({email:req.body.email})){
    res.status(400).send("User already exist")
   }
   if (!passwordComplexity().validate(req.body.password)){
    res.status(400).send("Give password is week")
   }
   
   let user=new User(_.pick(req.body),["name","email","password"]);
   const round=await bcrypt.genSalt(10)
   user.password=await bcrypt.hash(user.password,round)
   user= await user.save()
    res.send(_.pick(user,["_id","name","email"]));
});

module.exports =router; 