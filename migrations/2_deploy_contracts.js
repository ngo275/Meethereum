var MeetupController = artifacts.require("./MeetupController.sol");

module.exports = function(deployer) {
  deployer.deploy(MeetupController);
};