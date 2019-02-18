pragma solidity ^0.5.0;

import "./SimpleStorage.sol";


contract Factory {
    
    // maps user address to Token Sale contract address (not sure if needed)
    mapping (address => address) public contracts;
    
    // maps each contract to a uint for indexing the deployed contracts
    mapping (uint256 => address) public index;

    // counter that tracks the number of created Token Sale contracts
    uint public counter = 1;


    // scenario that gets deploys several contracts when the factory is deployed (for testing)
    constructor() public {
        createTokenSale("PROJX", "Project #1.00", 550, address(this));
        createTokenSale("PROJ2", "Project #zwei", 2550, address(this));
        createTokenSale("PROJ3", "Project #3333", 33550, address(this));
    }

    // creates a Token Sale contract and pushes the address and index (starting at 1) to the array
    function createTokenSale(string memory _symbol, string memory _name, uint256 _hardcap, address _owner) public returns (address){
        SimpleStorage newTokenSale = (new SimpleStorage(_symbol, _name, _hardcap, _owner));
        contracts[msg.sender] = address(newTokenSale);
        index[counter] = address(newTokenSale);
        counter++;
        return address(newTokenSale);
    }

}