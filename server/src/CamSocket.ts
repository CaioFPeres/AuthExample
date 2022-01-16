import WebSocket from "ws";
import jwt from "jsonwebtoken";

class CamSocket {

    sockets: WebSocket[];
    ws: WebSocket.Server;

    constructor(){
        this.sockets = [];
        this.ws = new WebSocket.Server({ path: "/mainCams", port: 8080 });
    }

    listen(){

        this.ws.on("connection", (socket, req) => {

            let token = req.url?.split("token=", req.url.length)[1];
            
            try{
                const verified = jwt.verify(token as string, process.env.TOKEN_SECRET as jwt.Secret);
            }
            catch(err){
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

export default CamSocket;