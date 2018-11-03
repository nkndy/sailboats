import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Listing from './Listing';
import SaveIcon from '@material-ui/icons/Save';

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

class ReviewListing extends React.Component {
    constructor(props){
      super(props);
    };
    componentDidMount() {
    }
    render() {
        const { classes } = this.props;
        let listing = new Listing();
        return(
          <React.Fragment>
          <div className={classNames(classes.layout)}>
            <h4 className={classNames(classes.tagline)}>Review And Update</h4>
            <Button
              variant="contained"
              size="small"
              className={classes.button}
              onClick={listing.updateListing}
            >
              <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
              Save
            </Button>
          </div>
          </React.Fragment>
        );
    }
}

ReviewListing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReviewListing);
