//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0; // handles the overflow 
import './IERC20.sol';
  
contract WorkShareToken is IERC20 { 
 
    uint public supply;
    address payable public founder;
    uint public tokenPrice = 1000; // change price
     

    mapping (address => uint) private balances;
    mapping (address => mapping(address => uint)) allowed;
 
    constructor()  {
        supply = 0;
        founder = payable(msg.sender);
    }

    // returns the balance of the msg.sender
    function balanceOf(address   tokenOwner) public view override returns (uint balance){
        require(msg.sender == tokenOwner, "You can only see your balance");
        return balances[tokenOwner];
    }

     function decimals() public view virtual returns (uint8){
         return 1;

     }

    function symbol() public view virtual returns (string memory) {
        return "WST";
    }

    function name() public view virtual returns (string memory) {
        return "WorkShareToken";
    }

    function totalSupply() public view virtual override returns (uint256) {
            return supply;
    }

    function transfer(address   to, uint   tokens) public virtual override returns (bool success){
        require(balances[msg.sender] >= tokens);
        balances[to] += tokens;
        balances[msg.sender] -= tokens;

        emit Transfer(msg.sender,to,tokens);
        
        return true;
    }

    function allowance(address   tokenOwner, address   spender) view public override returns (uint){
        return allowed[tokenOwner][spender];
    }


    function approve(address spender, uint tokens) public override returns (bool success){
        require(balances[msg.sender] >= tokens);
        require(tokens > 0);
        allowed[msg.sender][spender] += tokens;

        emit Approval(msg.sender, spender, tokens);

        return true;      
    }

    function transferFrom(address   from, address   to, uint  tokens) public virtual override returns (bool success){

        require(allowed[from][to] >= tokens, "You cant take the tokens form another wallet if not allowed.");
        require(balances[from] >= tokens, "Not enough balance!");
        balances[from] -= tokens;
        balances[to] += tokens;
        allowed[from][to] -= tokens;

        emit Transfer(from, to, tokens);
        
        return true;
    }

    event Mint(address   investor, uint   value, uint  tokens);

    function mint() payable public returns(bool){

      uint tokens = msg.value / tokenPrice;
      supply += tokens;
      balances[msg.sender] += tokens;

      emit Mint(msg.sender, msg.value, tokens);

      return true;
    }

    
    function mintFromContract(address sender, uint value) public returns(bool){
      
      uint tokens = value / tokenPrice;
      supply += tokens;
      balances[sender] += tokens;

      emit Mint(sender, value, tokens);

      return true;
    }
    
    // withdraw the tokens you have
    function withdraw(uint tokens) public override returns (bool){
        require (balances[msg.sender] >= tokens, "Not enough balance!");

        uint value = tokens * tokenPrice ;
        supply -= tokens;
        balances[msg.sender] -= tokens;
        payable(msg.sender).transfer(value);

        return true;
    }
    
    receive() payable external{
        mint();
    }
}
 