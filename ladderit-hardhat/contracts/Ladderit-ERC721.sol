// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("LadderIt", "LADIT") {}

    function mint(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
    }
}
