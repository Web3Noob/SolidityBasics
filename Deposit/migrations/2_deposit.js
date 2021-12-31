const Deposit = artifacts.require("Deposit");

module.exports = function (deployer, _network, accounts) {
  deployer.deploy(Deposit, accounts[1], accounts[2], 10);
};
