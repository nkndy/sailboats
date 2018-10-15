import React from 'react';
import ThumbnailPost from './ThumbnailPost.js'
import FeaturedPost from './FeaturedPost.js'

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            active: props.data.featured_post,
        };
    }
    togglePost(e) {
      this.setState({
        active: !e
      })
    }
    render() {
        return(
            this.state.active ? (
              <FeaturedPost data={this.props.data} document_id={this.props.document_id}/>
            ) : (
              <ThumbnailPost data={this.props.data} />
            )
        );
    }
}

export default Post;
