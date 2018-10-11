import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';

import AppBar from "./components/AppBar";
import Home from "./components/Home";
import NewListing from "./components/NewListing";
import MyAccount from "./components/MyAccount";
import Error from "./components/Error";
import AccountDialogue from "./components/AccountDialogue";
import Footer from "./components/Footer";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null
    };
  }
  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        (this.state.user != null)
          ? <Component {...props} />
          : <AccountDialogue />
      )} />
    )
    return (
      <BrowserRouter>
        <div>
          <AppBar status={this.state}/>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/new-sailboat-listing" component={NewListing} />
            <PrivateRoute path="/my-account" component={MyAccount} />
            <Route component={Error}/>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
