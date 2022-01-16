import Express from "express";
const router = Express.Router();

router.post("*", (req, res) => {
    res.end("404");
});

module.exports = router;