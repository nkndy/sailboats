import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = {
};

class RadioButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: 'false',
    };
  }
  handleChange = event => {
    this.props.handleSubscriptionSelect(event);
    this.setState({ selectedValue: event.target.value });
  };
  render() {
    const { classes } = this.props;
    return (
      <FormControl component="fieldset" className={classes.formControl}>
        <RadioGroup
          aria-label="Ad Type"
          name="adType"
          className={classes.group}
          value={this.state.value}
          onChange={this.handleChange}
        >
          <FormControlLabel
            value="standard"
            control={
              <Radio
                checked={this.state.selectedValue === 'false'}
                onChange={this.handleChange}
                value="false"
                name="subscription-type-select"
                aria-label="Standard"
                label="test"
              />
            }
            label="Standard Listing"
          />
          <FormControlLabel
            value="premium"
            control={
              <Radio
                checked={this.state.selectedValue === 'true'}
                onChange={this.handleChange}
                value="true"
                name="subscription-type-select"
                aria-label="Premium"
              />
            }
            label="Premium Listing"
          />
        </RadioGroup>
      </FormControl>
    );
  }
}

RadioButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtons);
