// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "hardhat/console.sol";

contract NFTLMarket is ERC721URIStorage {


    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 listingPrice = 0.001 ether;
    uint256 taxeValue = 3;
    address payable owner;


    struct TokenInfo {
        IERC20 paytoken;
        uint256 costvalue;
    }

    TokenInfo[] public AllowedCrypto;

    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
      uint256 tokenId;
      address payable seller;
      address payable owner;
      uint256 price;
      bool sold;
    }

    event MarketItemCreated (
      uint256 indexed tokenId,
      address seller,
      address owner,
      uint256 price,
      bool sold
    );

    constructor() ERC721("NFTLTokens", "NFTLS") {
      owner = payable(msg.sender);
    }

  function addCurrency(
        IERC20 _paytoken,
        uint256 _costvalue
    ) public {
      require(owner == msg.sender, "Only marketplace owner can add currency.");
        AllowedCrypto.push(
            TokenInfo({
                paytoken: _paytoken,
                costvalue: _costvalue
            })
        );
    }
    /* Updates the listing price of the contract */
    function updateListingPrice(uint _listingPrice) public payable {
      require(owner == msg.sender, "Only marketplace owner can update listing price.");
      listingPrice = _listingPrice;
    }
    function updateListingTax(uint _taxeValue) public payable {
      require(owner == msg.sender, "Only marketplace owner can update listing price.");
      taxeValue= _taxeValue;
    }

    function getListedTokenForId(uint256 _tokenId) public view returns (MarketItem memory) {
        return idToMarketItem[_tokenId];
    }

    function burn(uint256 _tokenId) public payable {
      require(owner == msg.sender, "Only marketplace owner can burn Token.");
      delete idToMarketItem[_tokenId];
      _burn(_tokenId);
    }

    /* Returns the listing price of the contract */
    function getListingPrice() public view returns (uint256) {
      return listingPrice;
    }

    /* Mints a token and lists it in the marketplace */
    function createToken(string memory tokenURI, uint256 price) public payable returns (uint) {
      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();

      _mint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, tokenURI);
      createMarketItem(newTokenId, price);
      return newTokenId;
    }

    function createMarketItem(
      uint256 tokenId,
      uint256 price
    ) private {
      require(price > 0, "Price must be at least 1 wei");
      require(msg.value == listingPrice, "Price must be equal to listing price");

      idToMarketItem[tokenId] =  MarketItem(
        tokenId,
        payable(msg.sender),
        payable(address(this)),
        price,
        false
      );

      _transfer(msg.sender, address(this), tokenId);
      emit MarketItemCreated(
        tokenId,
        msg.sender,
        address(this),
        price,
        false
      );
    }

// BNB
    function createMarketSaleBNB(
      uint256 tokenId
      ) public payable {
      uint price = idToMarketItem[tokenId].price;
      address seller = idToMarketItem[tokenId].seller;
      require(msg.value == price, "Please submit the asking price in order to complete the purchase");
      idToMarketItem[tokenId].owner = payable(msg.sender);
      idToMarketItem[tokenId].sold = true;
      idToMarketItem[tokenId].seller = payable(address(0));
      _itemsSold.increment();
      _transfer(address(this), msg.sender, tokenId);
      payable(owner).transfer(listingPrice);
      payable(seller).transfer(msg.value);
    }
// END OF BNB
// NFTL
    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function createMarketSale(
      uint256 tokenId
      ) public payable {
      idToMarketItem[tokenId].owner = payable(msg.sender);
      idToMarketItem[tokenId].sold = true;
      idToMarketItem[tokenId].seller = payable(address(0));
      _itemsSold.increment();
      _transfer(address(this), msg.sender, tokenId);
      payable(owner).transfer(listingPrice);
    }
// END OF NFTL
// 
// NFTL BLOCKCHAIN
    function createMarketSaleNFTL(
      uint256 tokenId,
      uint256 _pid
      ) public payable {
      TokenInfo storage tokens = AllowedCrypto[_pid];
      IERC20 paytoken;
      paytoken = tokens.paytoken;
      uint price = idToMarketItem[tokenId].price;
      address seller = idToMarketItem[tokenId].seller;
      require(msg.value == price, "Please submit the asking price in order to complete the purchase");
      idToMarketItem[tokenId].owner = payable(msg.sender);
      idToMarketItem[tokenId].sold = true;
      idToMarketItem[tokenId].seller = payable(address(0));
      _itemsSold.increment();
      _transfer(address(this), msg.sender, tokenId);
      paytoken.transferFrom(msg.sender, seller, price);
      payable(owner).transfer(listingPrice);
      }

    function createMarketSaleNFTLPlusTax(
      uint256 tokenId,
      uint256 _pid
      ) public payable {
      TokenInfo storage tokens = AllowedCrypto[_pid];
      IERC20 paytoken;
      paytoken = tokens.paytoken;
      uint price = idToMarketItem[tokenId].price;
      address seller = idToMarketItem[tokenId].seller;
      require(msg.value == price, "Please submit the asking price in order to complete the purchase");
      idToMarketItem[tokenId].owner = payable(msg.sender);
      idToMarketItem[tokenId].sold = true;
      idToMarketItem[tokenId].seller = payable(address(0));
      _itemsSold.increment();
      uint forMe = (price*taxeValue)/100;
      uint forSaller = price -forMe;

      _transfer(address(this), msg.sender, tokenId);
      paytoken.transferFrom(address(this), seller, forMe);
      paytoken.transferFrom(msg.sender, seller, forSaller);
    }
// ENF OF NFTL BLOCKCHAIN
    /* Returns all unsold market items */
    function fetchMarketItems() public view returns (MarketItem[] memory) {
      uint itemCount = _tokenIds.current();
      uint unsoldItemCount = _tokenIds.current() - _itemsSold.current();
      uint currentIndex = 0;

      MarketItem[] memory items = new MarketItem[](unsoldItemCount);
      for (uint i = 0; i < itemCount; i++) {
        if (idToMarketItem[i + 1].owner == address(this)) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    /* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].owner == msg.sender) {
          itemCount += 1;
        }
      }

      MarketItem[] memory items = new MarketItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].owner == msg.sender) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    /* Returns only items a user has listed */
    function fetchItemsListed() public view returns (MarketItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].seller == msg.sender) {
          itemCount += 1;
        }
      }

      MarketItem[] memory items = new MarketItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].seller == msg.sender) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }
    function withdrawCurrency(uint256 _pid) public payable {
      require(owner == msg.sender, "Only marketplace owner can withdraw.");
      require(address(this).balance>0, 'nothing to withdraw');
      TokenInfo storage tokens = AllowedCrypto[_pid];
      IERC20 paytoken;
      paytoken = tokens.paytoken;
      paytoken.transfer(msg.sender, paytoken.balanceOf(address(this)));
    }

    function withdraw() public payable{
        require(owner == msg.sender, "Only owner can withdraw");
        require(address(this).balance>0, 'nothing to withdraw');
        payable(owner).transfer(address(this).balance);
    }

    function withdrawCurrencyAll(uint256 _pid) public payable {
      TokenInfo storage tokens = AllowedCrypto[_pid];
      IERC20 paytoken;
      paytoken = tokens.paytoken;
      require(owner == msg.sender, "Only marketplace owner can withdraw.");
      require(address(this).balance>0, 'nothing to withdraw');
      require(paytoken.balanceOf(address(this))>0, 'nothing to withdraw');
      paytoken.transfer(msg.sender, paytoken.balanceOf(address(this)));
      payable(owner).transfer(address(this).balance);
    }
}