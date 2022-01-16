import React from 'react';
import "./Container.css";


class Container extends React.Component<{children?: JSX.Element | JSX.Element[]}> {

    render(){
        return(
            <div className="container">
                {this.props.children}
            </div>
        );
    };

}

export default Container;