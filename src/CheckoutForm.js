import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    ev.preventDefault();
    const {source, error} = await this.props.stripe.createSource({
      type: 'card',
      currency: 'eur',
      owner: {
        name: 'Jenny Rosen',
      },
    });
    let response = await fetch("https://us-central1-sailboats-445f9.cloudfunctions.net/createSource", {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: source.id
    });
    // add error handling
    // add loading spinner while payment is processing
    console.log(source);
  }

  render() {
    return (
      <div className="checkout">
        <p>Add a new payment method</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
