import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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

function Page(props) {
    const { classes } = props;
    return (
      <React.Fragment>
      <div className={classNames(classes.layout)}>
        <h4 className={classNames(classes.tagline)}>Find your next adventure</h4>
      </div>
      </React.Fragment>
    );
}

Page.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Page);
