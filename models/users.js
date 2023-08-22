const jwt=require("jsonwebtoken");
const config=require("config");
const Joi = require('joi');
const mongoose = require('mongoose')

const  users_schema=new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50,
        require: true
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
        minlength:8,
        require: true
    },
    isAdmin:{
        type:Boolean,
        default:false,
        require:true
    }
})
users_schema.methods.generateAuthToken=function(){
     token= jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get( "jwtPrivateKey"))
     return token
}
const  User=mongoose.model("users",users_schema)

async function validation(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().min(11).max(50).email().required(),
        password: Joi.string().min(8).required(),
        isAdmin:Joi.boolean().required()
    });

    try {
        await schema.validateAsync(user);
        console.log('Validation successful');
    } catch (error) {
        throw error; // Rethrow the validation error
    }
}
exports.User=User;
exports.validation=validation;