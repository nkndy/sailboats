import React from 'react';

class Condition extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <h5>{this.props.condition} || {this.props.boat_name}</h5>
        );
    }
}

export default Condition;