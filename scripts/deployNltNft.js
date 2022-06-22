const hre = require("hardhat");

async function main() {
  const NLTNFT = await hre.ethers.getContractFactory("NLTNFT");
  const nltNFT = await NLTNFT.deploy();

  await nltNFT.deployed();

  console.log("NLTNFT deployed to:", nltNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
