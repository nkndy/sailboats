import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';

import AppBar from "./components/AppBar";
import Home from "./components/Home";
import NewListing from "./components/NewListing";
import Error from "./components/Error";

import firebase, { auth, provider } from './firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null // <-- add this line
    };
    this.login = this.login.bind(this); // <-- add this line
    this.logout = this.logout.bind(this); // <-- add this line
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }
  handleChange(e) {
  /* ... */
  }
  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }
  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <AppBar status={this.state}/>
          <div className="wrapper">
            <h1>Fun Food Friends</h1>
            {this.state.user ?
              <button onClick={this.logout}>Log Out</button>
              :
              <button onClick={this.login}>Log In</button>
            }
          </div>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/new-sailboat-listing" component={NewListing} />
            <Route component={Error}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
