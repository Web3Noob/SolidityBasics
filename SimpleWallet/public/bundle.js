var abi = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_owner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "sendCash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "balanceOf",
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

document.addEventListener("DOMContentLoaded", async () => {
  const $form = document.getElementById("send");
  const $depositForm = document.getElementById("deposit");
  const $balance = document.getElementById("balance");

  async function sendEther(event) {
    event.preventDefault();
    const $receiverAddress = document.getElementById("receiver-address").value;
    const $value = document.getElementById("amount").value;

    await contract.methods
      .sendCash($receiverAddress, $value)
      .send({ from: accounts[0], gas: 3000000 });

    await refreshBalance();
  }

  async function deposit(event) {
    event.preventDefault();
    const $value = document.getElementById("amount-deposit").value;

    console.log("Value: " + $value);

    await contract.methods.deposit().send({ from: accounts[0], value: $value });

    await refreshBalance();
  }

  async function refreshBalance() {
    var balance = await contract.methods.balanceOf().call();

    $balance.innerHTML = balance;
  }

  $form.addEventListener("submit", sendEther);
  $depositForm.addEventListener("submit", deposit);

  console.log("test");

  let accounts = await web3.eth.getAccounts();

  await refreshBalance();
});
