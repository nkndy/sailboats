import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
});

class ComponentTemplate extends React.Component {
    constructor(props){
      super(props);
    };
    componentDidMount() {
    }
    render() {
        const { classes } = this.props;
        return(
          <React.Fragment>
          </React.Fragment>
        );
    }
}

ComponentTemplate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComponentTemplate);
