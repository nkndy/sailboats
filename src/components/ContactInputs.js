import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import EmailContactInput from './EmailContactInput';
import PhoneContactInput from './PhoneContactInput';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});

class ContactInputs extends React.Component {
  state = {
    dense: false,
  };

  render() {
    const { classes } = this.props;
    const { dense } = this.state;

    return (
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.demo}>
              <List dense={dense}>
                <EmailContactInput user_email={this.props.user_email}/>
                <PhoneContactInput />
              </List>
            </div>
          </Grid>
        </Grid>
    );
  }
}

ContactInputs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactInputs);
