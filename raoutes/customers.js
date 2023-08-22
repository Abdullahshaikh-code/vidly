const express= require("express");
const jwtadmin= require("../MiddleWare/admin");
const jwtauth= require("../MiddleWare/authJwt");
const {Customer,validation}=require("../models/customers")
const router=express.Router();
router.use(express.json());

router.get("/",async(req,res)=>{
    const customer=await Customer.find().sort("name");
    res.send(customer);
});
router.get("/:id",async(req,res)=>{
    const customer= await Customer.findById(req.params.id);
    if (!customer){
        return res.status(404).send("404 NOT FOUND")
    }
    res.send(customer)
});

router.post("/",async(req,res)=>{
    try {
        await validation(req.body);
        let customer=new Customer({
            name: req.body.name,
            ph: req.body.ph,
            IsGold: req.body.IsGold
        });
        try{
            customer= await customer.save()
            res.send(customer);
        }
        catch(error){
            return  res.status(500).send(error.details[0].message);    
        }
    }
    catch(error){
        return  res.status(400).send(error.details[0].message);  
    }
    
});
router.put("/:id",async( req,res)=>{
    try {
        await validation(req.body);
        const customer=await Customer.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            ph: req.body.ph,
            IsGold: req.body.IsGold
        },{new:true});
        if (! customer){
            return res.status(404).send("404 NOT FOUND")
        };
        
        res.send(customer)
    
    }
    catch(error){
        return  res.status(400).send(error.details[0].message);  
    }
   
})
router.delete("/:id",[jwtauth,jwtadmin],async(req,res)=>{
    const customer=await Customer.findByIdAndDelete(req.params.id);
        if (! customer){
        return res.status(404).send("404 NOT FOUND")
    };
   res.send(customer)
})

module.exports =router; 