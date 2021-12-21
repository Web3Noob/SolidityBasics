const Storage = artifacts.require("SimpleStorage");

module.exports = function (deployer) {
  deployer.deploy(Storage);
};
