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
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { loadCSS } from 'fg-loadcss/src/loadCSS';

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
    padding: theme.spacing.unit * 3,
    borderRadius: '3px',
  },
  textField: {
    width: '100%',
  },
  thumbnailImage: {
    width: '100%',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '3px',
  },
});

class CheckoutModal extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      open: false,
      processing: false,
      updateSource: true,
      paymentSources: [],
    }
  }
  
  handleOpen = () => {
    this.props.updateFeaturedImage();
    if (this.props.data.is_premium === true) {
      this.setState({ open: true });
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  updateSource = () => {
    this.setState(prevState => ({
      updateSource: !prevState.updateSource
    }));
  }

  processing = () => {
    console.log(this.state.processing);
    this.setState(prevState => ({
      processing: !prevState.processing
    }));
  };

  savePaymentMethod = () => {
    this.child.current.submit();
  }

  publish = () => {
    console.log('publish');
  }

  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.paymentSources!==this.props.paymentSources){
      //Perform some operation here
      this.setState({
        paymentSources: this.props.paymentSources,
        updateSource: false,
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button onClick={this.handleOpen}>Publish My Listing</Button>
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
                    <img src={ this.props.selectedImage } className={classes.thumbnailImage}/>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">
                      { this.props.data.length + "' " + this.props.data.manufacturer }
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
                <Grid container spacing={24} alignItems="center">
                    <Grid item xs={8}>
                      <TextField
                        id="discount-input"
                        label="Affiliate or Discount Code"
                        placeholder="Code"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Button>
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
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    { this.state.updateSource ?
                      <Elements>
                        <CheckoutForm processing={this.processing} user={this.props.data.user} ref={this.child} />
                      </Elements>
                      :
                      <div>
                        <Typography variant="caption" gutterBottom>
                        Payment Method
                        </Typography>
                        <Typography variant="subtitle1">
                        { this.props.data.email }
                        </Typography>
                        <Typography variant="overline">
                        {"**** **** **** " + this.props.paymentSources[0].card.last4 }
                        </Typography>
                        <Typography variant="overline" gutterBottom>
                        { this.props.paymentSources[0].card.exp_month + " / " + this.props.paymentSources[0].card.exp_year }
                        </Typography>
                      </div>
                    }
                  </Grid>
                </Grid>
                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    <Button variant="contained" color="default" className={classes.button} onClick={this.updateSource}>
                      { this.state.updateSource ? "Cancel" : "Update Payment Method" }
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button variant="contained" color="default" className={classes.button} onClick={ this.state.updateSource ? this.savePaymentMethod : this.publish }>
                      { this.state.updateSource ?
                        <span>Save Payment Method</span>
                        :
                        <span>
                        Publish My Listing
                        <i className="fas fa-upload"></i>
                        </span>
                      }
                    </Button>
                  </Grid>
                </Grid>
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
