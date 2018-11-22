import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';
import {withRouter} from 'react-router-dom';
import CheckoutModal from './CheckoutModal';

const styles = theme => ({
});

class UpdateActions extends React.Component {
    constructor(props) {
      super(props)
    }
    createPaymentMethod = () => {
      this.props.history.push('/my-account')
    }
    updateSuccess = () => {
      //needs error handling
      this.props.updatePost();
    }
    render() {
        const { classes } = this.props;
        return(
          <Grid item container xs={12} justify="flex-end" alignItems="center" >
            <Button
              variant="contained"
              size="small"
              className={classes.button}
              onClick={() => this.updateSuccess()}
            >
              <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
              Save
            </Button>
            <CheckoutModal data={this.props.data} />
          </Grid>
        );
    }
}

UpdateActions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(UpdateActions));
