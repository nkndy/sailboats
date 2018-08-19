import React from 'react';

class Description extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
            <h6>{this.props.description}</h6>
            </div>
        );
    }
}

export default Description;