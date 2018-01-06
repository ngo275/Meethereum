// @flow
// import * as eth from '../utils/ethereum';
import * as meetup from '../utils/meetup';

type Action = {
  type: string,
  payload: any,
};

type State = {
  message: string,
  meetups: {address: string, name: string, capacity: number, minFee: number}[],
  blockNumber: number,
  pastMessages: string[],
  newMeetupModalIsOpen: bool
};

const initialState: State = {
  message: '',
  meetups: [],
  blockNumber: 0,
  pastMessages: [],
  newMeetupModalIsOpen: false
};

export function sendMessage(message: string) {
  return (dispatch) => {
    //eth.setMessage(message);
  };
}

export function updateMessage(message: string) {
  return {
    type: 'message/update',
    payload: message,
  };
}

export function updateBlockNumber(blockNumber: number) {
  return {
    type: 'blockNumber/update',
    payload: blockNumber,
  };
}

export function addPastMessages(message: string) {
  return {
    type: 'pastMessages/add',
    payload: message,
  };
}

export function updateMeetups(meetups: string[]) {
  return {
    type: 'meetups/update',
    payload: meetups,
  };
}

export function toggleNewMeetupModalIsOpen() {
  return {
    type: 'toggle/modal/newMeetupModal',
    payload: null
  }
}

export function newMeetup(name: string, place: string, date: string, time: string, minFee: number, capacity: number) {
  const now = Date.now() / 1000;
  // TODO: dateとtimeをつなげる
  console.log(date, time);
  const d = date.split('-'); // 2018-01-09
  const t = time.split(':'); // 20:00
  const eventTimeString = new Date(d[0], d[1] - 1, d[2], t[0], t[1])
  const eventTimestamp = Date.parse(eventTimeString) / 1000;
  const applicationEndedAt = eventTimestamp - 60 * 60 * 24
  meetup.newMeetup(name, place, now, applicationEndedAt, eventTimestamp, minFee, capacity);
}

export function applyMeetup(address: string) {
  meetup.applyMeetup(address);
}

export default (state: State = initialState, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case 'meetups/update': {
      return { ...state, meetups: payload };
    }
    case 'message/update': {
      return { ...state, message: payload };
    }
    case 'blockNumber/update': {
      return { ...state, blockNumber: payload };
    }
    case 'pastMessages/add': {
      return { ...state, pastMessages: [...state.pastMessages, payload] };
    }
    case 'toggle/modal/newMeetupModal': {
      console.log(!state.newMeetupModalIsOpen);
      return { ...state, newMeetupModalIsOpen: !state.newMeetupModalIsOpen }
    }
    default: {
      return state;
    }
  }
};