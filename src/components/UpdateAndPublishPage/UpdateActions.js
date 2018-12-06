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
    render() {
        const { classes } = this.props;
        return(
          <Grid item container xs={12} justify="flex-end" alignItems="center" >
            <CheckoutModal data={this.props.data} paymentSources={this.props.paymentSources} updateFeaturedImage={this.props.updateFeaturedImage}/>
          </Grid>
        );
    }
}

UpdateActions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(UpdateActions));
