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
      .then(result => {
        console.log(result);
        resolve(result);
      })
      .catch(error => {
        reject(error.message);
        console.log(error.message);
        return;
      });
  });
}

export async function getUpcomingMeetups() {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupControllerInstance().methods
      .getUpcomingMeetups()
      .call()
      .then(result => {
        console.log(result);
        resolve(result);
      })
      .catch(error => {
        reject(error.message);
        console.log(error.message);
        return;
      });
  });
}

export async function newMeetup(name, place, applicationStartedAt, applicationEndedAt, date, minFee, capacity) {
  eth.setupDefaultAccount();

  // TODO: make toETH method
  const minFeeETH = minFee * (10 ** 18);
  return new Promise((resolve, reject) => {
    meetupControllerInstance().methods
      .setupMeetup(window.web3.eth.defaultAccount, name, place, applicationStartedAt, applicationEndedAt, date, minFeeETH, capacity)
      .send({from: window.web3.eth.defaultAccount})
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error.message);
        return;
      });
  });
}


// MARK: - Meetup contract methods

// TODO: msg.sender.valueのところ
export async function applyMeetup(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupInstance(address).methods
      .apply('NGO275')
      .send({from: window.web3.eth.defaultAccount, value: window.web3.utils.toWei('0.1', 'ether')})
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        console.log(error.message);
        reject(error.message);
        return;
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
        resolve(result);
      })
      .catch(error => {
        reject(error.message);
        return;
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
      })
      .catch(error => {
        reject(error.message);
        return;
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
      })
      .catch(error => {
        reject(error.message);
        return;
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
    }).catch(e => { console.log(e, 'getMeetupName'); });
  });
}

export async function getMeetupPlace(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupInstance(address).methods.place().call().then(result => {
      resolve(result);
    }).catch(e => { console.log(e); });
  });
}

export async function getMeetupCapacity(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupInstance(address).methods.capacity().call().then(result => {
      resolve(result);
    }).catch(e => { console.log(e); });
  });
}

export async function getMeetupMinFee(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupInstance(address).methods.minFee().call().then(result => {
      resolve(result);
    }).catch(e => { console.log(e); });
  });
}

export async function getMeetupDate(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupInstance(address).methods.date().call().then(result => {
      resolve(result);
    }).catch(e => { console.log(e); });
  });
}

export async function getMeetupApplicationStartedAt(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupInstance(address).methods.applicationStartedAt().call().then(result => {
      resolve(result);
    }).catch(e => { console.log(e); });
  });
}

export async function getMeetupApplicationEndedAt(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupInstance(address).methods.applicationEndedAt().call().then(result => {
      resolve(result);
    }).catch(e => { console.log(e); });
  });
}

export async function getMeetupCandidatesCount(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupInstance(address).methods.candidatesCount().call().then(result => {
      resolve(result);
    }).catch(e => { console.log(e); });
  });
}

export async function getIsApplied(address) {
  eth.setupDefaultAccount();
  return new Promise((resolve, reject) => {
    meetupInstance(address).methods.isApplied().call().then(result => {
      resolve(result);
    }).catch(e => { console.log(e); });
  });
}