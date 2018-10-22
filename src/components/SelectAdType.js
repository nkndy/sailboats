import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
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
      <div>
        <Radio
          checked={this.state.selectedValue === 'false'}
          onChange={this.handleChange}
          value="false"
          name="subscription-type-select"
          aria-label="Standard"
          label="test"
        />
        <Radio
          checked={this.state.selectedValue === 'true'}
          onChange={this.handleChange}
          value="true"
          name="subscription-type-select"
          aria-label="Premium"
        />
      </div>
    );
  }
}

RadioButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtons);
