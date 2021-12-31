// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Deposit {
    address public depositor;
    address payable public beneficiary;
    address public lawyer;

    uint256 public amount;

    bool is_deposited;

    constructor(
        address _depositor,
        address payable _beneficiary,
        uint256 _amount
    ) payable {
        depositor = _depositor;
        beneficiary = _beneficiary;
        lawyer = msg.sender;
        amount = _amount;
        is_deposited = false;
    }

    function deposit() public payable {
        require(msg.sender == depositor, "Sender must be the depositor");
        require(msg.value == amount, "Must send amount");
        require(is_deposited == false, "Has been already sent");

        is_deposited = true;
    }

    function withdraw() public {
        require(
            is_deposited == true,
            "cannot withdraw funds before it is deposited"
        );
        require(msg.sender == lawyer, "only lawyer can withdraw funds");
        beneficiary.transfer(amount);
    }

    function balanceOf() public view returns (uint256) {
        return address(this).balance;
    }
}
