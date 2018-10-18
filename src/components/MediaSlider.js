import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import ReactPlayer from 'react-player'
import firebase from '../firebase.js';

const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    display: 'block',
    overflow: 'hidden',
    width: '100%',
  },
});

class MediaSlider extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          data: [],
          activeStep: 0,
      };
  }

  componentDidMount() {
      db.collection('Posts').doc(this.props.document_id).get()
          .then((querySnapshot) => {
          let data = [];
          querySnapshot.data().media.forEach((item) => {
              data.push({item})
          });
          // tutorialSteps = data;
          this.setState({
              data: data
          });
      });
  }

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;
    const maxSteps = this.state.data.length;

    return (
      <div className={classes.root}>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {this.state.data.map((step, index) => (
            <div key={this.props.document_id + index}>
              {step.item.media_type === 1 ? (
                <img className={classes.img} src={step.item.media_url} alt={step.label} />
              ) : (
                <ReactPlayer url={step.item.media_url} controls={true} width="100%" height="auto"/>
              )}
            </div>
          ))}
        </SwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </div>
    );
  }
}

MediaSlider.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaSlider);
