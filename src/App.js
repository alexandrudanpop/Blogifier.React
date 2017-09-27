import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import BlogsContainer from './blogs-container';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/*todo configurable blog name*/}
          <h2>Blogifier</h2>
        </div>
        <br/>
        <BlogsContainer />
      </div>
    );
  }
}

export default App;
