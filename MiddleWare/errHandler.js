const mongoose = require("mongoose");
module.exports = function (error, req, res, next) { 
    if (error instanceof mongoose.Error || error.name.startsWith('Mongo')) {
        return res.status(500).send("Something failed");
    }
    // Handle other errors (e.g., database or server errors)
    return res.status(400).send("Validation Error");
}
