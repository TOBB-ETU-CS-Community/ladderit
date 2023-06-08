const { ethers } = require("hardhat");

async function main() {
  // ERC20 contract deploying...
  const ladderitCoinContractFactory = await ethers.getContractFactory(
    "LadderItCoin"
  );
  console.log("Deploying coin contract...");
  const ladderitCoinContract = await ladderitCoinContractFactory.deploy();
  await ladderitCoinContract.deployed();
  console.log(`Coin contract deployed to: ${ladderitCoinContract.address}`);

  // ERC721 contract deploying...
  const metadataURL = "ipfs://Qme57ZKVb2yTsxAj8yBUr46Ag9yh6BEW9LeXksoyNoBd9z";
  const ladderitNFTContractFactory = await ethers.getContractFactory(
    "LadderItNFT"
  );
  console.log("Deploying NFT contract...");
  const ladderitNFTContract = await ladderitNFTContractFactory.deploy(
    metadataURL
  );
  await ladderitNFTContract.deployed();
  console.log(`NFT contract deployed to: ${ladderitNFTContract.address}`);

  // Main contract deploying...
  const ladderitContractFactory = await ethers.getContractFactory("Ladderit");
  console.log("Deploying contract...");
  const ladderitContract = await ladderitContractFactory.deploy(
    ladderitNFTContract.address,
    ladderitCoinContract.address
  );
  await ladderitContract.deployed();
  console.log(`Contract deployed to: ${ladderitContract.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
