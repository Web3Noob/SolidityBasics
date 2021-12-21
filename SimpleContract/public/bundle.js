var contractABI = [];
var contractAddress = "0xaeea4975a6c67cc1ee1879961ee2136d5083282a";
var web3 = new Web3("http://localhost:8545");
var simpleSmartContract = new web3.eth.Contract(contractABI, contractAddress);

console.log("log " + JSON.stringify(simpleSmartContract.defaultAccount));

web3.eth.getAccounts().then(console.log);
