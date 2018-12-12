import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import Typography from '@material-ui/core/Typography';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    this.props.processing();
    ev.preventDefault();
    const {source, error} = await this.props.stripe.createSource({
      type: 'card'
    });
    // add error handling for stripe create source
    let data = {
      "source": source.id,
      "uid": this.props.user
    };
    let response = await fetch("https://us-central1-sailboats-445f9.cloudfunctions.net/createSource", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    let res = await response.json();
    console.log(res);
    if (res) {
      this.props.processing();
    }
    // add error handling
    // add loading spinner while payment is processing
  }

  render() {
    return (
      <div className="checkout">
        <Typography variant="caption" gutterBottom>
        No
        </Typography>
        <CardElement />
        <button onClick={this.submit}>Publish</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
