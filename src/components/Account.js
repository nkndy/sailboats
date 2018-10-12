import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ThumbnailPost from './ThumbnailPost'
import { withStyles } from '@material-ui/core/styles';
import firebase, { auth } from '../firebase';

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
});

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    db.collection("Posts").where("user", "==", this.props.user_id)
      .get()
      .then((querySnapshot) => {
        let data = querySnapshot.docs.map(doc => ({ data: doc.data(), id: doc.id }))
        this.setState({
            data: data,
        });
      });
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
          <ThumbnailPost />
          <button onClick={this.logout}>Logout</button>
        </div>
      </React.Fragment>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Account);
