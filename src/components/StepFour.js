import React, { Component } from 'react';
import MediaUploader from './MediaUploader';

class StepFour extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return(
      <MediaUploader user_id={this.props.user_id} />
    );
  }
}

export default StepFour;
