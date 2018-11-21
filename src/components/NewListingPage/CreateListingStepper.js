import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SelectAdType from './SelectAdType';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import { Link } from "react-router-dom";

const styles = theme => ({
  stepRoot: {
    paddingLeft: '0px',
    paddingRight: '0px',
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  publishContainer: {
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
  },
});

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select Ad Type'
    case 1:
      return 'Specify Size, Model & hull type';
    case 2:
      return 'Price, Location & Condition';
    case 3:
      return 'Description & Contact Info';
    case 4:
      return 'Add Media & Publish';
    default:
      return 'Unknown step';
  }
}

class CreateListingStepper extends React.Component {
  state = {
    activeStep: 0,
    hasMedia: false,
    values: {},
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
    this.props.handleNext(this.state);
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleUpdate = (values) => {
    let updatedState = {}
    let keysArray = Object.keys(values);
    for (const key of keysArray) {
      updatedState[key] = values[key]
    }
    this.setState((prevState, props) => (
      {
        values: {
          ...prevState.values,
          ...updatedState
        }
      }
    ));
  }

  hasMedia = () => {
    this.setState({
      hasMedia: true,
    })
  }

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;
    // const StyledIcon = withStyles({})(StepIcon);
    return (
      <div className={classes.root}>
        <Stepper className={classes.stepRoot} activeStep={activeStep} orientation="vertical" color="primary">
          <Step key={0}>
            <StepLabel>{getStepContent(0)}</StepLabel>
            <StepContent className={classes.stepContent}>
              <SelectAdType handleSubscriptionSelect={this.props.handleSubscriptionSelect} />
              <div className={classes.actionsContainer}>
                <div style={{paddingLeft: '2px',}}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    Begin
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>

          <Step key={1}>
            <StepLabel>{getStepContent(1)}</StepLabel>
            <StepContent className={classes.stepContent}>
              <StepOne updateValues={this.handleUpdate}/>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 1}
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    disabled={ (this.state.values.length === undefined || this.state.values.length === '' ) || ( this.state.values.manufacturer === undefined || this.state.values.manufacturer === '') }
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>

          <Step key={2}>
            <StepLabel>{getStepContent(2)}</StepLabel>
            <StepContent className={classes.stepContent}>
              <StepTwo updateValues={this.handleUpdate}/>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    disabled={ (this.state.values.asking_price === undefined || this.state.values.asking_price === '' ) || ( this.state.values.location === undefined || this.state.values.location === '') }
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>

          <Step key={3}>
            <StepLabel>{getStepContent(3)}</StepLabel>
            <StepContent className={classes.stepContent}>
              <StepThree updateValues={this.handleUpdate} user_email={this.props.user.email}/>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    disabled={( this.state.values.description === undefined || this.state.values.description === '' ) || ( this.state.values.accepts_email === false && ( this.state.values.accepts_phone === false || this.state.values.phone_number === '' )) }
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                  Next
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>

          <Step key={4}>
            <StepLabel>{getStepContent(4)}</StepLabel>
            <StepContent className={classes.stepContent}>
              <StepFour user_id={this.props.user.uid} listingId={this.props.listingId} isPremium={this.props.isPremium} hasMedia={this.hasMedia}/>
              <div className={classes.actionsContainer}>
                <div>
                  {activeStep === 4 && (
                    <Paper square elevation={0} className={classes.publishContainer}>
                      <Button
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Link to={`/review-listing/${this.props.listingId}`}>
                        <Button
                          className={classes.button}
                          disabled={this.state.hasMedia === false}
                        >
                          Review & Publish
                        </Button>
                      </Link>
                    </Paper>
                  )}
                </div>
              </div>
            </StepContent>
          </Step>
        </Stepper>
      </div>
    );
  }
}

CreateListingStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(CreateListingStepper);
