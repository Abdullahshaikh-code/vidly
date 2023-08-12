const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema}=require("./genres");
const movie_schema =new mongoose.Schema({
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

function validation(movies){
    const schema={
        Title: Joi.string().minlength(3).maxlength(30).require(),
        numberInStock: Joi.number().min(0).max(255).require(),
        dailyRentalRate: Joi.number().min(0).max(255).require(),
        genre:Joi.string().minlength(5).maxlength(50).require()
    }
    return joi.validate(movies,schema)
}
exports.movies=movies;
exports.validate=validation;
