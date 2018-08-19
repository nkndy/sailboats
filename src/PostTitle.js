import React from 'react';

class PostTitle extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return(
            <h3>{this.props.asking_price} || {this.props.manufacturer} || {this.props.length}</h3>
        );
    }
}

export default PostTitle;