// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";




contract Crowdsale is Context, ReentrancyGuard {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;
    
    // The token being sold
    IERC20 private _token;
    IERC20 private BUSD;

    // Address where funds are collected
    address payable private _wallet;
    address payable public _manager;

    // How many token units a buyer gets per wei.
    // The rate is the conversion between wei and the smallest and indivisible token unit.
    // So, if you are using a rate of 1 with a ERC20Detailed token with 3 decimals called TOK
    // 1 wei will give you 1 unit, or 0.001 TOK.
    uint256 private _rate;
    uint256 public min;
    uint256 public minBuy = 0.250 * 10 ** 8;
    uint256 public maxBuy = 0.500 * 10 ** 8;
    uint256 public price_0 = 0.2 * 10 ** 8;
    uint256 public price_1 = 0.4 * 10 ** 8;
    uint256 public price_2 = 0.6 * 10 ** 8;
    uint256 public sale_price ;

    uint256 public time = block.timestamp;
    

    // Amount of wei raised
    uint256 public _weiRaised;
    uint256 public _tokenPurchased;
    bool public success;
    bool public finalized;
    bool public _buyable;

    
    event TokensPurchased(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);

    
    
    mapping (address => uint256) purchase;
    mapping (address => uint256) msgValue; 
    uint256 current = block.timestamp * 1 seconds;
    uint256 public immutable limitationtime ;
    uint256 public buyTime = block.timestamp + 10 days ;//+ 15 days
    uint256 public locktime = buyTime + block.timestamp +  5 minutes * 1 seconds ;

    constructor (uint8 price_type, address payable wallet_,address _manager,
    uint256 _min) {
        require(price_type >= 0, "Crowdsale: rate is 0");
        sale_price = selectPrice(price_type);
        _wallet = wallet_;
       
       _manager = _manager;
        min=_min;
        limitationtime = buyTime;
        BUSD = IERC20(0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56);
    }
    function setToken(address _add) public  {
        _token  = IERC20(_add);
    }
    

    // fallback () external payable {
    //     buyTokens();
    // }

    // receive () external payable {
    //     buyTokens();
    // }

    /**
     * @return the token being sold.
     */
    function token() public view returns (IERC20) {
        return _token;
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

    function buyable()public returns(bool) { 
        if(buyTime > block.timestamp){
            _buyable = true;
        }
        return _buyable;
    }
    
    function selectPrice(uint8 no) public view returns(uint256){
        if(no==0){
            return price_0;
        }else if(no==1){
            return price_1;
        }else if(no==2){
            return price_2;
        }else{
            require(false);
        }
    }
    
   function buyTokens(uint _amount) public nonReentrant payable {
        require ( buyTime > block.timestamp, "Buy Time expired");

        // uint256 msg.value = BUSD.allowance(_msgSender(), address(this));
        require(msg.value >=minBuy && msg.value <=maxBuy,"please approve Busd according to limit");
        
        //new calulate amount
        uint256 one = 1 * 10 ** 8;
        uint256 tokens =  (one * msg.value)/sale_price;
        // calculate token amount to be created
        // uint256 tokens = _getTokenAmount(msg.value);
        require(_token.balanceOf(address(this)) >= tokens,"buy amount exceeds not enough Tokens remaining");
        // BUSD.safeTransferFrom(_msgSender(),address(this), msg.value);
        _tokenPurchased = _tokenPurchased + tokens;

        // update state
        _weiRaised = _weiRaised.add(msg.value);
        
            msgValue[_msgSender()] = msgValue[_msgSender()] + msg.value;
            purchase[_msgSender()]=purchase[_msgSender()]+tokens;
       
    }

    function claim() public payable {
        require (block.timestamp > limitationtime);
        require (finalized,"ICO not finalized yet");

      
        uint256 t = purchase[_msgSender()];  
        require (t>0,"0 tokens to claim");
        _processPurchase(_msgSender(), t);
         delete purchase[_msgSender()];
     
    }
    
    function balance() public view returns(uint){
        return _token.balanceOf(address(this));
    }

    function Finalize() public  returns(bool) {
        require( buyTime < block.timestamp, "the crowdSale is in progress");
        require(!finalized,"already finalized");
        require(_msgSender() == _wallet,"you are not the owner");
        if(_weiRaised >= min ){
            success = true;
        }
        else{
             success = false;   
        }
         uint256 remainingTokensInTheContract = _token.balanceOf(address(this)) - _tokenPurchased;
        _token.safeTransfer(address(_wallet),remainingTokensInTheContract);
        _forwardFunds(_weiRaised);
        finalized = true;
        return success;
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
    function _forwardFunds(uint256 amount) internal {
      BUSD.safeTransfer(_wallet, amount);
    }

    function timeyhyht () public returns (uint256) {
        return block.timestamp;
    }

      
}