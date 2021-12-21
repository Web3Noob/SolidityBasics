const Hello = artifacts.require("helloWorld");

module.exports = function (deployer) {
  deployer.deploy(Hello);
};
