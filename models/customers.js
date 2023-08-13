const Joi = require('joi');
const mongoose = require('mongoose')

const  customers_schema=new mongoose.Schema({
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
    }
})

const  Customer= mongoose.model("Customer",customers_schema)

function validation(customer){
    const schema= {
        name: Joi.string().min(5).required(),
        ph:Joi.Number().min(11).max(13).required(),
        IsGold:Boolean()
    };
    return Joi.validate(customer, schema);
}
exports.Customer=Customer;
exports.validate=validation;