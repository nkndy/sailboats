import React from 'react';
import moment from 'moment';
import PostTitle from './PostTitle.js'
import PostDetails from './PostDetails.js'
import Condition from './Condition.js'
import Description from './Description.js'
import MediaSlider from './MediaSlider.js'

function Media(props) {
    if (props.is_featured) {
      return <MediaSlider document_id={props.document_id}/>;
    }
    return <h1>Test</h1>;
}

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    parseDate(date) {
        const dateObject = moment.unix((date.seconds));
        return dateObject.format("MMMM Do YYYY")
    }
    render() {
        return(           
            this.props.data.featured_post ? (
                <div className="featured-post">
                    <PostTitle 
                        asking_price={this.props.data.asking_price}
                        manufacturer={this.props.data.manufacturer}
                        length={this.props.data.length}
                        lat={this.props.data.location.latitude}
                        long={this.props.data.location.longitude}
                        model_name={this.props.data.model_name} 
                    />  
                    <MediaSlider document_id={this.props.document_id}/>                    
                    <PostDetails  
                        posted_date={this.parseDate(this.props.data.posted_date)} 
                        lat={this.props.data.location.latitude}
                        long={this.props.data.location.longitude}
                    />
                    <Condition condition={this.props.data.condition} boat_name={this.props.data.boat_name} />
                    <Description description={this.props.data.description}/>
                </div>
            ) : (
                <div className="thumbnail-post">
                    <PostTitle 
                        asking_price={this.props.data.asking_price}
                        manufacturer={this.props.data.manufacturer}
                        length={this.props.data.length}
                        lat={this.props.data.location.latitude}
                        long={this.props.data.location.longitude}
                        model_name={this.props.data.model_name} 
                    />  
                </div>
            )            
        );
    }
}

export default Post;