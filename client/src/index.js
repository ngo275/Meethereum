// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as eth from './utils/ethereum';
import * as meetup from './utils/meetup';
import { updateBlockNumber, updateMeetups } from './reducers';
import createStore from './store/create';
import './index.css';
import App from './App';
const { map } = require('p-iteration');

const store = createStore();

/// ReactにReduxを注入するファイル
window.addEventListener('load', function() {
  eth.setupWeb3();

  //eth.setOnGreet(() => {});
  setInterval(async () => {
    const blockNumber = await eth.getBlockNumber();
    console.log(blockNumber);
    if (store.getState().blockNumber !== blockNumber) {
      store.dispatch(updateBlockNumber(blockNumber));
    }
    const meetups = await meetup.getMeetups();
    if (store.getState().meetups.length !== meetups.length) {
      const meetupDetails = await map(meetups, async address => {
        const name = await meetup.getMeetupName(address);
        const capacity = await meetup.getMeetupCapacity(address);
        // const minFee = await this.meetup.getMeetupMinFee(address);
        return {address: address, name: name, capacity: capacity, minFee: 0};
      });
      store.dispatch(updateMeetups(meetupDetails));
    }
  }, 100);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
});
