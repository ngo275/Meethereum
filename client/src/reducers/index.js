// @flow
import * as eth from '../utils/ethereum';
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
};

const initialState: State = {
  message: '',
  meetups: [],
  blockNumber: 0,
  pastMessages: [],
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

export function newMeetup() {
  meetup.newMeetup();
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
    default: {
      return state;
    }
  }
};