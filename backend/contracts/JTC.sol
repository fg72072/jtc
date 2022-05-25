// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";



contract JTC is ERC20 , ERC20Burnable, Ownable {

    // beneficiary of tokens after they are released
    address private immutable _beneficiary;

    // uint256 pri_sale = 0.2 ether;
    // uint256 pre_sale = 0.4 ether;
    // uint256 pub_sale = 0.6 ether;


    // timestamp when token release is enabled
    uint256 private immutable _releaseTime;
   
    uint256 private constant cap = 40000000000*10**18;

    // address public immutable _manager;


    address private constant seed = address(0x79455D5F286Ad3B86DEFb9B0355A4c44fAd15B73);
    address private constant reserve = address(0x82164Dec37484A43881Cc495Ce3245DFD2b2f759);
    address private constant private_round = address(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
    address private constant public_sale = address(0xb95A24916f8dF2Fb3DC8472DD9B592Bc6EEd6711);

    address private constant eco_reward = address(0x79455D5F286Ad3B86DEFb9B0355A4c44fAd15B73);
    address private constant partner = address(0x82164Dec37484A43881Cc495Ce3245DFD2b2f759);
    address private constant team = address(0x9071c2A4f09A2A07AB736f139607bD958B8Bdb9F);
    address private constant advisor = address(0xb95A24916f8dF2Fb3DC8472DD9B592Bc6EEd6711);
    

   
//94670856
                                    
    constructor(address beneficiary_ , address _private_round) ERC20("JTC Token", "JTC") 
         {
        require(_private_round != address(0) && beneficiary_ != address(0) , "error address :: jtc");
        _beneficiary = beneficiary_;
        _releaseTime = block.timestamp * 1 seconds;
        // _manager = manager;
       
        _mint(seed , (cap/100)*8);
        _mint(reserve , (cap/100)*18);
        _mint(_private_round , (cap/100)*10);
        _mint(public_sale , (cap/100)*15);
        _mint(eco_reward , (cap/100)*20);
        _mint(partner , (cap/100)*10);
        _mint(team , (cap/100)*15);
        _mint(advisor , (cap/100)*4);
        
    
    }

    function _mint(address account, uint256 amount) internal virtual override {
        require(totalSupply() + amount <= cap, "ERC20Capped: cap exceeded");
        super._mint(account, amount);
    }

    function burn(uint256 amount) public override {
        _burn(_msgSender(), amount);
    }

    //   function buy(uint256 _amount) external payable {
    //     // e.g. the buyer wants 100 tokens, needs to send 500 wei
    //     require(msg.value == _amount * pri_sale, 'Need to send exact amount of wei');
        
    //     /*
    //      * sends the requested amount of tokens
    //      * from this contract address
    //      * to the buyer
    //      */
    //     transfer(msg.sender, _amount);
    // }

    /**
     * @return the beneficiary of the tokens.
     */
    function beneficiary() public view virtual returns (address) {
        return _beneficiary;
    }

    /**
     * @return the time when the tokens are released.
     */
    function releaseTime() public view virtual returns (uint256) {
        return _releaseTime;
    }

    /**
     * @notice Transfers tokens held by timelock to beneficiary.
     */
    function release() public virtual {
        require(block.timestamp >= releaseTime(), "TokenTimelock: current time is before release time");

        uint256 amount = balanceOf(address(this));
        require(amount > 0, "TokenTimelock: no tokens to release");

        ERC20._transfer(address(this),beneficiary(),  amount);
    }

}