import React from 'react';
import Button from './Button';
import Fetch from "./Fetch";
import { Navigate } from 'react-router-dom';
import "./LoginForm.css";


class LoginForm extends React.Component<{children?: never[]}, {redirect: string | null}> {

    constructor(props: {children?: never[]}){
        super(props);
        this.state = {redirect: null};
    }

    loginFunc = () => {

        let user = document.getElementById("user") as HTMLInputElement;
        let password = document.getElementById("password") as HTMLInputElement;

        if(user.value == "" || password.value == ""){
            alert("Fill all fields!");
            return;
        }


        let fe = new Fetch();
        fe.Login({User: user.value, Password: password.value}).then( obj =>{
            //window.location.href = loc as unknown as string;
            let {isLogged} = obj as unknown as {isLogged: boolean};
            if(isLogged)
                this.setState({redirect: "/"});
        });

    }

    render(){
        
        if(this.state.redirect)
            return <Navigate to={this.state.redirect} replace={true} />
        
            
        return(
            <>
                <div className="inputText">User</div>
                <input type="text" id="user" className="userInput"></input>
                
                <div className="inputText">Password</div>
                <input type="password" id="password" className="userInput"></input>
                
                <a href="Register" className="register">Click here to register</a>
            
                <Button title="Login" func={this.loginFunc}/>

            </>
        );
    };
}

export default LoginForm;