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

class StepThree extends Component {
  state = {
    multiline: '',
  };

  handleChangeMultiline = event => {
    this.setState({
      multiline: event.target.value,
    });
  };

  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss'),
    );
  }

  render() {
    const classes = this.props.classes;

    return (
      <div className={classes.container}>
        <TextField
          id="multiline-static"
          label="Description"
          multiline
          rows="4"
          className={classes.textField}
          onChange={this.handleChangeMultiline}
          margin="normal"
          fullWidth
        />
        <ContactInputs user_email={this.props.user_email}/>
      </div>
    );
  }
}

StepThree.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StepThree);
