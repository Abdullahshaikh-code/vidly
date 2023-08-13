const express= require("express");
const {Genres,validation}=require("../models/genres")
const router=express.Router();
router.use(express.json());

router.get("/",async(req,res)=>{
    const genres=await Genres.find().sort("name");
    res.send(genres);
});
router.get("/:id",async(req,res)=>{
    const genres= await Genres.findById(req.params.id);
    if (! genres){
        return res.status(404).send("404 not found")
    }
    res.send(genres)
});

router.post("/",async(req,res)=>{
    const {error}=validation(req.body);
    if (error) {
      return  res.status(400).send(error.details[0].message);
    }
    let genres=new Genres({name: req.body.name});
    genres= await genres.save()
    res.send(genres);
});
router.put("/:id",async( req,res)=>{
    const {error}=validation(req.body);
    if (error) {
      return  res.status(400).send(error.details[0].message);
    };
    const genres=await Genres.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
    if (! genres){
        return res.status(404).send("404 NOT FOUND")
    };
    
    res.send(genres)

})
router.delete("/:id",async(req,res)=>{
    const genres=await Genres.findByIdAndDelete(req.params.id);
        if (! genres){
        return res.status(404).send("404 NOT FOUND")
    };
   res.send(genres)
})

module.exports =router;