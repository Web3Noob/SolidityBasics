// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
    uint256[] numbers;

    function addNumber(uint256 num) public {
        numbers.push(num);
    }

    function getNumbersCount() public view returns (uint256) {
        return numbers.length;
    }
}
