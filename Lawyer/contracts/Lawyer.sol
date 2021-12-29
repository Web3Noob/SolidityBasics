// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Lawyer {
    address public lawyer;
    address payable public beneficiary;

    uint256 public when;

    constructor(
        address _lawyer,
        address payable _beneficiary,
        uint256 fromNow
    ) payable {
        lawyer = _lawyer;
        beneficiary = _beneficiary;
        when = block.timestamp + fromNow;
    }

    function execute() public {
        require(msg.sender == lawyer, "lawyer only");
        require(block.timestamp >= when, "too early");

        beneficiary.transfer(address(this).balance);
    }
}
