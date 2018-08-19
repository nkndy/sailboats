import React from 'react';

class PostDetails extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    render() {
        return( 
            <h4>{this.props.posted_date} || <Map lat={this.props.lat} long={this.props.long}/></h4>
        );
    }
}

export default PostDetails;