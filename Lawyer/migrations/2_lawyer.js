const Lawyer = artifacts.require("Lawyer");

module.exports = function (deployer, _network, accounts) {
  deployer.deploy(Lawyer, accounts[0], accounts[1], 5, { value: 100 });
};
