const express= require("express");
const {movies,validation}=require("../models/movie")
const {Genres}=require("../models/genres");
const router=express.Router();
router.use(express.json());

router.get("/",async(req,res)=>{
    const Movies=await movies.find().sort("name");
    res.send(Movies);
});
router.get("/:id",async(req,res)=>{
    const Movies= await movies.findById(req.params.id);
    if (!Movies){
        return res.status(404).send("404 NOT FOUND")
    }
    res.send(Movies)
});

router.post("/",async(req,res)=>{
    const {error}=validation(req.body);
    if (error) {
      return  res.status(400).send(error.details[0].message);
    }
    let Movies=new movies({
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: req.body.genre
    });
    let genres=new Genres({name: req.body.genre.name});
    genres= await genres.save()
    Movies= await Movies.save()
    res.send(Movies);
});
router.put("/:id",async( req,res)=>{
    const {error}=validation(req.body);
    if (error) {
      return  res.status(400).send(error.details[0].message);
    };
    const Movies=await movies.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: req.body.genre
    },{new:true});
    if (!Movies){
        return res.status(404).send("404 NOT FOUND")
    };
    res.send(Movies)

})
router.delete("/:id",async(req,res)=>{
    const Movies=await movies.findByIdAndDelete(req.params.id);
        if (! Movies){
        return res.status(404).send("404 NOT FOUND")
    };
   res.send(Movies)
})

module.exports =router; 