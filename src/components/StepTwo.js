import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ConditionRadioSelect from './ConditionRadioSelect';
import LocationInput from './LocationInput'

const styles = theme => ({
  container: {
    marginTop: theme.spacing.unit * 1.5,
    marginBottom: theme.spacing.unit * 3,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

let storedState = {
  asking_price: '',
  location: '',
  condition: '',
};

class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asking_price: storedState.asking_price,
      location: storedState.location,
      condition: storedState.condition,
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  updateLocation = input => {
    this.setState({location: {name: input.label, coords: input.value}})
    storedState.location = {name: input.label, coords: input.value};
  }

  updateCondition = input => {
    this.setState({ condition: input });
  }

  componentDidUpdate(prevProps, prevState) {
    if ( this.state !== prevState ) {
      this.props.updateValues(this.state);
      storedState = this.state;
    }
  }

  render() {
    const { classes } = this.props;
    return(
      <React.Fragment>
      <form className={classes.container} noValidate autoComplete="off">
        <div>Let potential know what you are looking for:</div>
        <TextField
          required
          type="number"
          id="asking-price"
          label="Asking Price"
          value={this.state.asking_price}
          className={classes.textField}
          onChange={this.handleChange('asking_price')}
          margin="normal"
          variant="outlined"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <LocationInput updateLocation={this.updateLocation} storedValue={storedState.location} />
        <ConditionRadioSelect updateCondition={this.updateCondition} storedValue={storedState.condition} />
      </form>
      </React.Fragment>
    );
  }
}

StepTwo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StepTwo);
