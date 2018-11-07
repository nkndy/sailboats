import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
});

class UpdateActions extends React.Component {
    render() {
        const { classes } = this.props;
        return(
          <Grid item container xs={12} justify="flex-end" alignItems="center" >
            <Button
              variant="contained"
              size="small"
              className={classes.button}
              onClick={() => this.updatePost()}
            >
              <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
              Save
            </Button>
          </Grid>
        );
    }
}

UpdateActions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateActions);
