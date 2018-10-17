import React from 'react';


class PostDetails extends React.Component {
    componentDidMount() {
    }
    render() {
        return(
            <div>
            {this.props.posted_date}
            {/*
<Map lat={this.props.lat} long={this.props.long} />
              */}
            </div>
        );
    }
}

export default PostDetails;
