const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const passwordComplexity = require("joi-password-complexity");
const mongoose = require("mongoose"); // Import mongoose
const { User, validation } = require("../models/users");
const router = express.Router();
router.use(express.json());

router.post("/", async (req, res) => {
    try {
        await validation(req.body);

        if (await User.findOne({ email: req.body.email })) {
            return res.status(400).send("User already exists");
        }
        if (!passwordComplexity().validate(req.body.password)) {
            return res.status(400).send("Given password is weak");
        }

        let user = new User(_.pick(req.body, ["name", "email", "password"]));
        const round = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, round);
        user = await user.save();
        const token=user.generateAuthToken()
        res.header("x-auth-token",token).send(_.pick(user, ["_id", "name", "email"]));
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send("Validation error occurred");
        }

        // Handle other errors (e.g., database or server errors)
        console.error('Error:', error);
        return res.status(500).send("Fill Info Correctly");
    }
});

module.exports = router;
