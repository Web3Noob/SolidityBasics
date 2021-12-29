// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SplitPayment {
    address payable public owner;

    constructor(address payable _owner) {
        owner = _owner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Function can be executed only by owner");
        _;
    }

    function send(address payable[] memory receivers, uint256[] memory amount)
        public
        payable
        onlyOwner
    {
        require(
            receivers.length == amount.length,
            "Receivers and amounts number must be the same"
        );

        for (uint256 i = 0; i < receivers.length; i++) {
            receivers[i].transfer(amount[i]);
        }
    }
}
