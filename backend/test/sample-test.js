const { expect } = require("chai");
const { ethers } = require("hardhat");

async function mineNBlocks(n) {
  for (let index = 0; index < n; index++) {
    await ethers.provider.send('evm_mine');
  }
}

describe("Lite Pad",  function ()  {

  
  let LitePad
  let litePad
  let Staking
  let staking
  let RewardToken
  let rewardToken
  let TicketConsumer;
  let ticketConsumer;
  let Factory
  let factory
  let CrowdSale
  let crowdSale
  let TokenForSale
  let tokenForSale


  let [_,per1,per2,per3] = [1,1,1,1]

  it("Should deploy all smart contracts", async function () {

    [_,per1,per2,per3] = await ethers.getSigners()
    

    LitePad = await ethers.getContractFactory("LitePad");
    litePad = await LitePad.deploy();
    await litePad.deployed();

    RewardToken = await ethers.getContractFactory("RewardToken");
    rewardToken = await RewardToken.deploy();
    await rewardToken.deployed();

    TokenForSale = await ethers.getContractFactory("LitePad");
    tokenForSale = await TokenForSale.deploy();
    await tokenForSale.deployed();

    TicketConsumer = await ethers.getContractFactory("TicketConsumer");
    ticketConsumer = await TicketConsumer.deploy();
    await ticketConsumer.deployed();

    Factory = await ethers.getContractFactory("Factory");
    factory = await Factory.deploy(ticketConsumer.address , litePad.address);
    await factory.deployed();

    Staking = await ethers.getContractFactory("Staking");
    staking = await Staking.deploy(litePad.address,rewardToken.address);
    await staking.deployed();

    CrowdSale = await ethers.getContractFactory("CrowdSale");
    
    
    let tx = await rewardToken.setMinter(staking.address)
    await tx.wait()

    tx = await ticketConsumer.setFactory(factory.address)
    await tx.wait()

    tx = await ticketConsumer.setStaking(staking.address)
    await tx.wait()

    tx = await staking.setTicketConsumer(ticketConsumer.address)
    await tx.wait()

   
  });
 
  it("Should stake litePad", async function () {
    
    let _value = await ethers.utils.parseUnits('100',18)
    let approve = await litePad.approve(staking.address,_value)
    await approve.wait()
    console.log(await litePad.allowance(_.address,staking.address))
    console.log(await litePad.balanceOf(_.address))
    console.log(_.address)
    let tx = await staking.stake(_value)
    await tx.wait()
    
     approve = await litePad.approve(staking.address,_value)
    await approve.wait()
     tx = await staking.stake(_value)
    await tx.wait()
    
    await mineNBlocks(28819 * 2);
  });
  it("states", async function () {
    let _value = await ethers.utils.parseUnits('30000')
    let tx = await staking.getUserStakedValue(_.address)
    console.log("staked value :",tx.toString())
    
    tx = await staking.calcRewards(_.address)
    console.log("1 PendingRewards :",tx.toString())
    
    
  });
  it("Should stake litePad", async function () {
    let _value = await ethers.utils.parseEther('45000')
    let approve = await litePad.approve(staking.address,_value)
    await approve.wait()
    let tx = await staking.stake(_value)
    await tx.wait()
    await mineNBlocks(10);
  });
  it("states", async function () {
    let _value = await ethers.utils.parseEther('30000')
    let tx = await staking.getUserStakedValue(_.address)
    console.log("staked value :",tx.toString())
    tx = await staking.TotalBronze()
    console.log("bronze value :",tx.toString())
    tx = await staking.totalSilver()
    console.log("silver value :",tx.toString())
    tx = await staking.totalGold()
    console.log("Gold value :",tx.toString())
    tx = await staking.calcPendingRewards(_.address)
    console.log("1 PendingRewards :",tx.toString())
    tx = await staking.calcPendingRewards(per1.address)
    console.log("2 PendingRewards :",tx.toString())
  });

  it("Should stake litePad", async function () {
    let _value = await ethers.utils.parseEther('95000')
    let approve = await litePad.approve(staking.address,_value)
    await approve.wait()
    let tx = await staking.stake(_value)
    await tx.wait()
    await mineNBlocks(10);

  });

  it("states", async function () {
    let _value = await ethers.utils.parseEther('30000')
    let tx = await staking.getUserStakedValue(_.address)
    console.log("staked value :",tx.toString())
    tx = await staking.TotalBronze()
    console.log("bronze value :",tx.toString())
    tx = await staking.totalSilver()
    console.log("silver value :",tx.toString())
    tx = await staking.totalGold()
    console.log("Gold value :",tx.toString())
    tx = await staking.calcPendingRewards(_.address)
    console.log("1 PendingRewards :",tx.toString())
    tx = await staking.calcPendingRewards(per1.address)
    console.log("2 PendingRewards :",tx.toString())
  });
  it("Should unstake litePad", async function () {
    let _value = await ethers.utils.parseEther('200')
    
    let tx = await staking.connect(per1).unStake(_value)
    await tx.wait()

  });
//   it("states", async function () {
//     let _value = await ethers.utils.parseEther('30000')
//     let tx = await staking.getUserStakedValue(_.address)
//     console.log("staked value :",tx.toString())
//     tx = await staking.TotalBronze()
//     console.log("bronze value :",tx.toString())
//     tx = await staking.totalSilver()
//     console.log("silver value :",tx.toString())
//     tx = await staking.totalGold()
//     console.log("Gold value :",tx.toString())
//     tx = await staking.calcPendingRewards(_.address)
//     console.log("1 PendingRewards :",tx.toString())
//     tx = await staking.calcPendingRewards(per1.address)
//     console.log("2 PendingRewards :",tx.toString())
//   });

//   it("Should withdraw rewards", async function () {
    
//     let _value = await ethers.utils.parseEther('30000')
//     let tx = await staking.withdrawRewards()
//     await tx.wait()
//     tx = await staking.calcPendingRewards(_.address)
//     console.log("2 PendingRewards :",tx.toString())
//     tx = await rewardToken.balanceOf(_.address)
//     console.log("Balance Of rewardtoken :",tx.toString())
    
//   });

//   it("Should create project IDO", async function () {
//     let _value = await ethers.utils.parseEther('30000')
//     let approve = await tokenForSale.approve(factory.address,100000);
//     await approve.wait()
//     let tx = await factory.create_TokenSale(tokenForSale.address,_.address,1000000000000,100,_.address)
//     await tx.wait()  
//   });

//   it("Should create ico & whitelist", async function () {
//     let _value = await ethers.utils.parseEther('30000')
//     let approve = await tokenForSale.approve(factory.address,100000);
//     await approve.wait()
//     let ico = await factory.ico_addr()
    
//     crowdSale = await CrowdSale.attach(ico)
//     let whitelist = await crowdSale.connect(per1).getWhitlisted()
//     await whitelist.wait()
    
//     let userIdos = await ticketConsumer.getUserAppliedProjects(_.address)
//     console.log("user idos",userIdos)

//     userIdos = await ticketConsumer.getUserAppliedProjects(per1.address)
     
//     console.log("user idos",typeof(userIdos))
//   });
  

});
