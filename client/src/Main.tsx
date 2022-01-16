import React from "react";
import Button from "./Button";
import CamContainer from "./CamContainer";
import Container from "./Container";
import Fetch from "./Fetch";
import MainBackground from "./MainBackground";


class Main extends React.Component<{children?: never[]}, {fe?: Fetch}> {

    constructor(props: {children?: never[]}){
        super(props);

        this.state = {fe: new Fetch()};
    
        this.read();
    }

    makeGET = () => {
        const fe = new Fetch();
        fe.getRequest("/Private");
    }

    logout = () =>{
        localStorage.removeItem("token");
        this.state.fe?.disconnect();
        alert("Logged out!");
    }

    read = () =>{
        this.state.fe?.read();
    }

    send = () =>{
        this.state.fe?.send("Server sent this message back with WebSocket!");
    }

    render(){
        return(
            <MainBackground>
                <CamContainer/>
                <Container>
                    <Button title="Make GET Request" func={this.makeGET}/>
                    <Button title="Log out" func={this.logout}/>
                    <Button title="Send" func={this.send}/>
                </Container>
            </MainBackground>
        );
    }

}

export default Main;