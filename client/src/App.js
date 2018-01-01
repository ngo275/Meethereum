import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import './App.css';
import MeetupBoard from './components/meetupBoard';
import AppBar from './components/appBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        <MeetupBoard />
      </div>
    );
  }
}

export default App;
