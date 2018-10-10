import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';

import AppBar from "./components/AppBar";
import Home from "./components/Home";
import NewListing from "./components/NewListing";
import Error from "./components/Error";
import AccountDialogue from "./components/AccountDialogue";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null,
      showAccountDialogue: false
    };
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <AppBar status={this.state}/>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/new-sailboat-listing" component={NewListing} />
            <Route component={Error}/>
          </Switch>
          <AccountDialogue showAccountDialogue={this.state.showAccountDialogue}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
