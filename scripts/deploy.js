const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const Marketplace = await hre.ethers.getContractFactory("NFTLMarket");
  const marketplace = await Marketplace.deploy();
  await marketplace.deployed();
  console.log("Address of the contract",marketplace.address)

  
  const data = {
    address: marketplace.address,
    abi: JSON.parse(marketplace.interface.format('json')),
  }
  fs.writeFileSync('./Marketplace.json', JSON.stringify(data))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });