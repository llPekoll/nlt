const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  // const [deployer] = await ethers.getSigners();
  // const balance = await deployer.getBalance();
  // console.log("deployer", deployer)
  // console.log("Balance", balance)
  const Marketplace = await hre.ethers.getContractFactory("n2DMarket");
  const marketplace = await Marketplace.deploy();
  await marketplace.deployed();
  console.log("Address of the contract",marketplace.address)
  
  // const NFT = await hre.ethers.getContractFactory("N2DNFT");
  // const nft = await NFT.deploy(marketplace.address);
  // await nft.deployed();
  // console.log("Address of the contract",nft.address)

  
  const data = {
    // addressNFT: nft.address,
    address: marketplace.address,
    // abiNFT: JSON.parse(nft.interface.format('json')),
    abi: JSON.parse(marketplace.interface.format('json'))
  }
  
  //This writes the ABI and address to the mktplace.json
  fs.writeFileSync('./Marketplace.json', JSON.stringify(data))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });