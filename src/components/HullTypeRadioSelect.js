import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 1,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class HullTypeRadioSelect extends React.Component {
  state = {
    value: 'monohull',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  componentDidUpdate(prevProps, prevState) {
    if ( this.state !== prevState ) {
      this.props.updateHullType(this.state.value);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Hulls:</FormLabel>
          <RadioGroup
            aria-label="Hull Type"
            name="hull_type"
            className={classes.group}
            value={this.props.storedValue ? this.props.storedValue : 'monohull'}
            onChange={this.handleChange}
            row={true}
          >
            <FormControlLabel value="monohull" control={<Radio />} label="Monohull" />
            <FormControlLabel value="catamaran" control={<Radio />} label="Catamaran" />
            <FormControlLabel value="trimaran" control={<Radio />} label="Trimaran" />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

HullTypeRadioSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HullTypeRadioSelect);
