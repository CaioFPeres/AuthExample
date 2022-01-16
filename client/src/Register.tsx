import React from "react";
import Container from "./Container";
import MainBackground from "./MainBackground";
import RegisterForm from "./RegisterForm";


class Register extends React.Component<{children?: JSX.Element | JSX.Element[]}> {

    render() {
        return(
            <MainBackground>
                <Container>
                    <RegisterForm/>
                </Container>
            </MainBackground>
        );
    };

}


export default Register;