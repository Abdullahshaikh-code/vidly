const mongoose = require('mongoose');
const Joi= require("joi");

const genre_schema=new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50
    }
});

const Genres= mongoose.model("Genre",genre_schema)

function validation(genre){
    const schema= {
        name: Joi.string().min(5).max(50).required()
    };
    return Joi.validate(genre,schema);
}
exports.genreSchema=genre_schema
exports.Genres=Genres;
exports.validation=validation;