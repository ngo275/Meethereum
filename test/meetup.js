const Meetup = artifacts.require('./Meetup.sol');
const MC = artifacts.require('./MeetupController.sol');

const increaseTime = function(duration) {
  const id = Date.now() / 1000;

  return new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync({
      jsonrpc: '2.0',
      method: 'evm_increaseTime',
      params: [duration],
      id: id,
    }, err1 => {
      if (err1) return reject(err1);

      web3.currentProvider.sendAsync({
        jsonrpc: '2.0',
        method: 'evm_mine',
        id: id + 1,
      }, (err2, res) => {
        return err2 ? reject(err2) : resolve(res)
      });
    });
  });
};

const mineBlock = () => {
  return new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync({
      jsonrpc: '2.0',
      method: 'evm_mine',
    }, (err, result) => {
      if (err) { return reject(err) }
      return resolve(result);
    });
  });
};

contract('Meetup', (accounts) => {
  const applicationPeriod = 2 * 24 * 60 * 60;
  const owner = accounts[1];
  const organizer = accounts[0];
  const fee = 2;

  const PARAMS = {
    _organizer: organizer,
    _name: 'Ethereum Meetup',
    _place: 'New York',
    _minFee: web3.toWei(fee, 'ether'),
    _capacity: 10,
    _owner: owner
  };

  const account1 = accounts[2];
  const account2 = accounts[3];

  let meetup;

  beforeEach(async () => {
    const nowTime = web3.eth.getBlock(web3.eth.blockNumber).timestamp;

    meetup = await Meetup.new(
      PARAMS._organizer,
      PARAMS._name,
      PARAMS._place,
      nowTime - applicationPeriod / 2,
      nowTime + applicationPeriod / 2,
      nowTime + applicationPeriod,
      PARAMS._minFee,
      PARAMS._capacity,
      PARAMS._owner,
    );
  });

  it('should be initialized correctly', async () => {
    assert.equal(await meetup.organizer(), PARAMS._organizer);
    assert.equal(await meetup.name(), PARAMS._name);
    assert.equal(await meetup.minFee(), PARAMS._minFee);
    assert.equal(await meetup.capacity(), PARAMS._capacity);
    assert.equal(await meetup.owner(), PARAMS._owner);
  });

  it('can be aborted', async () => {
    assert.equal(await meetup.aborted(), false);
    await meetup.abortEvent();
    assert.equal(await meetup.aborted(), true);
  });

  it('can not be aborted after application ends', async () => {
    await increaseTime(applicationPeriod);
    await meetup.abortEvent().catch(err => {
      assert.equal(err.message, 'VM Exception while processing transaction: revert');
    });
  });

  it('can not be aborted by non-admin account', async () => {
    await meetup.abortEvent({from: account2}).catch(err => {
      assert.equal(err.message, 'VM Exception while processing transaction: revert');
    });
  });

  it('apply method is fine when fee is enough', async () => {
    assert.equal(await meetup.isApplied({from: account1}), false);
    assert.equal(web3.eth.getBalance(meetup.address).toNumber(), web3.toWei(0, 'ether'));
    await meetup.apply('ngo275', {from: account1, value: web3.toWei(fee, 'ether')});
    assert.equal(await meetup.isApplied({from: account1}), true);
    assert.equal(web3.eth.getBalance(meetup.address).toNumber(), web3.toWei(fee, 'ether'));
  });

  it('apply method is called twice but fee is not transferred twice', async () => {
    assert.equal(await meetup.isApplied({from: account1}), false);
    await meetup.apply('ngo275', {from: account1, value: web3.toWei(fee, 'ether')});
    await meetup.apply('ngo275', {from: account1, value: web3.toWei(fee, 'ether')});
    assert.equal(await meetup.isApplied({from: account1}), true);
    assert.equal(web3.eth.getBalance(meetup.address).toNumber(), web3.toWei(fee, 'ether'));
  });

  it('apply method does not work when fee is shortage', async () => {
    assert.equal(
      await meetup.apply('ngo275', {from: account1, value: web3.toWei(fee - 1, 'ether')}).catch(err => {
        return err.message;
      }),
      'VM Exception while processing transaction: revert'
    );
  });

  it('apply method is not valid after application ends', async () => {
    await increaseTime(applicationPeriod - 1);
    assert.equal(
      await meetup.apply('ngo275', {from: account1, value: web3.toWei(fee, 'ether')}).catch(err => {
        return err.message;
      }),
      'VM Exception while processing transaction: revert'
    );
  });

  it('cancel method is fine during application period', async () => {
    assert.equal(await meetup.isApplied({from: account1}), false);
    await meetup.apply('ngo275', {from: account1, value: web3.toWei(fee, 'ether')});
    assert.equal(await meetup.isApplied({from: account1}), true);
    await meetup.cancel({from: account1});
    assert.equal(await meetup.isApplied({from: account1}), false);
  });

  it('publishApprovedApplicants method is fine during application period', async () => {
    await meetup.apply('test1', {from: account1, value: web3.toWei(fee, 'ether')});
    await meetup.apply('test2', {from: account2, value: web3.toWei(fee, 'ether')});

    increaseTime(applicationPeriod);

    assert.equal(web3.eth.getBalance(meetup.address).toNumber(), web3.toWei(2 * fee, 'ether'));

    await meetup.publishApprovedApplicants({from: organizer});
    assert.equal(web3.eth.getBalance(meetup.address).toNumber(), web3.toWei(0, 'ether'));

    assert.equal(await meetup.isApplicationApproved.call({from: account1}), true);
    assert.equal(await meetup.isApplicationApproved.call({from: account2}), true);
  });

});