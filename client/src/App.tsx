import React from 'react';
import { Navigate } from 'react-router-dom';
import Button from './Button';
import Container from './Container';
import MainBackground from './MainBackground';


class App extends React.Component<{children?: JSX.Element | JSX.Element[]}, {redirect: boolean | null, to: string}> {

  constructor(props: {children?: JSX.Element | JSX.Element[]}){
    super(props);
    this.state = {redirect: false, to: "/"};
  }


  login = (): void => {
    this.setState({redirect: true, to: "/Login"});
  }

  main = ():void => {
    this.setState({redirect: true, to: "/Main"});
  }

  logout = ():void => {
    localStorage.clear();
    alert("Logged Out!");
  }


  render(){

    if(this.state.redirect)
      return <Navigate to={this.state.to} replace={true}/>;

    return (
      <MainBackground>
        <Container>
          <Button title="Login" func={this.login}/>
          <Button title="Main" func={this.main}/>
          <Button title="Logout" func={this.logout}/>
        </Container>
      </MainBackground>
    );
  }
}

export default App;
