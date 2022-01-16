import Express from "express";
import cors from "cors";
import dotenv from "dotenv";
const mongoose = require('mongoose');
import CamSocket from "./CamSocket";
import path from "path";

dotenv.config();

const reg = require("./register");
const notFound = require("./404");
const login = require("./login");
const privateRoute = require("./private");
const app = Express();
const ws = new CamSocket();


const port = 3001;
const hostname = "localhost";

const mongoString = "mongodb://localhost:27017/MyDB";


mongoose.connect(mongoString, (err:any, db:any) => {
    console.log("Connected to DB!");
});

// use this in development
//app.use(cors()); 

app.use(Express.json()); // or req.on() and get chunks of data
app.use(reg);
app.use(login);
app.use(privateRoute);
app.use(notFound);
ws.listen();


// this is serving the built react app
// this throws everything to the user
app.use(Express.static(path.join(__dirname, "../../client/build")));

// this redirects everything to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/build") + "/index.html");
});


app.listen(port, hostname, () => {
    console.log("Server listening on " + port);
});