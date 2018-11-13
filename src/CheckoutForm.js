import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
      try {
        let {token} = await this.props.stripe.createToken({name: "Name"});
        // let response = await fetch("https://us-central1-sailboats-445f9.cloudfunctions.net/charge", {
        //   method: "POST",
        //   headers: {"Content-Type": "text/plain"},
        //   body: {
        //     "token": token,
        //     "charge": {
        //       "amount": "200",
        //       "currency": "USD"
        //     }
        //   }
        // });
        let response = await fetch("https://us-central1-sailboats-445f9.cloudfunctions.net/charge", {
          method: "POST"
        })
        let data = await response.json();
        if (response.ok) console.log( "Purchase Complete!: ", data);
        if (response.ok) this.setState({complete: true});
      } catch (e) {
        console.log(e);
      }
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
