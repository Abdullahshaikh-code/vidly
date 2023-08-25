const Joi = require('joi');
async function validation(User) {
    const schema = Joi.object({
        email: Joi.string().min(11).max(50).email().required(),
        password: Joi.string().min(8).required()
    });
  
    try {
        await schema.validateAsync(User);
        console.log('Validation successful');
    } catch (error) {  
      throw error; // Rethrow the validation error
    }
  }
exports.validation=validation;