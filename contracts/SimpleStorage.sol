pragma solidity ^0.5.0;

import "./StandardToken.sol";


contract SimpleStorage {

  address manager;
  
  bool public tokenSaleOngoing = false;
  uint256 public dateOfDeploy;

   // create an instance of StandardToken
  StandardToken public WHtoken;

  //modifier that checks if the calling address is the project mananger
  modifier isManager(){
      require (msg.sender==manager, "Sender is not the Manager.");
      _;
  }x

  //fallback funtion that reverts 
  function () external payable {
    revert();
  }
  
  // "PROJ1", "Project 1.0", 115
    constructor(
        string memory _symbol, 
        string memory _name, 
        uint256 _supply,
        address _owner
    ) 
        public
    {
        manager = _owner;
        dateOfDeploy = block.timestamp;
        WHtoken = new StandardToken( _name, _symbol, 10, _supply);
    }

  /**
  * Getter function that returns the name of the Token. 
  * @return An address specifying the address of the project manager. 
  */

  function getManager() public view returns (address) {
    return manager;
  }

  /**
  * Getter function that returns the name of the Token. 
  * @return A string specifying the name of the token. 
  */

  function getName() public view returns (string memory) {
    return WHtoken.name();
  }

  /**
  * Getter function that returns the 5 digit symbol of the Token. 
  * @return A string specifying the symbol of the token. 
  */

  function getSymbol() public view returns (string memory) {
    return WHtoken.symbol();
  }

  /**
  * Getter function that returns the total Token Supply. 
  * @return A uint256 specifying the total supply of the token and hard cap of the crowdsale. 
  */

  function getSupply() public view returns (uint256) {
    return WHtoken.supply();
  }



  // function set(uint x) public {
  //   totalSupply += x;
  // }
}





// contract WHTokenSale{
//     bool didWithdraw ;                                      // bool that tracks if manager has withdrawn the funds already
//     bool tokenSaleOngoing = true;                           // keeps traack if tokensale is still ongoing or already over
//     uint public totalRevenue;                               // uint that keeps track of the total accumulate revenue over time
//     uint totalSupply;                                       // total Supply (hardcap)
//     uint public amountRaised;                               // uint that keeps track of how much was raised
//     address public manager;                                 // address of manager/project leader
//     mapping (address => uint) public totalWithdrawn;        // cumulative amount of all withdrawals
    
  
//     // "W","W",10, 100 ether
//     constructor(
//         string _name, 
//         string _symbol, 
//         uint8 _decimals, 
//         uint256 _hardcap
//     ) 
//         public 
//         payable 
//     {
//         manager = msg.sender;
//         totalSupply = _hardcap;
//         WHtoken = new StandardToken( _name, _symbol, _decimals, _hardcap);
//     }
    
    
//  
  
//     // Crowdsale
   
//     function buyTokens() public payable {
        
//         require(tokenSaleOngoing, "Token sale has closed");  // requires tokensale to be not over yet
//         require(msg.value > 0);  // checks if message contains any ether
//         require(amountRaised + msg.value > amountRaised);           // checks for overflows
//         require(totalSupply > amountRaised, "Hard Cap is reached");   // checks if enough tokens are still available
//         uint256 amount = msg.value;
        
//         // test if buyer overshoots the hardcap and if yes, refunds the remaining funds
//         if (totalSupply < amountRaised + msg.value)
//         {
//             // any requires here?
//             amount = totalSupply - amountRaised;
//             uint256 refundAmount = msg.value - amount;
//             tokenSaleOngoing = false;
//             refund(msg.sender, refundAmount); // maybe require(refund(...)) with refund returns which then throws an error if it doenst execute
//         }

//         amountRaised += amount;                         // updates how much was raised in total
//         WHtoken.addBalance(msg.sender, amount);
//         //tokenBalance[msg.sender] += amount;
//     }
    
//     /**
//      * Getter function that returns Token Balance of the function caller (message sender). 
//      * @return A uint256 specifying the Token Balance of the function caller (message sender). 
//      */
//     function getTokenBalance() public view returns(uint256) {
//         address sender = msg.sender;
//         return WHtoken.tokenBalance(sender);
//     }


//     //transfer functions
    
    
//     // refund functions
//     function refund(address _receiver, uint256 _amount) public payable{
//         _receiver.transfer(_amount);
//     }
   
   
//     // Revenue Distribution
      
//     /** 
//      * function that lets Manager withdraw all the raised funds, 
//      (is intended to only be called once after fundaraise is over)
//      */
    
//     // function that allos project managet to withdraw the raised funds
//     // option: require that the cap is reached in order to withdraw 
//     function managerWithdrawal() isManager public returns(string) {
//         require(!didWithdraw,"Raised money already withdrawn");         // require that manager didnt already withdraw the funds
//         require(amountRaised >= totalSupply);                           // funds can only be withdrawn once crowdsale is over (reached hard cap)
//         didWithdraw=true;
//         msg.sender.transfer(address(this).balance); 
//         return "The total balance has been withdrawn";  // "amount of X"
//     }

    
//     /**
//      * Getter function that returns the ether balance of the contract address. 
//      * @return A uint256 specifying the the ether balance of the contract address. 
//      */
//     function getContractBalance() public view returns(uint) {
//         return address(this).balance;
//     }
    
//     /** function to withdraw revenue */
   
//     function withrdraw(uint _withdrawal) payable public {
    
//         require(didWithdraw);       // require that the raised funds have already been withdrawn
//         require(address(this).balance >= _withdrawal);                              // checking if balance is sufficient
//         require(address(this).balance - _withdrawal <= address(this).balance);      // checking against overflows
  
//         // checking if caller is entitled to withdraw (owns token + hasnt withdrawn already)      
//         //require msg.sender in list + not already withdrawn: totalRevenue*ANTEIL-totalWithdrawn[msg.sender]>=withdrawal
            
//         //require(totalRevenue*(WHtoken.tokenBalance(msg.sender) / totalSupply) - totalWithdrawn[msg.sender] <= address(this).balance );
            
//         totalWithdrawn[msg.sender] += _withdrawal;
//         msg.sender.transfer(_withdrawal); 
        
//     }

    
//     /**
//      * Getter function that returns the amount of ether the function caller already has withdrawn. 
//      * @return A uint256 that keeps track of how much the function caller already has withdrawn. 
//      */
//     function getTotalWithdrawn () public view returns (uint) {
//         return totalWithdrawn[msg.sender];
//     }
    
// }