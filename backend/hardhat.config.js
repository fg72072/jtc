require("@nomiclabs/hardhat-waffle");
require('hardhat-abi-exporter');
require('dotenv').config({path: __dirname+'/.env'})

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

console.log(process.env.ALCHEMY_API)
console.log(process.env.privateKey)

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
// const ALCHEMY_API_KEY = `GKcZh-E7o6PB3gEz0M9fUHPwG4_xHbbj`
// const privateKey = `669a00a5dcee6b12e70ec23b4a793b14bcb38a0f657ce29ada80b578e14743a7`

module.exports = {
  solidity:  {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.8.4",
        settings: {},
      },
    ],   
}, 
  networks: {
    hardhat: {
      forking: {
        url: "https://bsc-dataseed.binance.org/",
      }
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API}`,
      accounts: [`0x${process.env.privateKey}`],
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 21000000000,
      accounts: [`0x${process.env.privateKey}`],
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [`0x${process.env.privateKey}`],
    },
  },
  abiExporter: {
    path: '../dashboard/src/contract',
    runOnCompile: true,
    clear: true,
    only: [':JTC$', ':Crowdsale$'],
    flat: true,
    spacing: 2,
    pretty: true,
  },
  mocha: {
    timeout: 100000000
  },
};
