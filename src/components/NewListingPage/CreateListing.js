import React from 'react';
import PropTypes from 'prop-types';
import CreateListingStepper from './CreateListingStepper';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import firebase from '../../firebase';

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

class CreateListing extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        listingId: null,
        is_premium: false,
      }
      this.handleSubscriptionSelect = this.handleSubscriptionSelect.bind(this);
      this.handleNext = this.handleNext.bind(this);
      this.parseBool = this.parseBool.bind(this);
    }
    parseBool(value) {
      let is_premium = this.state.is_premium;
      let newValue = (value === is_premium.toString() ? is_premium : !is_premium);
      return newValue;
    }
    handleSubscriptionSelect(e) {
      let is_premium = this.state.is_premium
      this.setState({
        is_premium: this.parseBool(e.target.value),
      })
    }
    handleNext(values) {
      let user_id = this.props.user.uid;
      let valuesForUpdate = values.values;
      if (this.state.listingId == null) {
        posts.add({
            active_post: false,
            created_date: firebase.firestore.FieldValue.serverTimestamp(),
            posted_date: null,
            user: user_id,
        })
        .then((docRef) => {
            this.setState({
              listingId: docRef.id,
            });
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
      } else {
        if (valuesForUpdate !== null) {
          Object.keys(valuesForUpdate).map((keyName, keyIndex) => {
            this.setState({
              [keyName]: valuesForUpdate[keyName]
            });
            return null;
          })
        };
      }
    }
    componentDidUpdate(prevProps, prevState) {
      if ( this.state !== prevState && this.state.listingId !== null ) {
        posts.doc(this.state.listingId).set(Object.assign({}, this.state), { merge: true }).then(() => {
        });
      }
    }
    render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container className={classes.layout} spacing={24}>
          <Grid item xs={12}>
            <CreateListingStepper
              handleSubscriptionSelect={this.handleSubscriptionSelect}
              handleNext={this.handleNext}
              user={this.props.user}
              listingId={this.state.listingId}
              isPremium={this.state.is_premium}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

CreateListing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateListing);
