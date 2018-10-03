import React from 'react';
import moment from 'moment';
import PostTitle from './PostTitle.js'
import PostDetails from './PostDetails.js'
import Condition from './Condition.js'
import Description from './Description.js'
import MediaSlider from './MediaSlider.js'
import MediaThumb from './MediaThumb.js'
import Grid from '@material-ui/core/Grid';

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
            active: props.data.featured_post,
        };
    }
    parseDate(date) {
        const dateObject = moment.unix((date.seconds));
        return dateObject.format("MMMM Do YYYY")
    }
    togglePost(e) {
      this.setState({
        active: !e
      })
    }
    render() {
        return(
            this.state.active ? (
                <div className="featured-post">
                  <Grid container onClick={() => this.togglePost(this.state.active)}>
                    <Grid item xs>
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
                    </Grid>
                  </Grid>
                </div>
            ) : (
                <div className="thumbnail-post">
                <Grid container onClick={() => this.togglePost(this.state.active)}>
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
