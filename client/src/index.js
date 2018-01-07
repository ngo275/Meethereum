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
        const place = await meetup.getMeetupPlace(address);
        const capacity = await meetup.getMeetupCapacity(address);
        const minFee = await meetup.getMeetupMinFee(address) * 0.000000000000000001;
        const isApplied = await meetup.getIsApplied(address);
        const candidatesCount = await meetup.getMeetupCandidatesCount(address);
        const timestamp = await meetup.getMeetupDate(address);
        const date = new Date(timestamp * 1000);

        return {
          address: address,
          name: name,
          place: place,
          capacity: capacity,
          minFee: minFee,
          isApplied: isApplied,
          candidatesCount: candidatesCount,
          date: date.toLocaleString()
        };
      });
      store.dispatch(updateMeetups(meetupDetails));
    }
  }, 300);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
});
