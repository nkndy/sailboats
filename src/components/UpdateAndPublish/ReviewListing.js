import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import firebase from '../../firebase';
import LocationMap from './LocationMap';
import Grid from '@material-ui/core/Grid';
import DetailFields from './DetailFields';
import UpdateActions from './UpdateActions';
import Typography from '@material-ui/core/Typography';

import SelectFeaturedImage from './SelectFeaturedImage'

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);
let posts = db.collection('Posts');

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 3,
    marginTop: '70px',
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.up(550 + theme.spacing.unit * 3 * 2)]: {
      marginTop: '82px',
    },
  },
  tagline: {
    textAlign: 'center',
    paddingBottom: theme.spacing.unit * 4,
    fontWeight: 'initial',
  },
});

class ReviewListing extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        media: [],
        selectedImage: '',
        data: {},
      }
    };
    componentDidMount() {
      posts.doc(this.props.match.params.listingId).get()
        .then((querySnapshot) => {
          this.setState({
              data: querySnapshot.data(),
          });
      });
      posts.doc(this.props.match.params.listingId).collection('Media').get()
        .then((querySnapshot) => {
          let media = [];
          let first = true;
          querySnapshot.forEach((doc) => {
            media.push({
              id: doc.id,
              data: doc.data(),
            })
            if (first) {
              first = false;
              this.setState({
                selectedImage: doc.id,
              })
            }
          });
          this.setState({
              media: media,
          });
      });
    }
    setFeaturedImage = index => {
      let selectedImage = this.state.media[index].id
      this.setState({
        selectedImage: selectedImage,
      })
    }
    updatePost = () => {
      //if post has already been published needs to remove old featured image bool from doc and update to false before applying
      let docRef = posts.doc(this.props.match.params.listingId);
      docRef.collection('Media').doc(this.state.selectedImage).update({
        featured_media: true,
      })
    }
    render() {
        const { classes } = this.props;
        if (!this.state.data.user) {
          return null;
        }
        return(
          <div className={classNames(classes.layout)}>
            <Typography variant="headline" component="p" className={classNames(classes.tagline)}>
              Review
                {(this.state.data.active_post === null || this.state.data.active_post === false) ? ' & Publish' : ' & Update'}
            </Typography>
            <Grid container spacing={24}>
              <SelectFeaturedImage imagesArray={this.state.media} setFeaturedImage={this.setFeaturedImage} />
              <LocationMap data={this.state.data.location} />
              <DetailFields data={this.state.data} />
            </Grid>
            <Grid container spacing={24}>
              <UpdateActions updatePost={this.updatePost} />
            </Grid>
          </div>
        );
    }
}

ReviewListing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReviewListing);
