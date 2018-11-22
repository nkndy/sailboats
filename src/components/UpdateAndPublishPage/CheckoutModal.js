import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from '../../CheckoutForm';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    minWidth: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    borderRadius: '3px',
  },
});

class CheckoutModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography gutterBottom>Click to get the full Modal experience!</Typography>
        <Button onClick={this.handleOpen}>Open Modal</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <StripeProvider apiKey="pk_test_D8R4GPbMBD7nAB4kO3QkiycS">
              <div className={classes.checkout}>
                <Grid container spacing={24} alignItems="center">
                  <Grid item xs={3}>
                    img
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">
                      { this.props.data.length + "\' " + this.props.data.manufacturer }
                    </Typography>
                    <Typography variant="subtitle2">
                      Featured Listing
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1" gutterBottom>
                    $20/mo
                    </Typography>
                  </Grid>
                </Grid>
                <hr/>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                      <TextField
                        id="discount-input"
                        label="Affiliate or Discount Code"
                        placeholder="Code"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                      />
                      <Button
                       size="large"
                      >
                        Apply
                      </Button>
                    </Grid>
                </Grid>
                <hr/>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    Discount Name and amount if valid
                  </Grid>
                  <Grid item xs={12}>
                    tax
                  </Grid>
                </Grid>
                <hr/>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    total
                  </Grid>
                </Grid>
                <Typography variant="h6" gutterBottom>
                No Existing Payment Methods
                </Typography>
                <Elements>
                  <CheckoutForm />
                </Elements>
              </div>
            </StripeProvider>
          </div>
        </Modal>
      </div>
    );
  }
}

CheckoutModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const CheckoutModalWrapped = withStyles(styles)(CheckoutModal);

export default CheckoutModalWrapped;
