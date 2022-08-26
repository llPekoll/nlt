//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import 'hardhat/console.sol';

contract NFTLMarket is ReentrancyGuard {

    using Counters for Counters.Counter;
     Counters.Counter private _tokenIds;

     uint256 listingPrice = 0.001 ether;

    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

     struct MarketToken {
        uint itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        bool sold;
     }

    // tokenId return which MarketToken -  fetch which one it is 

    mapping(uint256 => MarketToken) private idToMarketToken;

    // listen to events from front end applications
    event MarketTokenMinted(
        uint indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        bool sold
    );

    // get the listing price
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function getCurrentToken() public view returns (uint256) {
        return _tokenIds.current();
    }

    function getMarkertItem(uint256 _tokenId) public view returns (MarketToken memory) {
        return idToMarketToken[_tokenId];
    }

    function updateListPrice(uint256 _listPrice) public payable {
        require(owner == msg.sender, "Only owner can update listing price");
        listingPrice = _listPrice;
    }
    function withdraw() public{
        require(owner == msg.sender, "Only owner can update listing price");
        require(address(this).balance>0, 'nothing to withdraw');
        payable(owner).transfer(address(this).balance);
    }
    // two functions to interact with contract
    // 1. create a market item to put it up for sale
    // 2. create a market sale for buying and selling between parties

    function listTokenOnMarket(
        address nftContract,
        uint tokenId
        // uint price
    )
    public payable nonReentrant {
        // nonReentrant is a modifier to prevent reentry attack

    // require(price > 0, 'Price must be at least one wei');
    // require(msg.value == listingPrice, 'Price must be equal to listing price');

    _tokenIds.increment();
    uint itemId = _tokenIds.current();

    //putting it up for sale - bool - no owner
    idToMarketToken[itemId] = MarketToken(
        itemId,
        nftContract,
        tokenId,
        payable(msg.sender),
        payable(address(0)),
        true
    );

    // NFT transaction 
    IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
    emit MarketTokenMinted(
        itemId,
        nftContract,
        tokenId,
        msg.sender,
        address(this),
        true
    );
    }
    // function to conduct transactions and market sales 

    function saleToken(
        address nftContract,
        uint itemId) 
        public payable nonReentrant {
            // uint price = idToMarketToken[itemId].price;
            uint tokenId = idToMarketToken[itemId].tokenId;
            // require(msg.value == price, 'Please submit the asking price in order to continue');

            // transfer the amount to the seller
            // idToMarketToken[itemId].seller.transfer(msg.value);
            // transfer the token from contract address to the buyer
            IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
            
            idToMarketToken[itemId].owner = payable(msg.sender);
 
            payable(owner).transfer(listingPrice);
        }

}