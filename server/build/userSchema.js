"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.valSchema = void 0;
const mongoose = require('mongoose');
const joi_1 = __importDefault(require("joi"));
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
exports.valSchema = joi_1.default.object({
    User: joi_1.default.string().min(5).required(),
    Password: joi_1.default.string().min(6).required()
});
exports.userSchema = mongoose.model("userSchema", schema, "Users");
