import Express from "express";
import { valSchema, userSchema } from "./userSchema";
import bcrypt from "bcrypt";
const router = Express.Router();


router.post("/Registration", async (req, res):Promise<void> => {

    // validate
    let {error} = valSchema.validate(req.body);

    if(error){
        res.json({"Message": error.details[0].message});
        return;
    }

    // check user
    let userExist = await userSchema.findOne({User: req.body.User});

    if(userExist){
        res.json({"Message": "User already exists!"});
        return;
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.Password, salt);

    
    const user = new userSchema({
        User: req.body.User,
        Password: hashedPassword
    });

    
    try{
        const savedUser = await user.save();
    }
    catch (err) {
        res.json({"Message": err });
        return;
    }

    res.json({
        "Registered": true,
        "Message": "Registered!"
    });
});

module.exports = router;