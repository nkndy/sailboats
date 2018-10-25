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

class ConditionRadioSelect extends React.Component {
  state = {
    value: 'female',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">I declare the general condition of this vessel is:</FormLabel>
          <RadioGroup
            aria-label="Vessel Condition"
            name="condition"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
            row={true}
          >
            <FormControlLabel value="Bristol" control={<Radio />} label="Bristol" />
            <FormControlLabel value="Excellent" control={<Radio />} label="Excellent" />
            <FormControlLabel value="Good" control={<Radio />} label="Good" />
            <FormControlLabel value="Fair" control={<Radio />} label="Fair" />
            <FormControlLabel value="Poor" control={<Radio />} label="Poor" />
            <FormControlLabel value="Project Boat" control={<Radio />} label="Project Boat" />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

ConditionRadioSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConditionRadioSelect);
