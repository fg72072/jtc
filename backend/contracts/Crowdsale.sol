// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";




contract Crowdsale is Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    
    // The token being sold
    IERC20 private _token;
    

    // Address where funds are collected
    address payable private _wallet;
    

    // How many token units a buyer gets per wei.
    // The rate is the conversion between wei and the smallest and indivisible token unit.
    // So, if you are using a rate of 1 with a ERC20Detailed token with 3 decimals called TOK
    // 1 wei will give you 1 unit, or 0.001 TOK.

    uint256 private _rate = 0.000001  * 10 ** 8;
    uint256 public min;
    
  
    
   
    
    

    // Amount of wei raised
    uint256 public _weiRaised;
    uint256 public _tokenPurchased;
    address[] public accounts;

    struct PurchaseDetails{
        uint256 time;
        uint256 amount;
        uint256 tokens;
    }
    
    mapping (address => PurchaseDetails) public purchaseDetails;
    mapping (address => bool) public exist; 
    
    
    constructor (address payable wallet_) {
        _wallet = wallet_;
    }
    

    fallback () external payable {
        buyTokens();
    }

    receive () external payable {
        buyTokens();
    }

    /**
     * @return the token being sold.
     */
    function token() public view returns (IERC20) {
        return _token;
    }

    function setToken(IERC20 token_) public onlyOwner {
        require(address(token_) != address(0), "JTC: token is the zero address");
        _token = token_;    
    }

    /**
     * @return the address where funds are collected.
     */
    function wallet() public view returns (address payable) {
        return _wallet;
    }

    /**
     * @return the number of token units a buyer gets per wei.
     */
    function rate() public view returns (uint256) {
        return _rate;
    }
   

    /**
     * @return the amount of wei raised.
     */
    function weiRaised() public view returns (uint256) {
        return _weiRaised;
    }

    function setRate(uint256 rate_) public {
        require(rate_ > 0 , "rate > 0");
         _rate = rate_;
    }

    
    

    function RaisedDetail(uint8 day) public view returns(uint256) {
        uint256 amount ;
        for (uint256 index = 0; index < accounts.length; index++) {
            address account = accounts[index];
            if(purchaseDetails[account].time > block.timestamp - (day * 1 days)){
                amount += purchaseDetails[account].amount;
            }
        }
       return amount;
    }


    function addHistory(address account , uint256 amount , uint256 tokens) private {
        if(exist[account]){

        }else{
            exist[account] = true;
            accounts.push(account);
        }
        purchaseDetails[account].amount = purchaseDetails[account].amount + amount;
        purchaseDetails[account].tokens = purchaseDetails[account].tokens + tokens;
        purchaseDetails[account].time = block.timestamp;
    }
    
   function buyTokens() public nonReentrant payable {
       

        uint256  msgvalue = msg.value;
        
        uint256 one = 1 *10**18;
        uint256 tokens = ((one)*msgvalue)/rate();
        
        require(_token.balanceOf(address(this)) >= tokens,"buy amount exceeds not enough Tokens remaining");
        
        // update state
        addHistory(_msgSender() , msgvalue,tokens);
        _tokenPurchased = _tokenPurchased + tokens;
        _weiRaised = _weiRaised.add( msgvalue);
        _processPurchase(_msgSender(), tokens);
        _forwardFunds(msgvalue);
    }

    function totalUsers() public view returns(uint256){
        return accounts.length;
    }

    
    
    
    function balance() public view returns(uint){
        return _token.balanceOf(address(this));
    }

    function getRemainingTokens() public  returns(bool) {
         uint256 remainingTokensInTheContract = _token.balanceOf(address(this)) - _tokenPurchased;
        _token.safeTransfer(address(_wallet),remainingTokensInTheContract);
        return true;
    }

    /**
     * @dev Validation of an incoming purchase. Use require statements to revert state when conditions are not met.
     * Use `super` in contracts that inherit from Crowdsale to extend their validations.
     * Example from CappedCrowdsale.sol's _preValidatePurchase method:
     *     super._preValidatePurchase(beneficiary, weiAmount);
     *     require(weiRaised().add(weiAmount) <= cap);
     * @param beneficiary Address performing the token purchase
     * @param weiAmount Value in wei involved in the purchase
     */
    // function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view {
    //     require(beneficiary != address(0), "Crowdsale: beneficiary is the zero address");
    //     require(weiAmount != 0, "Crowdsale: weiAmount is 0");
    //     this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
    // }

    /**
     * @dev Validation of an executed purchase. Observe state and use revert statements to undo rollback when valid
     * conditions are not met.
     * @param beneficiary Address performing the token purchase
     * @param weiAmount Value in wei involved in the purchase
     */
    // function _postValidatePurchase(address beneficiary, uint256 weiAmount) internal view {
    //     // solhint-disable-previous-line no-empty-blocks
    // }

    /**
     * @dev Source of tokens. Override this method to modify the way in which the crowdsale ultimately gets and sends
     * its tokens.
     * @param beneficiary Address performing the token purchase
     * @param tokenAmount Number of tokens to be emitted
     */
    function _deliverTokens(address beneficiary, uint256 tokenAmount) internal {
        _token.safeTransfer(beneficiary, tokenAmount);
    }

    /**
     * @dev Executed when a purchase has been validated and is ready to be executed. Doesn't necessarily emit/send
     * tokens.
     * @param beneficiary Address receiving the tokens
     * @param tokenAmount Number of tokens to be purchased
     */
    function _processPurchase(address beneficiary, uint256 tokenAmount) internal {
        _deliverTokens(beneficiary, tokenAmount);
    }

    /**
     * @dev Override for extensions that require an internal state to check for validity (current user contributions,
     * etc.)
     * @param beneficiary Address receiving the tokens
     * @param weiAmount Value in wei involved in the purchase
     */
    function _updatePurchasingState(address beneficiary, uint256 weiAmount) internal {
        // solhint-disable-previous-line no-empty-blocks
    }

    /**
     * @dev Override to extend the way in which ether is converted to tokens.
     * @param weiAmount Value in wei to be converted into tokens
     * @return Number of tokens that can be purchased with the specified _weiAmount
     */
    function _getTokenAmount(uint256 weiAmount) internal view returns (uint256) {
        return weiAmount.mul(_rate);
    }

    /**
     * @dev Determines how ETH is stored/forwarded on purchases.
     */
    function _forwardFunds(uint256 amount)internal {
     _wallet.transfer(amount);
    }

      
}