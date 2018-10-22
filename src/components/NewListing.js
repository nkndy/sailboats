import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CreateListingStepper from './CreateListingStepper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import firebase from '../firebase';

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

class NewListing extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        subscriptionId: null,
        isPremium: false,
      }
      this.handleSubscriptionSelect = this.handleSubscriptionSelect.bind(this);
    }
    handleSubscriptionSelect(e) {
      this.setState({
        isPremium: e.target.value
      })
    }
    handleNext(inputValues) {
      if (this.state.subscriptionId === null) {
        posts.add({
            active_post: false,
            created_date: firebase.firestore.FieldValue.serverTimestamp(),
            posted_date: null,
            featured_post: this.state.isPremium,
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            this.setState({
              subscriptionId: docRef.id,
            })
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
      }
      console.log("clicknext")
    }
    render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.layout} spacing={16}>
        <Grid item xs={12}>
          <CreateListingStepper handleSubscriptionSelect={this.handleSubscriptionSelect} handleNext={this.props.handleNext}/>
        </Grid>
      </Grid>
    );
  }
}

NewListing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewListing);
