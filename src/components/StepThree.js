import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import ContactInputs from './ContactInputs'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

let storedState = {
  description: '',
};

class StepThree extends Component {
  state = {
    description: storedState.description,
    email: this.props.user_email,
  };

  handleChangeMultiline = event => {
    this.setState({
      description: event.target.value,
    });
  };

  updateState = input => {
    let keysArray = Object.keys(input);
    for (const key of keysArray) {
      this.setState({
        [key]: input[key]
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if ( this.state !== prevState ) {
      this.props.updateValues(this.state);
      storedState.description = this.state.description;
    }
  }

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.container}>
        <TextField
          id="multiline-static"
          label="Description"
          value={storedState.description}
          multiline
          rows="4"
          className={classes.textField}
          onChange={this.handleChangeMultiline}
          margin="normal"
          fullWidth
          required
        />
        <ContactInputs user_email={this.props.user_email} updateParentState={this.updateState}/>
      </div>
    );
  }
}

StepThree.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StepThree);
