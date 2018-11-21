import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import firebase, { auth } from '../../firebase';
import MyListingCard from './MylistingCard';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AccountButton from './AccountButton'

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};

db.settings(settings);

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
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    fontWeight: 'initial',
  },
  hr: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
  },
});

class Account extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
    db.collection("Posts").where("user", "==", this.props.user_id)
      .get()
      .then((querySnapshot) => {
        if (this._isMounted) {
          let data = querySnapshot.docs.map(doc => ({ data: doc.data(), id: doc.id }))
          this.setState({
              data: data,
          });
        }
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  logout() {
    auth.signOut()
     .then(() => {
       console.log("logged out")
     });
  }
  render() {
    const { classes } = this.props;
    return(
      <React.Fragment>
        <div className={classNames(classes.layout)}>
          <h4 className={classNames(classes.tagline)}>Account</h4>
          <MyListingCard />
          <hr className={classNames(classes.hr)}/>
          <Grid container justify="center" alignItems="center" spacing={24} >
            <Grid item xs={6} sm={3}>
              <AccountButton icon={'fas fa-cogs fa-2x'} title={'Subscription Settings'} link={'fab fa-facebook-square'} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <AccountButton icon={'fas fa-user-circle fa-2x'} title={'Account Settings'} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <AccountButton icon={'far fa-bookmark fa-2x'} title={'Bookmarked Listings'} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <AccountButton icon={'fas fa-search fa-2x'} title={'Another Button'} />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="center"
            spacing={24}
          >
            <Grid item container xs={12} justify="flex-end" alignItems="center">
              <Button variant="outlined" onClick={this.logout}>Logout</Button>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Account);
