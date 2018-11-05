import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import firebase from '../../firebase';

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
        data: {
          media: [],
        },
        selectedImage: 0,
      }
    };
    componentDidMount() {
      posts.doc(this.props.match.params.listingId).get()
          .then((querySnapshot) => {
          let data = querySnapshot.data();
          this.setState({
              data
          });
      });
    }
    setFeaturedImage = index => {
      this.setState({
        selectedImage: index,
      })
    }
    updatePost = () => {
      // posts.doc(this.props.match.params.listingId).set({
      //     media[this.state.selectedImage].featured_image = true,
      // }), { merge: true }).then(() => {
      //   console.log('link here');
      // });
    }
    render() {
        const { classes } = this.props;
        return(
            <div className={classNames(classes.layout)}>
              <h4 className={classNames(classes.tagline)}>Review And Update</h4>
              <SelectFeaturedImage imagesArray={this.state.data.media} setFeaturedImage={this.setFeaturedImage}/>
              <Button
                variant="contained"
                size="small"
                className={classes.button}
                onClick={() => this.updatePost()}
              >
                <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
                Save
              </Button>
            </div>
        );
    }
}

ReviewListing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReviewListing);
