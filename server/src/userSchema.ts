const mongoose = require('mongoose');
import Joi from "joi";

const schema = new mongoose.Schema({
    User: {
        type: String,
        required: true,
        min: 5
    },
    Password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    }
});

export const valSchema = Joi.object({
    User: Joi.string().min(5).required(),
    Password: Joi.string().min(6).required()
});

export const userSchema = mongoose.model("userSchema", schema, "Users");