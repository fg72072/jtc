// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { json } = require("hardhat/internal/core/params/argumentTypes");

// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
let jtc_address = "0x0CFc9D2c958e9a2616CB9f2015eb4883b9ECC4E8" // put jtc address here <-
let busd_address = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"

async function main() {
  // This is just a convenience check
  // if (network.name === "hardhat") {
  //   console.warn(
  //     "You are trying to deploy a contract to the Hardhat Network, which" +
  //       "gets automatically created and destroyed every time. Use the Hardhat" +
  //       " option '--network localhost'"
  //   );
  // }

  // ethers is avaialble in the global scope
  const [deployer, per1, per2] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());



 

  // TokenBUSD = await ethers.getContractFactory("ZPad");
  // busd = await TokenBUSD.deploy();
  // await busd.deployed();

  Crowdsale = await ethers.getContractFactory("Crowdsale");
  crowdsale = await Crowdsale.deploy(1,"0x325B0C9edA2C7Bb6889C62cECC2D62A438C1e91f","0x325B0C9edA2C7Bb6889C62cECC2D62A438C1e91f",1);
  await crowdsale.deployed();

  JTC = await ethers.getContractFactory("JTC");
  jTC = await JTC.deploy(deployer.getAddress() , crowdsale.address);
  await jTC.deployed();

  await crowdsale.setToken(jTC.address)

 // await jTC.transfer(crowdsale.address,4000000000000)

  


  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(jTC, crowdsale);
}
//,nftPreSale,nftPubSale,nft

function saveFrontendFiles(jTC, crowdsale) {
  const fs = require("fs");
  const contractsDir = "../frontend/src/contract";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }
  let config = `
 export const jTC_addr = "${jTC.address}"
 export const crowdsale_addr = "${crowdsale.address}"
`

  let data = JSON.stringify(config)
  fs.writeFileSync(
    contractsDir + '/addresses.js', JSON.parse(data)

  );
  

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


// npx hardhat run scripts\deploy.js --network rinkeby