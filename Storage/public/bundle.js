var abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "num",
        type: "uint256",
      },
    ],
    name: "addNumber",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumbersCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

var storageAddress = "0xaeea4975a6c67cc1ee1879961ee2136d5083282a";
var web3 = new Web3("http://localhost:8545");
var contract = new web3.eth.Contract(abi, storageAddress);

document.addEventListener("DOMContentLoaded", () => {
  const $setData = document.getElementById("add");
  const $data = document.getElementById("input");
  const $counter = document.getElementById("counter");

  let accounts = [];

  web3.eth.getAccounts().then((_accounts) => {
    accounts = _accounts;
  });

  const getData = () => {
    contract.methods
      .getNumbersCount()
      .call()
      .then((result) => {
        $counter.innerHTML = result;
      });
  };
  getData();

  $setData.addEventListener("click", (e) => {
    e.preventDefault();
    const data = $data.value;
    console.log("Data" + data);
    contract.methods
      .addNumber(parseInt(data))
      .send({ from: accounts[0] })
      .then(getData);
  });
});
