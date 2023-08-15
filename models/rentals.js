const mongoose = require('mongoose');
const Joi= require("joi");
Joi.objectId=require("joi-objectid")(Joi);

const rental_schema=new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({    
            name: {
            type: String,
            require: true,
            minlength: 5,
            maxlength: 50
            },
            ph: {
            type: Number,
            require: true,
            minlength: 11,
            maxlength: 13
            },
            IsGold: {
            type: Boolean,
            default:false
            }}),
        require: true,
        },
    movie:{
        type: new mongoose.Schema({
            title:{ 
            type: String,
            require: true,
            minlength: 3,
            maxlength: 30
            }})},
    dateOut:{
        type: Date,
        default: Date.now,
        require: true
        },
    dateReturned:{
        type: Date,
        default: "Not return yet"
        },
    rentalFee:{
        type: Number,
        min:0
    }
});

const rental= mongoose.model("Rentals",rental_schema)

function validation(rental){
    const schema= {
      customerId:Joi.objectId().required(),
      movieId:Joi.objectId().required(),
      dateReturned:Joi.date(),
      rentalFee:Joi.number()
    };
    return Joi.validate(rental,schema);
}
function Smart_validation(rental){
    const schema= {
      customerId:Joi.objectId(),
      movieId:Joi.objectId(),
      dateReturned:Joi.date(),
      rentalFee:Joi.number()
    };
    return Joi.validate(rental,schema);
}
exports.Rental=rental;
exports.validation=validation;
exports.Smart_validation=Smart_validation