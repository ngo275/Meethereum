// @flow
import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { newMeetup, applyMeetup, toggleNewMeetupModalIsOpen } from './reducers';
import MeetupBoard from './components/meetupBoard';
import AppBar from './components/appBar';

type PropTypes = {
  message: string,
  blockNumber: number,
  meetups: any,
  newMeetupModalIsOpen: bool,
  setMessage: string => void,
  setOrganizerMeetups: void => void,
  applyMeetup: string => void,
  toggleNewMeetupModalIsOpen: void => void
};

/// アプリの薄いラッパ. ReactとReduxが混在. これより下ではReduxを気にしないで良い.
class App extends Component {
  render() {
    const { blockNumber, meetups, newMeetupModalIsOpen } = this.props;

    return (
      <div className="App">
        <div>{blockNumber}</div>
        <AppBar 
          newMeetup={ (name, place, date, time, minFee, capaicity) => this.props.newMeetup(name, place, date, time, minFee, capaicity) }
          newMeetupModalIsOpen={newMeetupModalIsOpen}
          toggleNewMeetupModalIsOpen={ () => this.props.toggleNewMeetupModalIsOpen() }
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
    meetups: state.meetups,
    newMeetupModalIsOpen: state.newMeetupModalIsOpen
  }),
  dispatch => ({
    applyMeetup: (address: string) => applyMeetup(address),
    newMeetup: (name: string, place: string, date: string, time: string, minFee: number, capacity: number) => newMeetup(name, place, date, time, minFee, capacity),
    toggleNewMeetupModalIsOpen: () => dispatch(toggleNewMeetupModalIsOpen())
  })
)(App);