// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { json } = require("hardhat/internal/core/params/argumentTypes");

// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
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
  const [deployer,per1,per2] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  
  
    Crowdsale = await ethers.getContractFactory("Crowdsale");
    crowdsale = await Crowdsale.deploy(deployer.getAddress());
    await crowdsale.deployed();

    JTC = await ethers.getContractFactory("JTC");
    jTC = await JTC.deploy(deployer.getAddress() , crowdsale.address);
    await jTC.deployed();

    await crowdsale.setToken(jTC.address)
    // let _value = await ethers.utils.parseUnits("0.000001" , 8 )
    // await crowdsale.buyTokens({value:1000000})

    // _value = await ethers.utils.parseUnits("0.03" , 18 )
    // await crowdsale.connect(per1).buyTokens({value:_value})
    // _value = await ethers.utils.parseUnits("1.5" , 18 )
    // await crowdsale.connect(per2).buyTokens({value:_value})

  console.log("jTC deployed to:", jTC.address);
  console.log("crowdsale deployed to:", crowdsale.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(jTC ,crowdsale);
}
//,nftPreSale,nftPubSale,nft

function saveFrontendFiles(jTC, crowdsale) {
  const fs = require("fs");
  const contractsDir = "../dashboard/src/contract";

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