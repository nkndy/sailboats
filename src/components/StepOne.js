import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
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
      model_name: storedState.model,
      boat_name: storedState.boat_name,
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

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
      <div>Let&#39;s start with some basic information about your Listing</div>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          required
          type="number"
          id="length"
          label="Length"
          value={this.state.length}
          className={classes.textField}
          onChange={this.handleChange('length')}
          margin="normal"
          variant="outlined"
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
          variant="outlined"
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
          variant="outlined"
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
          variant="outlined"
        />
        <TextField
          type="number"
          id="year"
          label="Year"
          value={this.state.year}
          className={classes.textField}
          onChange={this.handleChange('year')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="model_name"
          label="Model Name"
          value={this.state.model_name}
          className={classes.textField}
          onChange={this.handleChange('model_name')}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="boat_name"
          label="Boat Name"
          value={this.state.boat_name}
          className={classes.textField}
          onChange={this.handleChange('boat_name')}
          helperText="eg. S/V Tigan"
          margin="normal"
          variant="outlined"
        />
      </form>
      </React.Fragment>
    );
  }
}

StepOne.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StepOne);
