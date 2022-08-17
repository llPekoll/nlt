const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  console.log("deployer", deployer)
  console.log("Balance", balance)
  const Marketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const marketplace = await Marketplace.deploy();

  await marketplace.deployed();
  
  const data = {
    address: marketplace.address,
    abi: JSON.parse(marketplace.interface.format('json'))
  }
  
  console.log("Address of the contract",marketplace.address)
  //This writes the ABI and address to the mktplace.json
  fs.writeFileSync('./Marketplace.json', JSON.stringify(data))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });