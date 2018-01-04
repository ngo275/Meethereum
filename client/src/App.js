// @flow
import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { newMeetup, applyMeetup } from './reducers';
import MeetupBoard from './components/meetupBoard';
import AppBar from './components/appBar';

type PropTypes = {
  message: string,
  blockNumber: number,
  meetups: any,
  setMessage: string => void,
  setOrganizerMeetups: void => void,
  applyMeetup: string => void
};

/// アプリの薄いラッパ. ReactとReduxが混在. これより下ではReduxを気にしないで良い.
class App extends Component {
  render() {
    const { blockNumber, meetups } = this.props;

    return (
      <div className="App">
        <div>{blockNumber}</div>
        <AppBar 
          newMeetup={ () => this.props.newMeetup() }
        />
        <MeetupBoard
          meetups={meetups} 
          applyMeetup={ (address) => this.props.applyMeetup(address) }  
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    blockNumber: state.blockNumber,
    meetups: state.meetups
  }),
  dispatch => ({
    applyMeetup: (address: string) => applyMeetup(address),
    newMeetup: () => newMeetup()
  })
)(App);