import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ConditionRadioSelect from './ConditionRadioSelect';
import LocationInput from './LocationInput'

// price
// location
// condition

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

class StepTwo extends React.Component {

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

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
          className={classes.textField}
          onChange={this.handleChange('asking_price')}
          margin="normal"
          variant="outlined"
          InputProps={{
            endAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <LocationInput />
        <ConditionRadioSelect />
      </form>
      </React.Fragment>
    );
  }
}

StepTwo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StepTwo);
