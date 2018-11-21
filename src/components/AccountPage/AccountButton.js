import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  icon: {
    marginBottom: theme.spacing.unit * 1,
  },
  paper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
  },
});

class AccountButton extends React.Component {
  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    );
  }
  render () {
    const { classes } = this.props;
    return (
      <Paper elevation={1} className={classes.paper}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} align={'center'}>
            <Icon className={classNames(classes.icon, `${this.props.icon}`)} color="disabled"/>
          </Grid>
          <Grid item xs={12} align={'center'}>
            <Typography component="p">
              {this.props.title}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

AccountButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountButton);
