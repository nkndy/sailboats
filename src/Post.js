import React from 'react';
import moment from 'moment';
import PostTitle from './PostTitle.js'
import PostDetails from './PostDetails.js'
import Condition from './Condition.js'
import Description from './Description.js'
import MediaSlider from './MediaSlider.js'
import MediaThumb from './MediaThumb.js'
import Grid from '@material-ui/core/Grid';

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
                <Grid container>
                    <Grid item xs={3}>
                        <MediaThumb document_id={this.props.document_id}/>
                    </Grid>
                    <Grid item xs>
                        <PostTitle 
                            asking_price={this.props.data.asking_price}
                            manufacturer={this.props.data.manufacturer}
                            length={this.props.data.length}
                            lat={this.props.data.location.latitude}
                            long={this.props.data.location.longitude}
                            model_name={this.props.data.model_name}
                            document_id={this.props.document_id} 
                        />                  
                    </Grid>
                </Grid>
                </div>
            )            
        );
    }
}

export default Post;