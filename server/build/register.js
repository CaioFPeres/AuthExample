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
const router = express_1.default.Router();
router.post("/Registration", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // validate
    let { error } = userSchema_1.valSchema.validate(req.body);
    if (error) {
        res.json({ "Message": error.details[0].message });
        return;
    }
    // check user
    let userExist = yield userSchema_1.userSchema.findOne({ User: req.body.User });
    if (userExist) {
        res.json({ "Message": "User already exists!" });
        return;
    }
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(req.body.Password, salt);
    const user = new userSchema_1.userSchema({
        User: req.body.User,
        Password: hashedPassword
    });
    try {
        const savedUser = yield user.save();
    }
    catch (err) {
        res.json({ "Message": err });
        return;
    }
    res.json({
        "Registered": true,
        "Message": "Registered!"
    });
}));
module.exports = router;
