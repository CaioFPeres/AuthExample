"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userSchema_1 = require("./userSchema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.post("/Login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // validate
    let { error } = userSchema_1.valSchema.validate(req.body);
    if (error) {
        res.end({ "Message": error.details[0].message });
        return;
    }
    // check user
    let user = yield userSchema_1.userSchema.findOne({ User: req.body.User });
    if (!user) {
        res.json({ "Message": "User or password is invalid!" });
        return;
    }
    const comparePass = yield bcrypt_1.default.compare(req.body.Password, user.Password);
    if (!comparePass) {
        res.json({ "Message": "User or password is invalid!" });
        return;
    }
    // send token
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.json({
        "Token": token,
        "Message": "Logged!"
    });
}));
module.exports = router;
