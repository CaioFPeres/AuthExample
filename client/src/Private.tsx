import React from 'react';
import Fetch from './Fetch';


class Private extends React.Component<{children?: JSX.Element | JSX.Element[]}, {isLogged: boolean | null}> {

    constructor(props: {children?: JSX.Element | JSX.Element[]}){
        super(props);

        let fe = new Fetch();
        this.state = {isLogged: fe.isLogged};
    }

    render(){

        if(!this.state.isLogged)
            return <div>Cant access, not logged in!</div>;

        return(
            this.props.children
        );
    }

}

export default Private;