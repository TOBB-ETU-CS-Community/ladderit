// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LadderItCoin is ERC20 {
    constructor() ERC20("LadderItCoin", "LIT") {}

    function coinMint(uint256 amount) external {
        _mint(msg.sender, amount);
    }
}
