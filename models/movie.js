const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema}=require("./genres");
const movie_schema =new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title:{ 
    type: String,
    require: true,
    minlength: 3,
    maxlength: 30
    },
    numberInStock:{
        type: Number,
        min:0,
        max:255,
        require: true, 
    },
    dailyRentalRate:{
        type: Number,
        min:0,
        max:255,
        require: true
    },
    genre:{
        type: genreSchema,
        require: true
    }
});

const movies=mongoose.model("movies",movie_schema)

async function validation(movies){
    const schema=Joi.object({
        title: Joi.string().min(3).max(30).required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required(),
        genre:Joi.object({name:Joi.string().min(5).max(50).required()}).required()
    })

    await schema.validateAsync(movies);
    console.log('Validation successful');

}
exports.movies=movies;
exports.validation=validation;
