import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NearMe from '@material-ui/icons/NearMe';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from "react-router-dom";
import bgImage from '../assets/img/headerbg.png';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  layout: {
    width: 'auto',
    paddingLeft: theme.spacing.unit * 1,
    paddingRight: theme.spacing.unit * 1,
    paddingTop: theme.spacing.unit * 3,
    marginTop: '70px',
    textAlign: 'center',
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      paddingLeft: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.up(550 + theme.spacing.unit * 3 * 2)]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
      marginTop: '82px',
    },
  },
  tagline: {
    textAlign: 'center',
  },
  landingSection: {
    marginBottom: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
  },
  button: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    textDecoration: 'none',
  },
  extendedIcon: {
    marginRight: theme.spacing.unit * 1,
  },
  landingTaglineContainer: {
    paddingTop: theme.spacing.unit * 17,
    paddingBottom: theme.spacing.unit * 15,
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: 'right bottom',
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {

    },
  },
});

function Landing(props) {
    const { classes } = props;
    return (
      <React.Fragment>
      <div className={classNames(classes.landingTaglineContainer)}>
        <Typography className={classNames(classes.tagline)}>
          Find your next adventure
        </Typography>
      </div>
      <div className={classNames(classes.layout)}>
        <div className={classNames(classes.landingSection)}>
          <Typography variant="subheading" gutterBottom>
            This is some lorem ipsum about how we are a global sailboat marketplace.
            We have thousands of views per day and are the best place to facilitate the sale of an old friend or
            to find the next adventuremobile
          </Typography>
          <Typography variant="headline" component="h2" gutterBottom>
            Browse Thousands Of SailBoats Worldwide
          </Typography>
          <NavLink to="/listings">
            <Button variant="extendedFab" aria-label="Delete" className={classes.button}>
              <NearMe className={classes.extendedIcon} />
              Find your next adventure
            </Button>
          </NavLink>
        </div>
        <div className={classNames(classes.landingSection)}>
          Featured Boats
        </div>
        <div className={classNames(classes.landingSection)}>
          Ad Prices Table
        </div>
      </div>
      </React.Fragment>
    );
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Landing);
