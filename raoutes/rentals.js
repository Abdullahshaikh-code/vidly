const express= require("express");
const mongoose=require("mongoose");
const {movies}=require("../models/movie");
const {Customer}=require("../models/customers");
const {Rental,validation}=require("../models/rentals");
const router=express.Router();
router.use(express.json());

router.get("/",async(req,res)=>{
    const rentals=await Rental.find().sort("-DateOut");
    res.send(rentals);
});
router.get("/:id",async(req,res)=>{
    const rentals= await Rental.findById(req.params.id);
    if (! rentals){
        return res.status(404).send("404 not found")
    }
    res.send(rentals)
});

router.post("/",async(req,res)=>{
    const {error}=validation(req.body);
    if (error) {
      return  res.status(400).send(error.details[0].message);
    }
    
    const customer= await Customer.findById(req.body.customerId);
    if (!customer){return res.status(404).send("404 NOT FOUND")}
    
    const Movies= await movies.findById(req.body.movieId);
    if (!Movies){return res.status(404).send("404 NOT FOUND")}
    if (Movies.numberInStock === 0){return res.status(400).send("Required movie is out of stock")}
    
    let rentals=new Rental({
        customer:{
            _id:req.body.customerId,
            name: customer.name,
            ph: customer.ph,
            IsGold: customer.IsGold
        },
        movie:{
            _id:req.body.movieId,
            title:Movies.title
        },
        dateReturned: req.body.dateReturned,
        rentalFee: req.body.rentalFee
    });
try{
    const session =await mongoose.startSession();
    session.withTransaction(async()=>{
        const rental=rentals.save();
        Movies.numberInStock --;
        Movies.save()
        res.send(rental);
    });
    session.endSession();
}
catch(ex){
    res.status(500).send("Internal Error")
}
    
});
router.put("/:id",async( req,res)=>{
    try{
        const {error}=validation(req.body);
        if (error) {
          return  res.status(400).send(error.details[0].message);
        }
    }
catch(error){
    res.status(400).send("Bad request")
}
    
    const customer= await Customer.findById(req.body.customerId);
    if (!customer){return res.status(404).send("404 NOT FOUND")}
    
    const Movies= await movies.findById(req.body.movieId);
    if (!Movies){return res.status(404).send("404 NOT FOUND")}
try{
    const rental=await Rental.findByIdAndUpdate(req.params.id,{dateReturned:req.body.dateReturned,rentalFee: req.body.rentalFee},{new:true});
    if (! rental){
        return res.status(404).send("404 NOT FOUND")
    };    
    res.send(rental)
}
catch(ex){
    res.status(500).send("Internal error")
}
})

module.exports =router;