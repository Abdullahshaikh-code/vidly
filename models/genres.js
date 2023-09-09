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

async function validation(genre){
    const schema=Joi.object({
        name: Joi.string().min(5).max(50).required()
    });
    try {
        await schema.validateAsync(genre);
        console.log('Validation successful');
    } catch (error) {
        throw error; // Rethrow the validation error
    }
}

exports.genreSchema=genre_schema
exports.Genres=Genres;
exports.validation=validation;