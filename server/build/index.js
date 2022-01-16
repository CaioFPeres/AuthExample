"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose = require('mongoose');
const ws_1 = __importDefault(require("ws"));
const CamSocket_1 = __importDefault(require("./CamSocket"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const reg = require("./register");
const notFound = require("./404");
const login = require("./login");
const privateRoute = require("./private");
const app = (0, express_1.default)();
const ws = new CamSocket_1.default();
const port = 3001;
const hostname = "localhost";
const mongoString = "mongodb://localhost:27017/MyDB";
// this is serving the built react app
// this throws everything to the user
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/build")));
// this redirects everything to index.html
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../client/build") + "/index.html");
});
mongoose.connect(mongoString, (err, db) => {
    console.log("Connected to DB!");
});
app.use(express_1.default.json()); // or req.on() and get chunks of data
app.use(reg);
app.use(login);
app.use(privateRoute);
app.use(notFound);
ws.listen();
function testingClient() {
    let clients = [
        new ws_1.default('ws://localhost:8080'),
        new ws_1.default('ws://localhost:8080')
    ];
    clients.forEach(client => {
        client.on('message', msg => console.log(msg.toString()));
    });
    clients.forEach(client => {
        client.once("open", () => {
            client.send("HELLO");
        });
    });
}
app.listen(port, hostname, () => {
    console.log("Server listening on " + port);
});
