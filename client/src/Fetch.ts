import { IUser, IPConfig } from "./Types";

export default class Fetch {

    private ipConfig: IPConfig;
    public socket: WebSocket | null;
    public isLogged: boolean;

    constructor(){

        if(localStorage.getItem("token"))
            this.isLogged = true;
        else
            this.isLogged = false;

        this.socket = null;

        this.ipConfig = {
            hostname: "http://127.0.0.1",
            port: 3001,
            mode: "same-origin"
        };

    }

    public Login(object: IUser): Promise<void>{
        return this.postRequest("/Login", object);
    }

    public Register(object: IUser): Promise<void>{
        return this.postRequest("/Registration", object);
    }

    public read(){

        if(this.socket == null || this.socket?.readyState == WebSocket.CLOSED)
            this.connect();

        this.socket!.onmessage = blobData => {
            if (blobData.data instanceof Blob){

                let reader = new FileReader();

                reader.onload = () => {
                    alert(reader.result);
                };

                reader.readAsText(blobData.data);
            }
            else {
                let {Error, Message} = JSON.parse(blobData.data);
                if(Error)
                    alert(Error);
                else
                    alert(Message);
            }
        }
    }

    public send(message: string){

        if(this.socket == null || this.socket?.readyState == WebSocket.CLOSED){
            this.connect();
            this.socket!.onopen = () =>{
                this.socket!.send(message);
            }
        }
        else if(this.socket?.readyState == WebSocket.OPEN)
            this.socket!.send(message);
    }

    public connect(){
        this.socket = new WebSocket("ws://127.0.0.1:8080/mainCams?token=" + localStorage.getItem("token"));
        this.socket.onopen = () => {
            alert("connected!");
        }
    }

    public disconnect(){
        this.socket?.close();
    }

    // location should be "/Login" or something
    private postRequest(location: string, object: any): Promise<void>{

        const postConfig = {
            method: "POST",
            mode: this.ipConfig.mode,
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(object)
        } as RequestInit;

        let hostname: string;


        if(this.ipConfig.mode == "cors")
            hostname = this.ipConfig.hostname + ":" + this.ipConfig.port + location;
        else
            hostname = location;


        return new Promise( (resolve, reject) => { 
            fetch(hostname, postConfig).then( response => {            
                response.text().then(content => {

                    let res = JSON.parse(content);
                    
                    if(res.Token){
                        localStorage.setItem("token", res.Token);
                        this.isLogged = true;
                        resolve({isLogged: true} as unknown as void);
                    }
                    else{
                        this.isLogged = false;
                        resolve({Registered: res.Registered, Message: res.Message} as unknown as void);
                    }

                    return;
                });
            });
        });
    }

    // authed getRequest
    public getRequest(location: string){

        const getConfig = {
            method: "GET",
            mode: this.ipConfig.mode,
            headers: { 
                "Content-Type" : "application/json",
                "auth-token": localStorage.getItem("token")
            }
        } as RequestInit;

        let hostname: string;


        if(this.ipConfig.mode == "cors")
            hostname = this.ipConfig.hostname + ":" + this.ipConfig.port + location;
        else
            hostname = location;


        fetch(hostname, getConfig).then( response => {            
            response.text().then(content => {
                alert(content);
            });
        });
    }

}