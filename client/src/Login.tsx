import React from 'react';
import Container from './Container';
import MainBackground from './MainBackground';
import LoginForm from './LoginForm';


class Login extends React.Component<{children?: JSX.Element | JSX.Element[]}> {

  render(){
    return (
      <MainBackground>
        <Container>
          <LoginForm/>
        </Container>
      </MainBackground>
    );
  }
}

export default Login;
