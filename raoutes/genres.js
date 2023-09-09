const jwtauth= require("../MiddleWare/authJwt");
const jwtadmin= require("../MiddleWare/admin");
const ValidateobjectId= require("../MiddleWare/validateObjectId");
const express= require("express");
const {Genres,validation}=require("../models/genres");
const validateObjectId = require("../MiddleWare/validateObjectId");
const router=express.Router();
router.use(express.json());

router.get("/",async(req,res)=>{
    const genres=await Genres.find().sort("name");
    res.send(genres);
});
router.get("/:id",validateObjectId,async(req,res)=>{
    const genres= await Genres.findById(req.params.id);
    if (! genres){
        return res.status(404).send("404 not found")
    }
    res.send(genres)
});

router.post("/",jwtauth,async(req,res)=>{
        await validation(req.body);
        let genres=new Genres({name: req.body.name});
        genres= await genres.save()
        res.send(genres);
});
router.put("/:id",jwtauth,async( req,res)=>{
        await validation(req.body);
        const genres=await Genres.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
        if (! genres){
            return res.status(404).send("404 NOT FOUND")
        };
        res.send(genres)    
})
router.delete("/:id",[jwtauth,jwtadmin,validateObjectId],async(req,res)=>{
    const genres=await Genres.findByIdAndDelete(req.params.id);
        if (! genres){
        return res.status(404).send("404 NOT FOUND")
    };
   res.send(genres)
})

module.exports =router;