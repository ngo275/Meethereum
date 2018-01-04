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
    meetupControllerInstance().methods
      .getOrganizerMeetups(window.web3.eth.defaultAccount)
      .call()
      .then((result, reject) => {
        resolve(result);
      });
  });
}

export async function newMeetup() {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupControllerInstance().methods
      .setupMeetup(window.web3.eth.defaultAccount, 'blockchain meetup', '東京都文京区本郷七丁目3番1号', 1514986781, 1515086781, 1515583800, 10, 100)
      .send({from: window.web3.eth.defaultAccount})
      .then(result => {
        console.log(result);
        resolve(result);
      });
  });
}


// MARK: - Meetup contract methods

export async function applyMeetup(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupInstance(address).methods
      .apply('NGO275')
      .send({from: window.web3.eth.defaultAccount, value: window.web3.utils.toWei('0.1', 'ether')})
      .then(result => {
        console.log(result);
        resolve(result);
      });
    }
  );
}

export async function cancelMeetup(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupInstance(address).methods
      .cancel()
      .send({from: window.web3.eth.defaultAccount})
      .then(result => {
        console.log(result);
        resolve(result);
      });
    }
  );
}

export async function publishApprovedApplicants(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupInstance(address).methods
      .publishApprovedApplicants()
      .send({from: window.web3.eth.defaultAccount})
      .then(result => {
        console.log(result);
        resolve(result);
      });
    }
  );
}

export async function abortMeetup(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupInstance(address).methods
      .abortEvent()
      .send({from: window.web3.eth.defaultAccount})
      .then(result => {
        console.log(result);
        resolve(result);
      });
    }
  );
}

export async function getCandidates(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupInstance(address).methods
      .candidates()
      .call()
      .then(result => {
        console.log(result);
        resolve(result);
      });
    }
  );
}

export async function getMeetupName(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupInstance(address).methods.name().call().then(result => {
      resolve(result);
    });
  });
}

export async function getMeetupPlace(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupInstance(address).methods.place().call().then(result => {
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
      resolve(result);
    });
  });
}

export async function getMeetupDate(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupInstance(address).methods.date().call().then(result => {
      resolve(result);
    });
  });
}

export async function getMeetupApplicationStartedAt(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupInstance(address).methods.applicationStartedAt().call().then(result => {
      resolve(result);
    });
  });
}

export async function getMeetupApplicationEndedAt(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupInstance(address).methods.applicationEndedAt().call().then(result => {
      resolve(result);
    });
  });
}

export async function getMeetupCandidatesCount(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupInstance(address).methods.candidatesCount().call().then(result => {
      resolve(result);
    });
  });
}

export async function getIsApplied(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupInstance(address).methods.isApplied().call().then(result => {
      resolve(result);
    });
  });
}