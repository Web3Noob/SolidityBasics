var abi = [
  {
    inputs: [],
    name: "nextId",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "users",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "create",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "read",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "update",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "destroy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

var storageAddress = "0xaeea4975a6c67cc1ee1879961ee2136d5083282a";
var web3 = new Web3("http://localhost:8545");
var contract = new web3.eth.Contract(abi, storageAddress);

document.addEventListener("DOMContentLoaded", () => {
  const $formCreate = document.getElementById("create");
  const $formRead = document.getElementById("read");
  const $formEdit = document.getElementById("edit");
  const $formDelete = document.getElementById("delete");

  async function createUser(event) {
    event.preventDefault();
    const $userName = document.getElementById("name").value;

    await contract.methods
      .create($userName)
      .send({ from: accounts[1], gas: 3000000 });
  }

  async function readUser(event) {
    event.preventDefault();
    const $readUserId = document.getElementById("read-id").value;

    var result = await contract.methods.read(parseInt($readUserId)).call();
  }

  function editUser(event) {
    event.preventDefault();
    const userName = $userName.value;

    contract.methods.create(userName).send({ from: accounts[1] });
  }

  function deleteUser(event) {
    event.preventDefault();
    const userName = $userName.value;

    contract.methods.create(userName).send({ from: accounts[1] });
  }

  $formCreate.addEventListener("submit", createUser);
  $formRead.addEventListener("submit", readUser);
  $formEdit.addEventListener("submit", editUser);
  $formDelete.addEventListener("submit", deleteUser);

  let accounts = [];

  web3.eth.getAccounts().then((_accounts) => {
    console.log(_accounts);
    accounts = _accounts;
  });
});
