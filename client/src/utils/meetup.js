import Web3 from 'web3';
import Contract from '../contract';
require('dotenv').config();

export default class Meetup {
  constructor() {
    this.INFURA_ID = process.env.INFURA_ID;
    this.web3 = new Web3();

    if (typeof this.web3 !== 'undefined') {
      if (Web3.givenProvider) {
        this.web3.setProvider(Web3.givenProvider);
      } else {
        if(this.web3.currentProvider.sendAsync) {
          this.web3.currentProvider.send = this.web3.currentProvider.sendAsync;
          delete this.web3.currentProvider.sendAsync;
        }
        this.web3.setProvider(this.web3.currentProvider);
      }
      console.log('[Web3.js] initialized with web3 object');
    } else {
      // set the provider you want from Web3.providers
      // this.web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
      this.web3.setProvider(new Web3.providers.HttpProvider(`https://kovan.infura.io/${this.INFURA_ID}`));
      console.log('[Web3.js] intialized with localhost JSON-RPC');
    }

    // 自分のアドレスをロード
    this.web3.eth.getAccounts().then((result) => {
      this.account = result[0];
    });
  
    // gas の価格を取得
    this.web3.eth.getGasPrice().then((result) => { this.gasPrice = result; });
    
    // 接続しているネットワークのホストを代入
    this.web3.eth.net.getId().then((result) => {
      switch(result) {
      case 1:
        this.etherscanHost = 'https://etherscan.io/';
        break;
      case 3:
        this.etherscanHost = 'https://ropsten.etherscan.io/';
        break;
      case 42:
        this.etherscanHost = 'https://kovan.etherscan.io/';
        break;
      default:
        break;
      }
    });

    // Contract を展開する
    this.contract = new this.web3.eth.Contract(Contract.meetupControllerABI, Contract.meetupControllerAddress);
  }

  setupMeetup() {

  }

  async getOrganizerMeetups() {
    return new Promise((resolve) => {
      this.contract.methods.getOrganizerMeetups('0x005041C1a70B270DB90adaEbb109f4C9501d2C6B')
        .call()
        .then((result) => {
          resolve(result);
        });
    });
  }

  async getMeetupName(address) {
    return new Promise((resolve) => {
      const meetup = new this.web3.eth.Contract(Contract.meetupABI, address);
      meetup.methods.name().call().then(result => {
        resolve(result);
      });
    });
  }

  async getMeetupCapacity(address) {
    return new Promise((resolve) => {
      const meetup = new this.web3.eth.Contract(Contract.meetupABI, address);
      meetup.methods.capacity().call().then(result => {
        resolve(result);
      });
    });
  }

  async getMeetupMinFee(address) {
    return new Promise((resolve) => {
      const meetup = new this.web3.eth.Contract(Contract.meetupABI, address);
      meetup.methods.minFee().call().then(result => {
        console.log(result);
        resolve(result);
      });
    });
  }
}
