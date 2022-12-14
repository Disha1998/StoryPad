// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./mintContract.sol";

contract mintContractParent is Ownable {
    event TokenCreated(address, address);
    event TokenTransfered(address, address, address, uint256);
    uint256 getNFTCount = 0;
    mapping(address => string) tokenNames;
    uint256[] getTokenId;

    address[] tokenContracts;

    function createToken(string memory name, string memory symbol) public {
        address _address = address(new mintContract(name, symbol)); // Created Token contract.
        tokenNames[_address] = name;
        getNFTCount++;

        emit TokenCreated(msg.sender, _address);
    }

    function callURI(
        address tokenAddress,
        uint256 tokenId,
        string memory tokenURI
    ) public {
        mintContract(tokenAddress).setTokenURI(tokenId, tokenURI);
    }

    function bulkMintERC721(
        address mintor,
        address tokenAddress,
        uint256 start,
        uint256 end,
        uint256 price
    ) public {
        for (uint256 i = start; i < end; i++) {
            mintContract(tokenAddress).safeMint(
                mintor,
                price,
                tokenNames[tokenAddress]
            ); //for null address issue, we changed safeMint(msg.sender) to mintor
        }
    }

    function getAllTokenIds() public view returns (uint256[] memory) {
        uint256[] memory ret = new uint256[](getNFTCount);
        for (uint256 i = 0; i < getNFTCount; i++) {
            ret[i] = getTokenId[i];
        }
        return ret;
    }

    //  function getAll() public view returns (address[] memory){
    //     address[] memory ret = new address[](getNFTCount);
    //     for (uint i = 0; i < getNFTCount; i++) {
    //         ret[i] = tokenContracts[i];
    //     }
    //     return ret;
    // }
    function transferToken(
        address from,
        address payable to,
        address token,
        uint256 amount
    ) public {
        mintContract(token).transferTokens(from, to, token, amount);
        emit TokenTransfered(from, to, token, amount);
    }
}
