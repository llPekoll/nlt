//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/access/Ownable.sol';


contract NLTNFT is ERC1155, Ownable {

    uint256[] public tiers;
    uint256[] public mintPrices;
    uint256[] public totalSupplys;
    uint256[] public maxSupplys;
    uint256 public maxPerWallet;
    bool public isPublicMintEnable;
    string internal basetokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMint;
    
    constructor() ERC1155('https://nlt.rocks/metadata/{id}.json'){
        tiers = [0, 1, 2];
        mintPrices = [1 ether, 2 ether, 4 ether];
        totalSupplys = [1, 1, 1];
        maxSupplys = [300, 100, 30];
        isPublicMintEnable = true;
        maxPerWallet = 3;
        basetokenUri = 'https://nlt.rocks/metadata/';
        for(uint i=0; i<tiers.length; i++){
            _mint(msg.sender , tiers[i], 1, '');
        }   
    }

    function mint(uint256 id) payable public{
        require(isPublicMintEnable,'Public mint is not enabled');
        require(walletMint[msg.sender] <= maxPerWallet,'to much NFT on your wallet');
        for(uint i=0; i<tiers.length; i++){
            if (id == i){
                require(totalSupplys[i] <= maxSupplys[i],'Max supply reached');
                require(msg.value == mintPrices[i],'wrong mint price should be id 0');
                totalSupplys[i] ++;
                _mint(msg.sender , tiers[i], 1, '');
            }
        }
    }

    function addNewToken(uint256 _price, uint256 _maxSupply) external onlyOwner {
        uint x = tiers.length - 1;
        tiers.push(tiers.length);
        mintPrices.push(_price);
        totalSupplys.push(1);
        maxSupplys.push(_maxSupply);
        _mint(msg.sender , tiers[x], 1, '');
    }

    function setIsPublicMintEnable(bool _isPublicMintEnable) external onlyOwner {
        isPublicMintEnable = _isPublicMintEnable;
    }
    function setBaseTokenUri(string calldata _basetokenUri) external onlyOwner {
        basetokenUri = _basetokenUri;
    }
    function uri(uint256 _tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(basetokenUri, Strings.toString(_tokenId),".json"));
    }
    function withdraw() public  onlyOwner{
        require(address(this).balance>0, 'nothing to withdraw');
        payable(owner()).transfer(address(this).balance);
    }
}