import Express from "express";
import { valSchema, userSchema } from "./userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = Express.Router();

router.post("/Login", async (req, res):Promise<void> => {

    // validate
    let {error} = valSchema.validate(req.body);
    
    if(error){
        res.json({"Message": error.details[0].message});
        return;
    }


    // check user
    let user = await userSchema.findOne({User: req.body.User});


    if(!user){
        res.json({"Message": "User or password is invalid!"});
        return;
    }


    const comparePass = await bcrypt.compare(req.body.Password, user.Password);

    if(!comparePass){
        res.json({"Message": "User or password is invalid!"});
        return;
    }

    
    // send token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET as jwt.Secret);
    res.json({
        "Token": token,
        "Message": "Logged!"
    });
})

module.exports = router;