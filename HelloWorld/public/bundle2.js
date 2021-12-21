const Web3 = require("web3");

var abi = {
  inputs: [],
  name: "getHelloWorld",
  outputs: [
    {
      internalType: "string",
      name: "",
      type: "string",
    },
  ],
  stateMutability: "pure",
  type: "function",
  constant: true,
};

var helloWorldAddress = "0xaeea4975a6c67cc1ee1879961ee2136d5083282a";

var helloWorld = new web3.eth.Contract(helloWorldABI, helloWorldAddress);

document.addEventListener("DOMContentLoaded", () => {
  helloWorld.methods
    .getHelloWorld()
    .call()
    .then((result) => {
      document.getElementById("hello").innerHTML = result;
    });
});
