import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { auth } from './firebase';

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
          <button onClick={this.logout}>Logout</button>
        </div>
      </React.Fragment>
    );
  }
}

// function Account(props) {
//     const { classes } = props;
//     let logout = () => {
//       console.log("hello");
//       auth.signOut()
//       .then(() => {
//         this.setState({
//           user: null
//         });
//       });
//     }
//     return (
//       <React.Fragment>
//       <div className={classNames(classes.layout)}>
//         <h4 className={classNames(classes.tagline)}>Account</h4>
//         <button onClick={logout}>Logout</button>
//       </div>
//       </React.Fragment>
//     );
// }

Account.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Account);
