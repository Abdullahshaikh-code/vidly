const Joi = require('joi');
const mongoose = require('mongoose')

const  users_schema=new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        require: true,
        minlength: 11,
        maxlength: 50,
        match:/^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        unique:true
    },
    password: {
        type: String,
        require:true,
        minlength:8
    }
})

const  User=mongoose.model("users",users_schema)

function validation(User){
    const schema= {
        name: Joi.string().min(5).required(),
        email:Joi.string().min(11).max(50).email().required(),
        password:Joi.string().min(8).required()
    };
    return Joi.validate(User, schema);
}
exports.User=User;
exports.validation=validation;