import * as Web3 from 'web3';

export function setupWeb3() {
  if (typeof window.web3 !== 'undefined') {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:8545')
    );
  }
}

export function setupDefaultAccount() {
  return new Promise((resolve, reject) => {
    window.web3.eth.getAccounts((err, accounts) => {
      if (err) {
        reject(err);
        return;
      }
      window.web3.eth.defaultAccount = accounts[0];
      resolve();
    });
  });
}

export function fromUtf8(str) {
  return window.web3.fromUtf8(str);
}

export function toUtf8(hex) {
  return window.web3.toUtf8(hex);
}

export function getNetwork() {
  const web3 = window.web3;
  return new Promise((resolve, reject) => {
    web3.version.getNetwork((err, netId) => {
      if (err) {
        reject(err);
        return;
      }
      switch (netId) {
        case '1':
          resolve('Mainnet');
          break;
        case '2':
          resolve('Morden');
          break;
        case '3':
          resolve('Ropsten');
          break;
        case '4':
          resolve('Rinkeby');
          break;
        case '42':
          resolve('Kovan');
          break;
        default:
          resolve('Unknown');
          break;
      }
    });
  });
}

export function getBlockNumber() {
  const web3 = window.web3;
  return new Promise((resolve, reject) => {
    web3.eth.getBlockNumber((err, blockNumber) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(blockNumber);
    });
  });
}

export function setOnAccountChange(callback) {
  const web3 = window.web3;
  let account = web3.eth.accounts[0];
  return setInterval(function() {
    if (web3.eth.accounts[0] !== account) {
      account = web3.eth.accounts[0];
    }
  }, 100);
}
