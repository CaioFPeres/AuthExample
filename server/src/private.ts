import Express from "express";
import {verifyToken} from "./verifyToken";
const router = Express.Router();

router.get("/Private", verifyToken, async (req, res):Promise<void> => {
    res.end("The server authenticated a private route and answered this message!");
});

module.exports = router;