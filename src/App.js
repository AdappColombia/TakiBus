import React, { Component } from 'react';
import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './login.js';

class App extends Component {
  render() {
    return (
      <div className="App">

          <Login />

      </div>
    );
  }
}
export default App;
