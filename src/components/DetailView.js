import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  root: {
    flexGrow: 1,
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

function DetailView(props) {
    const { classes } = props;
    return (
      <React.Fragment>
      <div className={classNames(classes.layout)}>
        <h4 className={classNames(classes.tagline)}>Detail View - {props.match.params.listingId}</h4>
        <div className={classes.root}>
          <Grid container spacing={16}>
            <Grid item xs={12} sm={8}>
              <Paper className={classes.paper}>Slider</Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>Info</Paper>
              <Paper className={classes.paper}>Contact</Paper>
              <Paper className={classes.paper}>Map</Paper>
            </Grid>
          </Grid>
          <Grid container spacing={16}>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>Description</Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>Gear</Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className={classes.paper}>Chat</Paper>
            </Grid>
          </Grid>
        </div>
      </div>
      </React.Fragment>
    );
}

DetailView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailView);
