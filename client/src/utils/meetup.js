import Contract from '../contract';
import * as eth from '../utils/ethereum';

// MARK: - SmartContract initialize methods

export function meetupControllerInstance() {
  return new window.web3.eth.Contract(Contract.meetupControllerABI, Contract.meetupControllerAddress);
}

export function meetupInstance(address) {
  return new window.web3.eth.Contract(Contract.meetupABI, address);
}

// MARK: - MeetupController contract methods

export async function getMeetups() {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupControllerInstance().methods.getOrganizerMeetups('0x005041C1a70B270DB90adaEbb109f4C9501d2C6B')
      .call()
      .then((result, reject) => {
        resolve(result);
      });
  });
}

export async function newMeetup() {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    // @TODO: ここがちゃんと動いていない
    meetupControllerInstance().methods.setupMeetup('0x005041C1a70B270DB90adaEbb109f4C9501d2C6B', 'blockchain meetup', 1514811148, 1514821148, 10, 100)
      .call()
      .then((result) => {
        // @TODO: metamaskにsignを求められない
        console.log(result);
        resolve(result);
      });
  });
}


// MARK: - Meetup contract methods

export async function applyMeetup(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    // @TODO: ここがちゃんと動いていない
    meetupInstance(address).methods.apply('NGO275').call().then(result => {
      resolve(result);
    });
  });
}

export async function getMeetupName(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupInstance(address).methods.name().call().then(result => {
      resolve(result);
    });
  });
}

export async function getMeetupCapacity(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupInstance(address).methods.capacity().call().then(result => {
      resolve(result);
    });
  });
}

export async function getMeetupMinFee(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupInstance(address).methods.minFee().call().then(result => {
      console.log(result);
      resolve(result);
    });
  });
}
