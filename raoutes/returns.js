const express= require("express");
const jwtadmin= require("../MiddleWare/admin");
const jwtauth= require("../MiddleWare/authJwt");
const validate= require("../MiddleWare/validate");
const {movie}=require("../models/movie");
const {Rental}=require("../models/rentals");
const router=express.Router();
router.use(express.json());
router.post("/",[jwtauth,jwtadmin,validate(validateReturn)],async(req,res)=>{
const rental=await Rental.lookup(req.body.customerId,req.body.movieId)
if (!rental) return res.status(404).send('Rental not found.');
if (rental.dateReturned) return res.status(400).send('Return already processed.');
rental.return();
await rental.save();
await movie.update({_id:rental.movie._id},{
    $inc:{numberInStock:1}
})
})


async function validateReturn(req){
    const schema= Joi.object({
      customerId:Joi.objectId().required(),
      movieId:Joi.objectId().required()
    });
    try {
        await schema.validateAsync(req);
        console.log('Validation successful');
    } catch (error) {
        throw error; // Rethrow the validation error
    }
}
module.exports = router;