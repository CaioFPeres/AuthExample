"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class CamSocket {
    constructor() {
        this.sockets = [];
        this.ws = new ws_1.default.Server({ path: "/mainCams", port: 8080 });
    }
    listen() {
        this.ws.on("connection", (socket, req) => {
            var _a;
            let token = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split("token=", req.url.length)[1];
            try {
                const verified = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
            }
            catch (err) {
                socket.send(JSON.stringify({
                    "Error": "Needs to be authenticated!"
                }));
                socket.close();
                return;
            }
            this.sockets.push(socket);
            socket.on("message", (msg) => {
                socket.send(msg);
            });
            socket.on("close", () => {
                this.sockets = this.sockets.filter(s => s !== socket);
            });
        });
    }
}
exports.default = CamSocket;
