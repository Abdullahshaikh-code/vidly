const express= require("express");
const jwtadmin= require("../MiddleWare/admin");
const jwtauth= require("../MiddleWare/authJwt");
const ValidateObjectId= require("../MiddleWare/validateObjectId");
const mongoose=require("mongoose");   
const {movies}=require("../models/movie");
const {Customer}=require("../models/customers");
const {Rental,validation,Smart_validation}=require("../models/rentals");
const validateObjectId = require("../MiddleWare/validateObjectId");
const router=express.Router();
router.use(express.json());

router.get("/",async(req,res)=>{
    const rentals=await Rental.find().sort("-DateOut");
    res.send(rentals);
});
router.get("/:id",ValidateObjectId,async(req,res)=>{
    const rentals= await Rental.findById(req.params.id);
    if (! rentals){
        return res.status(404).send("404 not found")
    }
    res.send(rentals)
});

router.post("/",async(req,res)=>{
    await validation(req.body)
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
        const session =await mongoose.startSession();
        session.withTransaction(async()=>{
            const rental=await rentals.save();
            Movies.numberInStock --;
            await Movies.save()
            res.send(rental);
        });
        session.endSession();
 
});
router.put("/:id",[jwtauth,jwtadmin,validateObjectId],async( req,res)=>{

        await Smart_validation(req.body);
        if(req.body.customerId&&req.body.movieId){
            const customer= await Customer.findById(req.body.customerId);
            if (!customer){return res.status(404).send("404 NOT FOUND")}
            
            const Movies= await movies.findById(req.body.movieId);
            if (!Movies){return res.status(404).send("404 NOT FOUND")}
                const rental=await Rental.findByIdAndUpdate(req.params.id,{
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
                    dateReturned:req.body.dateReturned,
                    rentalFee: req.body.rentalFee}
                    ,{new:true});
                if (! rental){
                    return res.status(404).send("404 NOT FOUND")
                };    
                res.send(rental)
 
        return;
        }
            if(req.body.movieId){
                    const Movies= await movies.findById(req.body.movieId);
                    if (!Movies){return res.status(404).send("404 NOT FOUND")}
                    const rental=await Rental.findByIdAndUpdate(req.params.id,{
                        movie:{
                            _id:req.body.movieId,
                            title:Movies.title
                        },
                        dateReturned:req.body.dateReturned,
                        rentalFee: req.body.rentalFee}
                        ,{new:true});
                    if (! rental){
                        return res.status(404).send("404 NOT FOUND")
                    };    
                    res.send(rental)

            return;
            }
            if(req.body.customerId){
                    const customer= await Customer.findById(req.body.customerId);
                    if (!customer){return res.status(404).send("404 NOT FOUND")}
                    const rental=await Rental.findByIdAndUpdate(req.params.id,{
                        customer:{
                            _id:req.body.customerId,
                            name: customer.name,
                            ph: customer.ph,
                            IsGold: customer.IsGold
                        },
                        dateReturned:req.body.dateReturned,
                        rentalFee: req.body.rentalFee}
                        ,{new:true});
                    if (! rental){
                        return res.status(404).send("404 NOT FOUND")
                    };    
                    res.send(rental)
            return;
            }
})

module.exports =router;