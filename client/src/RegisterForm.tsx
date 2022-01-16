import React from "react";
import { Navigate } from "react-router-dom";
import Button from "./Button";
import Fetch from "./Fetch";

class RegisterForm extends React.Component<{children?: never[]}, {redirect: string | null}> {

    constructor(props:{children?: never[]}){
        super(props);
        this.state = {redirect: null};
    }

    regFunc = () => {

        let user = document.getElementById("user") as HTMLInputElement;
        let password = document.getElementById("password") as HTMLInputElement;
        let confPass = document.getElementById("confPass") as HTMLInputElement;

        if(user.value == "" || password.value == "" || confPass.value == ""){
            alert("Fill all fields!");
            return;
        }

        if(password.value != confPass.value){
            alert("Passwords dont match!");
            return;
        }

        let fe = new Fetch();
        fe.Register({User: user.value, Password: password.value}).then( reg =>{
            let isReg = reg as unknown as {Registered: boolean, Message: string};
            if(isReg.Registered){
                alert(isReg.Message);
                this.setState({redirect: "/"});
            }
            else
                alert(isReg.Message);
        });
        
    }

    render() {

        if(this.state.redirect)
            return <Navigate to={this.state.redirect} replace={true} />
    

        return(
            <>
                <div className="inputText">User</div>
                <input type="text" id="user" className="userInput"></input>
                
                <div className="inputText">Password</div>
                <input type="password" id="password" className="userInput"></input>

                <div className="inputText">Confirm Password</div>
                <input type="password" id="confPass" className="userInput"></input>
                
                <Button title="Register" func={this.regFunc}/>
            </>
        );
    };
        

}

export default RegisterForm;