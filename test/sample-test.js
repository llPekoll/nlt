const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarket", function () {
  it("Should create and execute market sales", async function () {
    console.log('yo')
    const Market = await ethers.getContractFactory('NFTMarket')
    const market = await Market.deploy();
    await market.deployed();
    const marketAddress = market.address;
    console.log('marketAddress: ',marketAddress)
    const NFT = await ethers.getContractFactory('NFT')
    const nft = await NFT.deploy(marketAddress);
    await nft.deployed();
    const nftContractAddress = nft.address;
    
    console.log('nftContractAddress: ',nftContractAddress)
    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();
    
    const auctionPrice = ethers.utils.parseUnits('.01','ether');
    
    console.log('salut')
    await nft.createToken('https://www.mytockenlocation.com');
    console.log('saluté')
    await nft.createToken('https://www.mytockenlocation2.com');
    console.log('ca va')
    
    await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice})
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice})
    
    const [_, buyerAddress] = await ethers.getSigners();
    console.log('buyerAddress: ',buyerAddress)

    await market.connect(buyerAddress).createMarketSale(nftContractAddress,1 ,{value:auctionPrice})

    const items = await market.fetchMarketItems();
    items = await Promise.all(items.map(async i =>{
      const tokenUri = await nft.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        onwer: i.owner,
        tokenUri,
      }
      return item
    }))
    
    console.log('items: ',items)
  });
});
