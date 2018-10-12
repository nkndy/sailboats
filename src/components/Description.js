import React from 'react';

class Description extends React.Component {
    render() {
        return(
            <div>
            <h6>{this.props.description}</h6>
            </div>
        );
    }
}

export default Description;