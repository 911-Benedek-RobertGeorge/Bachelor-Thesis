//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0; // handles the overflow 
 
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

 
interface  IERC20 {
    function totalSupply() external view returns (uint);
    function balanceOf(address tokenOwner) external view returns (uint balance);
    function transfer(address to, uint tokens) external returns (bool success);
    
    function allowance(address tokenOwner, address spender) external view returns (uint remaining);
    function approve(address spender, uint tokens) external returns (bool success);
    function transferFrom(address from, address to, uint tokens) external returns (bool success);
    
    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}


contract WorkShareToken is IERC20 {

    AggregatorV3Interface internal priceFeed;
 
    uint public supply;
    address payable public  founder;
    uint tokenPrice = 0.001 ether; 
    uint public raisedAmount = 0;
    
    


    mapping (address => uint) public balances;

    mapping (address => mapping(address => uint)) allowed;

    //  0x111... (owner) allows 0x222... (the spender) --- 100 tokens;
    // allowed[0x111...][0x222...] = 100;

    constructor()  {    
        supply = 0;
        founder = payable(msg.sender);
        balances[founder] = supply;
        priceFeed = AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e);

    }

    function getLatestPrice() public view returns (int) {
    (
        uint80 roundID, 
        int price,
        uint startedAt,
        uint timeStamp,
        uint80 answeredInRound
    ) = priceFeed.latestRoundData();
    return price;
  }

    function balanceOf(address calldata tokenOwner) public view override returns (uint balance){
        return balances[tokenOwner];
    }
     function decimals() public view virtual returns (uint8){
         return 10;

     }
    function symbol() public view virtual returns (string memory) {
        return "BBT";
    }
    function name() public view virtual returns (string memory) {
        return "BenBurgerToken";
    }
    function totalSupply() public view virtual override returns (uint256) {
            return supply;
        }
    function transfer(address calldata to, uint calldata tokens) public virtual override returns (bool success){
        require(balances[msg.sender] >= tokens);

        balances[to] += tokens;
        balances[msg.sender] -= tokens;

        emit Transfer(msg.sender,to,tokens);
        
        return true;
    }

    function allowance(address calldata tokenOwner, address calldata spender) view public override returns (uint){
        return allowed[tokenOwner][spender];
    }


    function approve(address calldata spender, uint calldata tokens) public override returns (bool success){
        require(balances[msg.sender] >= tokens);
        require(tokens > 0);

        allowed[msg.sender][spender] = tokens;

        emit Approval(msg.sender, spender, tokens);
        return true;      
    }


    function transferFrom(address calldata from, address calldata to, uint calldata tokens) public virtual override returns (bool success){

        require(allowed[from][to] >= tokens, "You cant take the tokens form another wallet if not allowed.");
        require(balances[from] >= tokens, "Not enough balance");
        balances[from] -= tokens;
        balances[to] += tokens;
        allowed[from][to] -= tokens;
        emit Transfer(from, to, tokens);
        return true;
    }

    event Mint(address calldata investor, uint calldata value, uint calldata tokens);

    function mint(uint value) payable public returns(bool){
        
      raisedAmount += value;
      require(raisedAmount <= hardCap);
      
      uint tokens = value / tokenPrice;

      balances[msg.sender] += tokens;
      balances[founder] -= tokens;
      founder.transfer(value);

      emit Mint(msg.sender, value, tokens);

      return true;
    }

    receive() payable external{
        invest(msg.value);
    }
}
 