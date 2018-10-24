import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
});

class TruncatedDescription extends React.Component {
    constructor(props){
      super(props);
      this.truncate = this.truncate.bind(this);
    };
    componentDidMount() {
    }
    truncate(elem, limit, after) {
    	// Make sure an element and number of items to truncate is provided
    	if (!elem || !limit) return;
    	// Get the inner content of the element
    	var content = elem;
    	// Convert the content into an array of words
    	// Remove any words above the limit
    	content = content.split(' ').slice(0, limit);
    	// Convert the array of words back into a string
    	// If there's content to add after it, add it
    	content = content.join(' ') + (after ? after : '');
    	// Inject the content back into the DOM
    	return content;
    }
    render() {
        return(
          <React.Fragment>
          <Typography>
          {this.truncate(this.props.data.description, 95, '...')}
          </Typography>
          </React.Fragment>
        );
    }
}

TruncatedDescription.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TruncatedDescription);
