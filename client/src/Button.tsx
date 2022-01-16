import React from 'react';
import "./Button.css";
import { ButtonProps } from './Types';

class Button extends React.Component<ButtonProps> {

    render(){
        return(
            <button className="button" onClick={this.props.func}>{this.props.title}</button>
        );
    }

}


export default Button;