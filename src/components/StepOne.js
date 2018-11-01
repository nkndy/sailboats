import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import HullTypeRadioSelect from './HullTypeRadioSelect';

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
  length: '',
  beam: '',
  draft: '',
  manufacturer: '',
  year: '',
  model_name: '',
  boat_name: '',
  hull_type: '',
};

class StepOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      length: storedState.length,
      beam: storedState.beam,
      draft: storedState.draft,
      manufacturer: storedState.manufacturer,
      year: storedState.year,
      model_name: storedState.model_name,
      boat_name: storedState.boat_name,
      hull_type: storedState.hull_type,
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  updateHullType = input => {
    this.setState({ hull_type: input });
  }

  componentDidUpdate(prevProps, prevState) {
    if ( this.state !== prevState ) {
      this.props.updateValues(this.state);
      storedState = this.state;
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
      <form className={classes.container} noValidate autoComplete="off">
        <div>Let&#39;s start with some basic information about your listing:</div>
        <TextField
          required
          type="number"
          id="length"
          label="Length"
          value={this.state.length}
          className={classes.textField}
          onChange={this.handleChange('length')}
          margin="normal"
          InputProps={{
            endAdornment: <InputAdornment position="end">ft</InputAdornment>,
          }}
        />
        <TextField
          type="number"
          id="beam"
          label="Beam"
          value={this.state.beam}
          className={classes.textField}
          onChange={this.handleChange('beam')}
          margin="normal"
          InputProps={{
            endAdornment: <InputAdornment position="end">ft</InputAdornment>,
          }}
        />
        <TextField
          type="number"
          id="draft"
          label="Draft"
          value={this.state.draft}
          className={classes.textField}
          onChange={this.handleChange('draft')}
          margin="normal"
          InputProps={{
            endAdornment: <InputAdornment position="end">ft</InputAdornment>,
          }}
        />
        <TextField
          required
          id="manufacturer"
          label="Manufacturer"
          value={this.state.manufacturer}
          className={classes.textField}
          onChange={this.handleChange('manufacturer')}
          margin="normal"
        />
        <TextField
          type="number"
          id="year"
          label="Year"
          value={this.state.year}
          className={classes.textField}
          onChange={this.handleChange('year')}
          margin="normal"
        />
        <TextField
          id="model_name"
          label="Model Name"
          value={this.state.model_name}
          className={classes.textField}
          onChange={this.handleChange('model_name')}
          margin="normal"
        />
        <TextField
          id="boat_name"
          label="Boat Name"
          value={this.state.boat_name}
          className={classes.textField}
          onChange={this.handleChange('boat_name')}
          helperText="eg. S/V Tigan"
          margin="normal"
        />
        <HullTypeRadioSelect updateHullType={this.updateHullType} storedValue={storedState.hull_type} />
      </form>
      </React.Fragment>
    );
  }
}

StepOne.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StepOne);
