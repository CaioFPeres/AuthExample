import React from 'react';
import "./MainBackground.css";

class MainBackground extends React.Component<{children?: JSX.Element | JSX.Element[]}> {
    
    render(){
        return(
            <div className="MainBackground">
                {this.props.children}
            </div>
        );
    }

}

export default MainBackground;