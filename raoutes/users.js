const express= require("express");
const {User,validation}=require("../models/users")
const router=express.Router();
router.use(express.json());

router.get("/",async(req,res)=>{
    const user=await User.find().sort("name");
    res.send(user);
});
router.get("/:id",async(req,res)=>{
    const user= await User.findById(req.params.id);
    if (!user){
        return res.status(404).send("404 NOT FOUND")
    }
    res.send(user)
});

router.post("/",async(req,res)=>{
    const {error}=validation(req.body);
    if (error) {
      return  res.status(400).send(error.details[0].message);
    }
    let user=new User({
        name: req.body.name,
        email: req.body.ph,
        password: req.body.password
    });
    user= await User.save()
    res.send(user);
});
router.put("/:id",async( req,res)=>{
    const {error}=validation(req.body);
    if (error) {
      return  res.status(400).send(error.details[0].message);
    };
    const user=await User.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        email: req.body.ph,
        password: req.body.password
    },{new:true});
    if (! user){
        return res.status(404).send("404 NOT FOUND")
    };
    
    res.send(user)

})
router.delete("/:id",async(req,res)=>{
    const user=await User.findByIdAndDelete(req.params.id);
        if (!user){
        return res.status(404).send("404 NOT FOUND")
    };
   res.send(user)
})

module.exports =router; 